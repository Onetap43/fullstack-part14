"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { getCurrentUser } from "../services/session"
import {
  addReadingListBlog,
  markReadingListBlogAsRead,
} from "../services/readingList"

export const addBlogToReadingList = async (
  formData: FormData
) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const blogId =
    Number(formData.get("blogId"))

  await addReadingListBlog(
    user.id,
    blogId
  )

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

  const id =
    Number(formData.get("id"))

  await markReadingListBlogAsRead(
    id,
    user.id
  )

  revalidatePath("/me")
}