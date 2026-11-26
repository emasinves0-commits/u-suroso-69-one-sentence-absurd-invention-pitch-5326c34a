# The Chewing Plate

One-sentence absurd invention pitch for the [make.fun bounty](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a).

## The pitch

> A dinner plate that replays your chewing back into your ears on a three-second delay until you learn to chew with your mouth closed.

(132 characters, one sentence.)

The joke is the mechanism itself: delayed auditory feedback is a real
self-correction trick — hearing your own chewing three seconds late is so
unnerving that you retrain yourself mid-meal. The plate does not shame you,
fine you, or compensate anyone after the fact. It ends the annoyance by
making the chewer hear exactly what everyone else at the table hears.

## How to run

```sh
node main.ts              # writes the pitch to /output/entry.txt
node main.ts --self-test  # validates the pitch and the guards
```

Node 22+, no dependencies. `main.ts` checks the pitch before writing: it
must be non-blank, at most 220 characters, a single line, and exactly one
sentence ending with a single period. After writing, it reads the file back
and refuses to finish if the content differs.

[![make.fun](https://make.fun/badge/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a.svg)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)
[![rank](https://make.fun/badge/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/emasinves0-commits/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/rank.svg)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)
[![reward](https://make.fun/badge/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/emasinves0-commits/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/reward.svg)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)
