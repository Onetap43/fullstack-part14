"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { addBlog, addLike } from "../services/blogs"
import { getCurrentUser } from "../services/session"

type BlogFormState = {
  errors: {
    title?: string
    author?: string
    url?: string
  }
  values: {
    title: string
    author: string
    url: string
  }
  success: boolean
}

export const createBlog = async (
  _prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const title =
    (formData.get("title") as string)?.trim() ?? ""

  const author =
    (formData.get("author") as string)?.trim() ?? ""

  const url =
    (formData.get("url") as string)?.trim() ?? ""

  const errors: BlogFormState["errors"] = {}

  if (title.length < 5) {
    errors.title =
      "Title must be at least 5 characters"
  }

  if (author.length < 5) {
    errors.author =
      "Author must be at least 5 characters"
  }

  if (url.length < 5) {
    errors.url =
      "URL must be at least 5 characters"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
      success: false,
    }
  }

  await addBlog(
    title,
    author,
    url,
    user.id
  )

  revalidatePath("/blogs")

  return {
    errors: {},
    values: {
      title: "",
      author: "",
      url: "",
    },
    success: true,
  }
}

export const likeBlog = async (
  formData: FormData
) => {
  const id = Number(formData.get("id"))

  await addLike(id)

  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
}