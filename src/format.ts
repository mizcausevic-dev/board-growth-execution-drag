import type { BoardGrowthExecutionDragExport } from "./types.js";

export function formatSummary(report: BoardGrowthExecutionDragExport) {
  return [
    "Board Growth Execution Drag",
    `Generated: ${report.generatedAt}`,
    `Lanes: ${report.summary.items}`,
    `High-drag lanes: ${report.summary.highDragLanes}`,
    `Escalation lanes: ${report.summary.escalationLanes}`,
    `Average board visibility: ${report.summary.averageBoardVisibility}`,
    `Value at stake: $${report.summary.valueAtStakeMillions}M`,
    `Lead: ${report.summary.leadingMessage}`
  ].join("\n");
}

export function formatJson(report: BoardGrowthExecutionDragExport) {
  return JSON.stringify(report, null, 2);
}
