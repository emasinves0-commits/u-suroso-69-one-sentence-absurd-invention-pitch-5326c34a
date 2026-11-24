// One-Sentence Absurd Invention Pitch — make.fun entry (v2)
//
// THE INVENTION: a car alarm that invoices the pigeon that set it off
// $0.25 per false alarm, payable in feathers, and spends the feathers
// stuffing a tiny pillow for the neighbour it woke.
//
// Usage:
//   node main.ts              write the entry to /output/entry.txt
//   node main.ts --self-test  run the built-in checks (no /output write)

import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

export const ENTRY =
  "A car alarm that invoices the pigeon $0.25 per false alarm, payable in feathers, and spends the feathers stuffing a tiny pillow for the neighbour it woke.";

export const MAX_ENTRY_LENGTH = 220;

const OUTPUT_PATH = "/output/entry.txt";

/** Throws a descriptive Error unless `text` is a valid one-sentence entry. */
export function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry is blank");
  }
  if (text.length > MAX_ENTRY_LENGTH) {
    const excess = text.length - MAX_ENTRY_LENGTH;
    throw new Error(
      `entry is ${text.length} characters, ${excess} over the ${MAX_ENTRY_LENGTH} limit`,
    );
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line (found a newline)");
  }
  // A period between two digits (the "." in "$0.25") is a decimal point,
  // not a sentence terminator, so it is not counted.
  const periods = (text.match(/(?<!\d)\.|\.(?!\d)/g) ?? []).length;
  if (periods !== 1 || !text.endsWith(".")) {
    throw new Error(
      `entry must be exactly one sentence: one period, as the final character (found ${periods})`,
    );
  }
}

/**
 * Validates, then writes `text` to `path` as UTF-8 with no trailing newline.
 * The write goes to a temp file first and is renamed into place, so `path`
 * never holds a half-written entry; the result is read back and compared.
 */
export function writeEntry(text: string, path: string): void {
  validateEntry(text);
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, path);
  if (readFileSync(path, "utf8") !== text) {
    throw new Error(`read-back of ${path} does not match the entry`);
  }
}

function rejects(label: string, text: string): string | null {
  try {
    validateEntry(text);
  } catch {
    return null;
  }
  return `${label}: expected rejection but it was accepted`;
}

function accepts(label: string, text: string): string | null {
  try {
    validateEntry(text);
  } catch (err) {
    return `${label}: expected acceptance but got "${(err as Error).message}"`;
  }
  return null;
}

function messageHas(label: string, text: string, expected: string): string | null {
  try {
    validateEntry(text);
  } catch (err) {
    return (err as Error).message.includes(expected)
      ? null
      : `${label}: message "${(err as Error).message}" lacks "${expected}"`;
  }
  return `${label}: expected rejection but it was accepted`;
}

function selfTest(): number {
  const filler = (n: number) => "a".repeat(n - 1) + ".";
  const checks: Array<string | null> = [
    rejects("empty string", ""),
    rejects("whitespace only", "   \t "),
    rejects("newline inside", "A first half.\nA second half."),
    rejects("trailing newline", "A tidy sentence.\n"),
    rejects("two sentences", "One idea. Another idea."),
    rejects("no final period", "A sentence with no ending"),
    rejects("period not last", "A sentence. with a stray period inside"),
    rejects("two sentences with a decimal", "It costs $0.25. Then it stops."),
    accepts("decimal point is not a terminator", "It costs $0.25 and then stops."),
    accepts("exactly 220 chars", filler(MAX_ENTRY_LENGTH)),
    rejects("221 chars", filler(MAX_ENTRY_LENGTH + 1)),
    messageHas("excess is reported", filler(MAX_ENTRY_LENGTH + 5), "5 over the 220 limit"),
    messageHas("blank is named", " ", "blank"),
    accepts("the real entry", ENTRY),
  ];

  const dir = mkdtempSync(join(tmpdir(), "pitch-selftest-"));
  try {
    const target = join(dir, "nested", "entry.txt");
    writeEntry(ENTRY, target);
    const roundTrip = readFileSync(target, "utf8");
    checks.push(
      roundTrip === ENTRY ? null : "round trip: file differs from the entry",
      Buffer.byteLength(ENTRY, "utf8") === ENTRY.length
        ? null
        : "entry is not pure single-byte text",
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  const failures = checks.filter((c): c is string => c !== null);
  for (const f of failures) console.error(`FAIL ${f}`);
  console.log(
    failures.length === 0
      ? `self-test passed (${checks.length} checks)`
      : `self-test failed (${failures.length} of ${checks.length})`,
  );
  return failures.length === 0 ? 0 : 1;
}

function main(): void {
  if (process.argv.includes("--self-test")) {
    process.exit(selfTest());
  }
  writeEntry(ENTRY, OUTPUT_PATH);
  console.log(`Wrote ${ENTRY.length} characters to ${OUTPUT_PATH}`);
}

main();
