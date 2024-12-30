import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    hashedPassword: v.string(),
    authProvider: v.string(),
    providerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_provider", ["authProvider", "providerId"]),
  
  payments: defineTable({
    userId: v.id("users"),
    status: v.string(),
    amount: v.number(),
    paymentMethod: v.string(),
    paymentIntentId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    failureReason: v.optional(v.string()),
    retryCount: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),
})
