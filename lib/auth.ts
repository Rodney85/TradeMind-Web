import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(client: any, userData: { 
  email: string
  password: string
  name: string 
}) {
  const hashedPassword = await hashPassword(userData.password)
  
  try {
    const userId = await client.mutation(api.users.createUser, {
      email: userData.email,
      name: userData.name,
      hashedPassword,
      authProvider: "credentials"
    })
    
    return { success: true, userId }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function verifyUser(client: any, email: string, password: string) {
  try {
    const user = await client.query(api.users.getUserByEmail, { email })
    
    if (!user) {
      return { success: false, error: "User not found" }
    }
    
    const isValid = await verifyPassword(password, user.hashedPassword)
    
    if (!isValid) {
      return { success: false, error: "Invalid password" }
    }
    
    return { success: true, user }
  } catch (error) {
    console.error("Error verifying user:", error)
    return { success: false, error: (error as Error).message }
  }
}
