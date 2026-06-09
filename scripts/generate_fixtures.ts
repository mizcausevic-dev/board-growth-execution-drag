import { writeFileSync } from "node:fs";
import { sampleBoardGrowthExecutionDrag } from "../src/data/sampleVerticalBrief.js";
import { toExport } from "../src/analyze.js";

const FIXTURE_GENERATED_AT = "2026-06-01T00:00:00Z";

const clean = sampleBoardGrowthExecutionDrag.map((item) => ({
  ...item,
  relatedSurfaces: [],
  companyTags: [],
  narrative: "[redacted]",
  nextMove: "[redacted]"
}));

writeFileSync("fixtures/board-growth-execution-drag.json", JSON.stringify(toExport(sampleBoardGrowthExecutionDrag, { now: FIXTURE_GENERATED_AT }), null, 2));
writeFileSync("fixtures/board-growth-execution-drag-clean.json", JSON.stringify(toExport(clean, { now: FIXTURE_GENERATED_AT }), null, 2));
