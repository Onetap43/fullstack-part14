import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

import { db } from "../../../db"
import { users } from "../../../db/schema"

export async function GET(
  request: Request
) {
  const authorization =
    request.headers.get("authorization")

  if (
    !authorization ||
    !authorization.startsWith("Bearer ")
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const token =
    authorization.slice(7)

  const user =
    await db.query.users.findFirst({
      where: eq(users.token, token),
      with: {
        readingList: {
          with: {
            blog: true,
          },
        },
      },
    })

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    readingList:
      user.readingList.map((item) => ({
        author: item.blog.author,
        title: item.blog.title,
        url: item.blog.url,
        read: item.read,
      })),
  })
}