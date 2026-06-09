import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-growth-execution-drag app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Growth Execution Drag");
  });

  it("serves the drag lane route", async () => {
    const response = await request(app).get("/drag-lane");
    expect(response.status).toBe(200);
  });

  it("serves the blocker ledger route", async () => {
    const response = await request(app).get("/blocker-ledger");
    expect(response.status).toBe(200);
  });

  it("serves the intervention posture route", async () => {
    const response = await request(app).get("/intervention-posture");
    expect(response.status).toBe(200);
  });

  it("serves verification and docs routes", async () => {
    const verification = await request(app).get("/verification");
    const docs = await request(app).get("/docs");

    expect(verification.status).toBe(200);
    expect(docs.status).toBe(200);
    expect(docs.text).toContain("/api/payload");
  });

  it("returns 404 for unknown routes", async () => {
    const response = await request(app).get("/missing-route");
    expect(response.status).toBe(404);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });
});
