import { eq, sql } from "drizzle-orm"

import { db } from "../../db"
import {
  blogs,
  readingList,
} from "../../db/schema"

export const getBlogs = async () => {
  return db.query.blogs.findMany()
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  userId: number
) => {
  const [createdBlog] = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      likes: 0,
      userId,
    })
    .returning({
      id: blogs.id,
    })

  if (createdBlog) {
    await db.insert(readingList).values({
      userId,
      blogId: createdBlog.id,
      read: false,
    })
  }
}

export const addLike = async (id: number) => {
  await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`,
    })
    .where(eq(blogs.id, id))
}