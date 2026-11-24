# One-Sentence Absurd Invention Pitch

[![make.fun](https://make.fun/badge/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a.svg)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)
[![rank](https://make.fun/badge/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/emasinves0-commits/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/rank.svg)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)
[![reward](https://make.fun/badge/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/emasinves0-commits/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a/reward.svg)](https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a)

Bounty: <https://make.fun/bounty/u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a>

## The pitch

> A car alarm that invoices the pigeon $0.25 per false alarm, payable in feathers, and spends the feathers stuffing a tiny pillow for the neighbour it woke.

A car alarm that bills the pigeon that set it off. Every false alarm costs the bird $0.25, paid in feathers, and the alarm then spends those feathers stuffing a tiny pillow for the neighbour it just woke up.

The joke is the invention itself: invoicing a pigeon, and accepting feathers as legal tender. It is also a complete absurd economy. There is a cause (the pigeon trips the alarm), a punishment (the invoice) and restitution (the feathers go to the exact person who lost sleep).

## Run

```sh
node main.ts              # writes the pitch to /output/entry.txt
node main.ts --self-test  # checks the validation rules and a temp-dir round trip
```

The entry is 154 characters, written as UTF-8 with no trailing newline. `main.ts` refuses to write anything that is blank, over 220 characters, multi-line, or not exactly one sentence.
