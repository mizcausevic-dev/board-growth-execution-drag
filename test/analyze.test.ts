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

  it("handles an empty estate without divide-by-zero drift", () => {
    const report = analyze([], { now: "2026-06-01T00:00:00Z" });

    expect(report.summary.items).toBe(0);
    expect(report.summary.averageBoardVisibility).toBe(0);
    expect(report.summary.highDragLanes).toBe(0);
  });

  it("classifies fully healthy lanes as contained", () => {
    const item = {
      ...sampleBoardGrowthExecutionDrag[0],
      action: "UNBLOCK" as const,
      coordinationLatencyScore: 20,
      operatingFrictionScore: 20,
      decisionLagScore: 20,
      deliveryReliabilityScore: 90,
      boardVisibilityScore: 90
    };

    const report = analyze([item], { now: "2026-06-01T00:00:00Z" });

    expect(report.summary.highDragLanes).toBe(0);
    expect(report.items[0]?.coordinationAssessment.severity).toBe("LOW");
    expect(report.items[0]?.deliveryAssessment.severity).toBe("LOW");
    expect(report.summary.leadingMessage).toContain("contained");
  });

  it("classifies pressure lanes without forcing high-drag escalation", () => {
    const item = {
      ...sampleBoardGrowthExecutionDrag[0],
      action: "PAUSE" as const,
      coordinationLatencyScore: 50,
      operatingFrictionScore: 50,
      decisionLagScore: 50,
      deliveryReliabilityScore: 70,
      boardVisibilityScore: 70
    };

    const report = analyze([item], { now: "2026-06-01T00:00:00Z" });

    expect(report.summary.highDragLanes).toBe(0);
    expect(report.items[0]?.frictionAssessment.severity).toBe("MEDIUM");
    expect(report.items[0]?.visibilityAssessment.severity).toBe("MEDIUM");
  });
});
