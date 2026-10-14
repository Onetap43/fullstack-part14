import {
  and,
  eq,
} from "drizzle-orm"

import { db } from "../../db"
import { readingList } from "../../db/schema"

export const getReadingListForUser = async (
  userId: number
) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  })
}

export const hasReadingListBlog = async (
  userId: number,
  blogId: number
) => {
  const item =
    await db.query.readingList.findFirst({
      where: and(
        eq(readingList.userId, userId),
        eq(readingList.blogId, blogId)
      ),
    })

  return Boolean(item)
}

export const addReadingListBlog = async (
  userId: number,
  blogId: number
) => {
  const exists =
    await hasReadingListBlog(userId, blogId)

  if (exists) {
    return
  }

  await db.insert(readingList).values({
    userId,
    blogId,
    read: false,
  })
}

export const markReadingListBlogAsRead = async (
  id: number,
  userId: number
) => {
  await db
    .update(readingList)
    .set({
      read: true,
    })
    .where(
      and(
        eq(readingList.id, id),
        eq(readingList.userId, userId)
      )
    )
}