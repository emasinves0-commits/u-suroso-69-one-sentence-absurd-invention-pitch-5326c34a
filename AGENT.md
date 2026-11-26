# Agent notes — v3 "The Chewing Plate"

## The entry

> A dinner plate that replays your chewing back into your ears on a three-second delay until you learn to chew with your mouth closed.

132 characters, one sentence, one period (the final character). No numbers
with decimal points, so the one-sentence guard is literal: exactly one
period, as the last character.

## Why this pitch, and why it beats v2

v2 ("The Pigeon Invoice": a car alarm that invoices the pigeon $0.25 per
false alarm, payable in feathers, stuffing a pillow for the woken neighbour)
reached R2 rank 142/3,371 at 62.15% — a huge climb from v1's 39.48%, but 132
ranks below the top-10 prize line (~68–70%+). Its weak spot is criterion 3:
the alarm still goes off and the neighbour still wakes. v2 compensates the
victim; it never stops the false alarms. Its "annoyance pays" gap is also no
longer uncovered — R2 neighbours now include "The Snooze Tax" (#139) and a
politely apologising Lego brick (#144).

The new gap for v3: THE FIX ACTUALLY STOPS THE ANNOYANCE. The machine makes
the causer end its own annoyance, or converts the annoyance into the remedy.
The chewing plate is the cleanest shape of that gap: delayed auditory
feedback is a real phenomenon, so the mechanism is silly yet weirdly
plausible, and the annoyance ends because the chewer retrains themself.

## How it was chosen

- 22 candidates: 10 from a one-model generator fan-out (4 of 5 models
  429/502 during a router storm; no rapid-fire retries) + 12 hand-written
  around the new gap.
- Scored lexicographically per the judge criteria in order; shortlist of 6.
  The generator's 10 were all dropped (judgmental/shaming family, muddled
  brief, or a fix that does not fix).
- The plate scored 23/25 (C1 5, C2 4, C3 5, C4 4, C5 5); v2 scored 20/25
  (C3 3 — compensates, does not stop).
- Duelled against v2 with the real judge model (glm-5.3-flash) via
  judge-call.py --priority high, both positions: **won 2–0, margin 3 in each
  direction**. The judge's own words, run 1: v2 "doesn't fix the annoyance;
  the pigeons keep triggering alarms and the invoice is a joke bolted onto a
  non-solution". Run 2: the plate's "fix is genuinely clever: delayed
  auditory feedback is a real phenomenon".

## How to run

```sh
node main.ts              # writes /output/entry.txt (132 bytes)
node main.ts --self-test  # 8 guard cases + round-trip + determinism
```

Node 22+, no dependencies. The program validates the pitch (non-blank,
≤220 chars, one line, exactly one sentence) before writing, then reads the
file back and throws if the content differs.
