import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  entries: defineTable({
    input: v.string(),
    response: v.string(),
  }),
});
