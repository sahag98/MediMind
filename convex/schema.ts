import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  entries: defineTable({
    input: v.string(),
    response: v.string(),
    consultationId: v.id("consultations"),
  }),
  consultations: defineTable({
    name: v.string(),
    user_id: v.string(),
  }),
});
