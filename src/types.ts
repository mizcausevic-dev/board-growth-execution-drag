export type ExecutionDragTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type DragAction = "UNBLOCK" | "REASSIGN" | "PAUSE" | "ESCALATE";

export type DragSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardGrowthExecutionDragItem {
  id: string;
  lane: string;
  track: ExecutionDragTrack;
  action: DragAction;
  dragTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  blockerHeadline: string;
  delaySignal: string;
  escalationOwner: string;
  requiredEvidence: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  coordinationLatencyScore: number;
  operatingFrictionScore: number;
  decisionLagScore: number;
  deliveryReliabilityScore: number;
  boardVisibilityScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface DragAssessment {
  severity: DragSeverity;
  ok: boolean;
  message: string;
}

export interface BoardGrowthExecutionDragReportItem extends BoardGrowthExecutionDragItem {
  coordinationAssessment: DragAssessment;
  frictionAssessment: DragAssessment;
  lagAssessment: DragAssessment;
  deliveryAssessment: DragAssessment;
  visibilityAssessment: DragAssessment;
  compositeDragScore: number;
}

export interface BoardGrowthExecutionDragSummary {
  items: number;
  highDragLanes: number;
  escalationLanes: number;
  averageBoardVisibility: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardGrowthExecutionDragExport {
  generatedAt: string;
  summary: BoardGrowthExecutionDragSummary;
  items: BoardGrowthExecutionDragReportItem[];
}

export interface BoardGrowthExecutionDragPayload {
  report: BoardGrowthExecutionDragExport;
  dragLane: ReturnType<typeof import("./services/verticalBriefService.js").dragLane>;
  blockerLedger: ReturnType<typeof import("./services/verticalBriefService.js").blockerLedger>;
  interventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").interventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardGrowthExecutionDragItem[];
}
