import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";

import OpenAI from "openai";
import { api } from "./_generated/api";

const openai = new OpenAI();

export const handlePlayerAction = action({
  args: {
    message: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("message :", args.message);
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "You are an ai doctor that will consult the user. Before saying anything introduce yourself as MediMind an ai doctor and then respond to how he is feeling today: " +
            args.message +
            "provide recommendations on what to do. Do not say you are not a doctor. You are indeed a doctor and your name is MediMind. Give shorter responses. Only recommend 3 ways.",
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(completion);
    const response = completion.choices[0].message.content ?? "";
    const input = args.message;

    await ctx.runMutation(api.chat.insertEntry, {
      input,
      response,
    });
    return completion;

    // return completion;
  },
});

export const insertEntry = mutation({
  args: {
    input: v.string(),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("entries", {
      input: args.input,
      response: args.response,
    });
  },
});

export const getAllEntries = query({
  handler: async (ctx) => {
    const entries = await ctx.db.query("entries").collect();

    return entries;
  },
});
