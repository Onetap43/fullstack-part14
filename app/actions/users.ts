"use server"

import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

import { db } from "../../db"
import { users } from "../../db/schema"

export type RegisterState = {
  errors: {
    username?: string
    password?: string
    passwordConfirm?: string
    general?: string
  }
  values: {
    username: string
    name: string
  }
}

export const registerUser = async (
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> => {
  const username = (formData.get("username") as string)?.trim() ?? ""
  const name = (formData.get("name") as string)?.trim() ?? ""
  const password = (formData.get("password") as string) ?? ""
  const passwordConfirm = (formData.get("passwordConfirm") as string) ?? ""

  const values = { username, name }
  const errors: RegisterState["errors"] = {}

  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters"
  }

  if (password.length < 4) {
    errors.password = "Password must be at least 4 characters"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values }
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (existingUser) {
    return {
      errors: { username: "Username already exists" },
      values,
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  redirect("/login")
}
