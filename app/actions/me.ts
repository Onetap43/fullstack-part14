"use server"

import { randomUUID } from "crypto"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { db } from "../../db"
import {
  users,
  readingList,
} from "../../db/schema"
import { getCurrentUser } from "../services/session"

export const generateApiToken = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const token = randomUUID()

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, user.id))

  revalidatePath("/me")
}

export const addToReadingList = async (
  formData: FormData
) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))

  const existing =
    await db.query.readingList.findFirst({
      where: (items, { and, eq }) =>
        and(
          eq(items.userId, user.id),
          eq(items.blogId, blogId)
        ),
    })

  if (!existing) {
    await db.insert(readingList).values({
      userId: user.id,
      blogId,
      read: false,
    })
  }

  revalidatePath("/me")
  revalidatePath(`/blogs/${blogId}`)
}

export const markAsRead = async (
  formData: FormData
) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const id = Number(formData.get("id"))

  await db
    .update(readingList)
    .set({ read: true })
    .where(eq(readingList.id, id))

  revalidatePath("/me")
}