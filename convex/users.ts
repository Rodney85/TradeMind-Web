import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel"

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    hashedPassword: v.string(),
    authProvider: v.string(),
  },
  handler: async (ctx, args: { email: string; name: string; hashedPassword: string; authProvider: string }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first()

    if (existingUser) {
      throw new Error("Account already exists. Please sign in instead.")
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    return userId
  },
})

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args: { email: string }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first()
  },
})

export const updatePassword = mutation({
  args: {
    userId: v.id("users"),
    hashedPassword: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      hashedPassword: args.hashedPassword,
    })
  },
})
