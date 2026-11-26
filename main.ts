// One-Sentence Absurd Invention Pitch — v3 entry ("The Chewing Plate").
//
// The program writes a single absurd-invention pitch to /output/entry.txt.
// The pitch: a dinner plate that cures loud chewing by looping the chewer's
// own chewing back into their ears on a three-second delay — delayed
// auditory feedback, a real self-correction trick, turned into tableware.
// The annoyance actually ends: the chewer retrains themself, mid-meal.
//
// Run:  node main.ts            (writes /output/entry.txt)
//       node main.ts --self-test (validates the pitch + the guards, no output file)

import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const PITCH =
  "A dinner plate that replays your chewing back into your ears on a three-second delay until you learn to chew with your mouth closed.";
const MAX_CHARS = 220;
const OUT_PATH = "/output/entry.txt";

// --- guards: each names one rule the pitch must satisfy ---

function failIfBlank(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry is blank");
  }
}

function failIfTooLong(text: string): void {
  if (text.length > MAX_CHARS) {
    throw new Error(
      `entry is ${text.length} characters, over the ${MAX_CHARS}-character limit`,
    );
  }
}

function failIfMultiline(text: string): void {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function failIfNotOneSentence(text: string): void {
  const stops = [...text].filter((ch) => ch === ".").length;
  if (stops !== 1 || !text.endsWith(".")) {
    throw new Error(
      `entry must be exactly one sentence ending with a single period (found ${stops} periods)`,
    );
  }
}

function checkPitch(text: string): void {
  failIfBlank(text);
  failIfTooLong(text);
  failIfMultiline(text);
  failIfNotOneSentence(text);
}

function writePitch(outPath: string): void {
  checkPitch(PITCH);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, PITCH, "utf8");
  // Read back: a partial or altered write must fail loudly, never silently.
  const back = readFileSync(outPath, "utf8");
  if (back !== PITCH) {
    throw new Error(`wrote ${outPath} but read back different content`);
  }
}

// --- self-test: every guard must reject its bad input, and the real pitch
// must survive a byte-identical round-trip through a temp directory ---

function expectReject(label: string, text: string): void {
  try {
    checkPitch(text);
  } catch {
    return;
  }
  throw new Error(`self-test failed: ${label} was accepted`);
}

function selfTest(): void {
  checkPitch(PITCH);
  expectReject("blank entry", "   ");
  expectReject("over-limit entry", "x".repeat(MAX_CHARS + 1));
  expectReject("two sentences", "First sentence. Second sentence.");
  expectReject("no final period", "A sentence with no stop");
  expectReject("newline inside", "One line\ntwo lines.");
  // 220 characters exactly is the boundary: accepted.
  checkPitch("a".repeat(MAX_CHARS - 1) + ".");
  // Round-trip: write to a temp dir, read back, compare byte for byte.
  const dir = mkdtempSync(join(tmpdir(), "chewing-plate-"));
  try {
    const probe = join(dir, "entry.txt");
    writePitch(probe);
    const back = readFileSync(probe, "utf8");
    if (back !== PITCH) {
      throw new Error("self-test failed: round-trip changed the entry");
    }
    if (Buffer.byteLength(back, "utf8") !== PITCH.length) {
      throw new Error("self-test failed: round-trip changed the byte length");
    }
    // Determinism: a second write must produce identical bytes.
    const probe2 = join(dir, "entry2.txt");
    writePitch(probe2);
    if (readFileSync(probe2, "utf8") !== back) {
      throw new Error("self-test failed: second write differs from the first");
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  console.log(`self-test ok: ${PITCH.length} characters, 1 sentence`);
}

if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  writePitch(OUT_PATH);
  console.log(`wrote ${PITCH.length} characters to ${OUT_PATH}`);
}
