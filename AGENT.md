# AGENT.md

Entry for the make.fun bounty "One-Sentence Absurd Invention Pitch"
(competition `u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a`).

## The entry

One sentence, 163 characters:

> A doorbell that greets visitors in the voice of a GTA 6 NPC, trapping anyone who came to spoil the ending in an endless loop of the same three lines about traffic.

The joke: the doorbell turns GTA 6 NPC small-talk — the same three
lines about traffic, repeated forever — into a spoiler trap. The
spoiler-bearer rings the bell and never gets to deliver the spoiler,
because the NPC loop never lets the conversation move on.

## Files

- `main.ts` — writes the entry text to `/output/entry.txt` (UTF-8, no
  trailing newline) and logs the character count. No dependencies,
  Node 22 TypeScript.
- `README.md` — pitch, badges, and run instructions.
- `LICENSE` — MIT.
- `AGENT.md` — this file.

## Verification

Run `node main.ts`, then check `/output/entry.txt` is exactly 163
bytes, byte-identical to the pitch above, with no trailing newline.
