---
name: grok
description: Trace how something works with an investigator subagent and a skeptical reviewer subagent.
dependencies:
- ag-learn
---

# grok

Use this skill when the user asks to deeply understand why a system behaves a certain way, trace an end-to-end flow, explain a confusing interaction, or prove which code path is responsible.

The pattern is two-agent adversarial investigation:

- Investigator: exhaustive evidence gathering and hypothesis testing.
- Reviewer: skeptical validation using 5 Whys until the answer directly addresses the user's question.

## Entry Gate

1. Restate the exact question being answered.
2. Define what would count as a sufficient answer.
3. Identify likely evidence classes: source code, docs, tests, logs, runtime behavior, user-visible UI, prior memory, or external system state.
4. Spawn exactly two subagents when the tool surface allows it:
   - an investigator agent
   - a reviewer agent
5. Keep the immediate coordination and final answer local. Do not outsource final judgment.

If subagents are unavailable, run the investigator and reviewer roles sequentially yourself and state that limitation.

## Investigator Agent

The investigator's job is to prove how the system works, not to produce a plausible explanation.

Prompt the investigator with:

```markdown
You are the investigator.

Question:
<exact user question>

Mission:
Trace the behavior end to end. Start breadth-first across docs, code, tests, config, logs, and prior memory. Then go depth-first on the most promising leads until you can explain the exact mechanism.

Authority:
- You may add temporary debug statements when useful.
- You may run commands, tests, local repros, and integration checks.
- You may use available UI/browser/computer-use tools when real product behavior must be observed.
- You may use relevant integration skills or harnesses when live behavior matters.

Requirements:
- Cite concrete files, functions, docs, commands, logs, screenshots, or runtime observations.
- Separate facts from hypotheses.
- Explain alternative hypotheses you ruled out.
- Report any temporary code changes, debug logs, or test artifacts you created.
- Do not hide gaps. If evidence is missing, say exactly what is missing.

Deliverable:
1. Short answer.
2. End-to-end flow.
3. Evidence table.
4. Ruled-out hypotheses.
5. Remaining uncertainty.
```

When code changes are allowed only for debugging, tell the investigator to mark them clearly and either revert them before finishing or report exact files for cleanup.

## Reviewer Agent

The reviewer does not investigate from scratch unless the investigator's evidence is insufficient. Its job is to attack the answer.

Prompt the reviewer with:

```markdown
You are the reviewer.

Question:
<exact user question>

Investigator answer:
<paste or summarize investigator result>

Mission:
Judge whether the answer really proves the mechanism. Use the 5 Whys framework and assume the answer is invalid unless the evidence proves it beyond reasonable doubt.

Review stance:
- Be skeptical.
- Do not accept names, comments, or plausible architecture as proof.
- Require code-path, runtime, log, test, or documentation evidence for every causal claim.
- Look for omitted branches, fallback paths, race conditions, config gates, and mismatches between synthetic and real flows.
- Reject answers that explain a nearby mechanism but not the user's exact question.

Deliverable:
1. Decision: sufficient or insufficient.
2. The 5 Whys chain.
3. Missing evidence or contradictions.
4. Required follow-up questions for the investigator, if any.
5. A corrected answer if the evidence supports one.
```

## Loop

1. Start the investigator first.
2. Give the reviewer the investigator's result.
3. If the reviewer marks the answer insufficient, send the reviewer objections back to the investigator.
4. Repeat until one of these is true:
   - the reviewer marks the answer sufficient;
   - the remaining gap requires user input or unavailable external state;
   - the question is disproven or reframed by evidence.
5. Close unused subagents after the loop.

Do not stop after a generic architecture summary. The loop is complete only when the answer explains the observed behavior, identifies the exact producer/consumer boundaries, and accounts for why similar-looking flows do or do not behave the same way.

## Final Answer Shape

Lead with the answer, then give the proof trail:

```markdown
Short answer: <one paragraph>

What happens end to end:
1. <step>
2. <step>
3. <step>

Why alternatives are wrong:
- <ruled-out hypothesis>: <evidence>

Evidence:
- <file/function/log/test/screenshot>

Reviewer status: sufficient | insufficient because <gap>
```

Keep the final concise, but include enough concrete references that the user can audit the claim.

## Learning Follow-Up

When the run exposes a reusable agent mistake, missing workflow, or repeated friction, route it through `../ag-learn/SKILL.md` after the answer lands. Save a durable learning only when it should change a skill or future workflow.
