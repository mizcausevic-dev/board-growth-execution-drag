import { describe, expect, it } from "vitest";
import { blockerLedger, dragLane, interventionPosture, payload, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the drag summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the drag lane view", () => {
    expect(dragLane().length).toBeGreaterThan(0);
  });

  it("returns the blocker ledger view", () => {
    expect(blockerLedger().length).toBeGreaterThan(0);
  });

  it("returns the intervention posture view", () => {
    expect(interventionPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
