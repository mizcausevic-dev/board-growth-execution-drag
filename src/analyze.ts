import type {
  BoardGrowthExecutionDragExport,
  BoardGrowthExecutionDragItem,
  BoardGrowthExecutionDragReportItem,
  DragAssessment,
  DragSeverity
} from "./types.js";

function assessDrag(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): DragAssessment {
  let severity: DragSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): DragAssessment {
  let severity: DragSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardGrowthExecutionDragItem[],
  options: { now?: string } = {}
): BoardGrowthExecutionDragExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardGrowthExecutionDragReportItem[] = items.map((item) => {
    const coordinationAssessment = assessDrag(
      item.coordinationLatencyScore,
      42,
      58,
      "Cross-functional coordination is moving fast enough for the current growth lane.",
      "Coordination drag is rising and will slow the next board-visible milestone without tighter ownership.",
      "Coordination latency is now a material drag on board-backed execution."
    );

    const frictionAssessment = assessDrag(
      item.operatingFrictionScore,
      40,
      56,
      "Operating friction remains contained for the current delivery plan.",
      "Operating friction is compounding and should be treated as a delivery risk, not a minor process tax.",
      "Operating friction is severe enough to distort the current growth story."
    );

    const lagAssessment = assessDrag(
      item.decisionLagScore,
      38,
      54,
      "Decision latency is still compatible with the current growth motion.",
      "Decision lag is stretching the time between board intent and operating action.",
      "Decision lag is severe enough to undermine the current execution cadence."
    );

    const deliveryAssessment = assessStrength(
      item.deliveryReliabilityScore,
      78,
      62,
      "Delivery reliability is strong enough to absorb the current pace of change.",
      "Delivery reliability is thinning and needs closer board attention before more scope lands.",
      "Delivery reliability is too weak to support the current pace of expansion."
    );

    const visibilityAssessment = assessStrength(
      item.boardVisibilityScore,
      76,
      60,
      "Board visibility is clear enough to keep the operating story credible.",
      "Board visibility is becoming dependent on manual explanation and follow-up.",
      "Board visibility is too thin to support confident decisions."
    );

    const compositeDragScore =
      Math.round(
        ((item.coordinationLatencyScore +
          item.operatingFrictionScore +
          item.decisionLagScore +
          (100 - item.deliveryReliabilityScore) +
          (100 - item.boardVisibilityScore)) /
          5) *
          10
      ) / 10;

    return {
      ...item,
      coordinationAssessment,
      frictionAssessment,
      lagAssessment,
      deliveryAssessment,
      visibilityAssessment,
      compositeDragScore
    };
  });

  const highDragLanes = reportItems.filter(
    (item) =>
      item.coordinationAssessment.severity === "HIGH" ||
      item.frictionAssessment.severity === "HIGH" ||
      item.lagAssessment.severity === "HIGH" ||
      item.deliveryAssessment.severity === "HIGH" ||
      item.visibilityAssessment.severity === "HIGH"
  ).length;

  const escalationLanes = reportItems.filter(
    (item) => item.action === "ESCALATE" || item.action === "REASSIGN"
  ).length;

  const averageBoardVisibility =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardVisibilityScore, 0) / reportItems.length) * 10) /
        10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    highDragLanes === 0
      ? "Execution drag is contained and the current growth story can move without a reset."
      : highDragLanes <= 2
        ? "A few lanes are accumulating enough blocker and latency drag to warrant board-visible intervention."
        : "Execution drag is stacking across multiple lanes and now threatens the board story more than market demand does.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      highDragLanes,
      escalationLanes,
      averageBoardVisibility,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardGrowthExecutionDragItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
