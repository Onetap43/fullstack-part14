import { eq } from "drizzle-orm"

import { db } from "../../db"
import {
  users,
  readingList,
} from "../../db/schema"
import { getCurrentUser } from "./session"

export const getMe = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return null
  }

  return db.query.users.findFirst({
    where: eq(users.id, currentUser.id),
    with: {
      readingList: {
        with: {
          blog: true,
        },
      },
    },
  })
}

export const isBlogInReadingList = async (
  userId: number,
  blogId: number
) => {
  return db.query.readingList.findFirst({
    where: (items, { and, eq }) =>
      and(
        eq(items.userId, userId),
        eq(items.blogId, blogId)
      ),
  })
}