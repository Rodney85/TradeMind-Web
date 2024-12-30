import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { Id } from "./_generated/dataModel"

export const createResetToken = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Generate a random token
    const token = Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15)
    
    // Create reset token that expires in 1 hour
    const tokenId = await ctx.db.insert("resetTokens", {
      userId: args.userId,
      token,
      expiresAt: Date.now() + 3600000, // 1 hour from now
      used: false,
    })

    return token
  },
})

export const validateResetToken = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const resetToken = await ctx.db
      .query("resetTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first()

    if (!resetToken) {
      return { valid: false, message: "Invalid token" }
    }

    if (resetToken.used) {
      return { valid: false, message: "Token has already been used" }
    }

    if (resetToken.expiresAt < Date.now()) {
      return { valid: false, message: "Token has expired" }
    }

    return { valid: true, userId: resetToken.userId }
  },
})

export const useResetToken = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const resetToken = await ctx.db
      .query("resetTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first()

    if (!resetToken) {
      throw new Error("Invalid token")
    }

    if (resetToken.used) {
      throw new Error("Token has already been used")
    }

    if (resetToken.expiresAt < Date.now()) {
      throw new Error("Token has expired")
    }

    // Mark token as used
    await ctx.db.patch(resetToken._id, { used: true })

    return resetToken.userId
  },
})
