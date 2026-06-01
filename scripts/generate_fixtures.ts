import { writeFileSync } from "node:fs";
import { sampleBoardGrowthExecutionDrag } from "../src/data/sampleVerticalBrief.js";
import { toExport } from "../src/analyze.js";

const clean = sampleBoardGrowthExecutionDrag.map((item) => ({
  ...item,
  relatedSurfaces: [],
  companyTags: [],
  narrative: "[redacted]",
  nextMove: "[redacted]"
}));

writeFileSync("fixtures/board-growth-execution-drag.json", JSON.stringify(toExport(sampleBoardGrowthExecutionDrag), null, 2));
writeFileSync("fixtures/board-growth-execution-drag-clean.json", JSON.stringify(toExport(clean), null, 2));
