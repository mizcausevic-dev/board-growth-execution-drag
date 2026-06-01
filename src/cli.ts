import { readFileSync } from "node:fs";
import { formatJson, formatSummary } from "./format.js";
import type { BoardGrowthExecutionDragExport } from "./types.js";

const defaultPath = "fixtures/board-growth-execution-drag.json";
const args = process.argv.slice(2);
const inputPath = args.find((arg) => !arg.startsWith("--")) ?? defaultPath;
const formatArg = args.includes("--format") ? args[args.indexOf("--format") + 1] ?? "summary" : "summary";

if (args.includes("--help")) {
  console.error("Usage: board-growth-execution-drag <file> --format <summary|json>");
  process.exit(0);
}

const report = JSON.parse(readFileSync(inputPath, "utf8")) as BoardGrowthExecutionDragExport;

if (formatArg === "json") {
  console.log(formatJson(report));
} else {
  console.log(formatSummary(report));
}
