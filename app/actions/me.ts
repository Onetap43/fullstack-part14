"use server"

import { randomUUID } from "crypto"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { db } from "../../db"
import { readingList, users } from "../../db/schema"
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
  redirect("/me")
}

export const addToReadingList = async (formData: FormData) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))

  const existing = await db.query.readingList.findFirst({
    where: (item, { and, eq }) =>
      and(
        eq(item.userId, user.id),
        eq(item.blogId, blogId)
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

export const markAsRead = async (formData: FormData) => {
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