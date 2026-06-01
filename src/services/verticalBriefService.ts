import { analyze } from "../analyze.js";
import { sampleBoardGrowthExecutionDrag } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardGrowthExecutionDrag, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Unblock procurement and AI throughput first, reset identity and biotech review continuity, and reassign fragmented FinTech execution before approving the next expansion claim."
  };
}

export function dragLane() {
  return sampleBoardGrowthExecutionDrag.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    dragTheme: item.dragTheme,
    boardVisibilityScore: item.boardVisibilityScore,
    nextMove: item.nextMove
  }));
}

export function blockerLedger() {
  return sampleBoardGrowthExecutionDrag.map((item) => ({
    lane: item.lane,
    blockerHeadline: item.blockerHeadline,
    delaySignal: item.delaySignal,
    escalationOwner: item.escalationOwner,
    requiredEvidence: item.requiredEvidence
  }));
}

export function interventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeDragScore: item.compositeDragScore,
    coordination: item.coordinationAssessment,
    friction: item.frictionAssessment,
    decisionLag: item.lagAssessment,
    delivery: item.deliveryAssessment,
    visibility: item.visibilityAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeDragScore: item.compositeDragScore,
    boardVisibilityScore: item.boardVisibilityScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic execution-drag data only - no live board packets, project plans, or actual blocker logs are included.",
    "Scores are modeled to show how Kinetic Gain can convert execution friction into board-readable intervention priorities.",
    "All routes are read-only and meant to demonstrate blocker packaging, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    dragLane: dragLane(),
    blockerLedger: blockerLedger(),
    interventionPosture: interventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardGrowthExecutionDrag
  };
}
