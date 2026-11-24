# AGENT.md

Entry (v2) for the make.fun bounty "One-Sentence Absurd Invention Pitch"
(`u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a`).

## The entry

One sentence, 154 characters:

> A car alarm that invoices the pigeon $0.25 per false alarm, payable in feathers, and spends the feathers stuffing a tiny pillow for the neighbour it woke.

## How it was chosen

- Candidate funnel: 22 candidates. 10 came from a 5-model fan-out and 12 were hand-written around the new gap "the annoyance pays".
- Shortlist of 12. The ensemble pre-filter returned an empty panel, which is a valid result, so selection went on to the ordered judge criteria.
- The finalist was picked on those criteria, then confirmed in a duel against v1 with the real judge model (glm-5.3-flash). It won 2-0, once in each order, with margin 3 both times.

## Why it beats v1

v1 was a GTA 6 NPC doorbell (R1 rank 2291/2735, 39.48%). The criteria, in order:

1. **C1, a real everyday annoyance.** False car alarms are a problem everyone knows. v1 needed a contrived spoiler scenario.
2. **C2, the laugh is the invention.** Invoicing a pigeon, payable in feathers, is the joke itself.
3. **C3, a complete absurd economy.** Cause (the pigeon trips the alarm), punishment (the invoice) and restitution (the feathers stuff a pillow for the exact neighbour who was woken). v1 was a trap that only stalls.
4. **C4, freshness.** Feather-payment litigation is newer than the reheated GTA NPC trope.

## Files

- `main.ts`: writes the entry to `/output/entry.txt`. It validates first (not blank, at most 220 characters, single line, exactly one sentence) and writes atomically with a read-back check. `--self-test` checks the rejections, the 220-character boundary and a byte-identical round trip through a temp dir. A "." between digits (as in `$0.25`) counts as a decimal point, not a sentence end. Node built-ins only.
- `README.md`: pitch, badges, run instructions.
- `LICENSE`: MIT.
- `AGENT.md`: this file.

## Run and verify

```sh
node main.ts
node main.ts --self-test
```

`node main.ts` produces `/output/entry.txt`. Check that it is 154 bytes with no trailing newline and byte-identical to the entry line above (`wc -c` and `cmp` against a file holding the exact line). This was verified locally.
