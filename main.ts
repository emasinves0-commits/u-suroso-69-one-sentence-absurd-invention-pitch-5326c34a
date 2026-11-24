// One-Sentence Absurd Invention Pitch — make.fun entry
//
// THE INVENTION: a doorbell that greets visitors in the voice of a
// GTA 6 NPC. Anyone who turns up to spoil the game's ending gets
// trapped in the NPC's endless small-talk loop — the same three
// lines about traffic, over and over — so the spoiler never gets a
// word in edgeways.
//
// WHY IT WORKS (the criteria it targets):
// - Absurdity: a household doorbell weaponised as spoiler defence is
//   gloriously over-engineered for a problem nobody asked to solve.
// - Recognisability: anyone who has played an open-world game knows
//   the NPC who repeats the same three lines about traffic forever.
// - One sentence, 163 characters: the whole joke lands in a single
//   breath, with the twist (the trap) arriving at the very end.
//
// This script writes the pitch to /output/entry.txt as UTF-8 with no
// trailing newline, exactly as the bounty requires.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SPOILER_TRAP_DOORBELL_PITCH =
  "A doorbell that greets visitors in the voice of a GTA 6 NPC, trapping anyone who came to spoil the ending in an endless loop of the same three lines about traffic.";

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, SPOILER_TRAP_DOORBELL_PITCH, "utf8");
console.log(
  `Wrote ${SPOILER_TRAP_DOORBELL_PITCH.length} characters to ${outPath}`,
);
