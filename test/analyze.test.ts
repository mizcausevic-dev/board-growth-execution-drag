import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardGrowthExecutionDrag } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardGrowthExecutionDrag, { now: "2026-06-01T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardGrowthExecutionDrag.length);
  });

  it("counts high-drag lanes", () => {
    const report = analyze(sampleBoardGrowthExecutionDrag, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.highDragLanes).toBeGreaterThan(0);
  });

  it("counts escalation actions", () => {
    const report = analyze(sampleBoardGrowthExecutionDrag, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.escalationLanes).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardGrowthExecutionDrag, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(144);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardGrowthExecutionDrag, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });
});
