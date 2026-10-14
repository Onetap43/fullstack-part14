import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

import { db } from "@/db"
import { users } from "@/db/schema"

export const POST = async (
  request: Request
) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "This endpoint is not available in production",
      },
      { status: 403 }
    )
  }

  const {
    username,
    name,
    password,
  } = await request.json()

  const existing =
    await db.query.users.findFirst({
      where: eq(users.username, username),
    })

  if (existing) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 400 }
    )
  }

  const passwordHash =
    await bcrypt.hash(password, 10)

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  return NextResponse.json(
    {
      message: "User created successfully",
    },
    { status: 201 }
  )
}