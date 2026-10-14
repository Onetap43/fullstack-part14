"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

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

const initialState: BlogFormState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false,
}

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully!")
      router.push("/blogs")
      router.refresh()
    }
  }, [state.success, showNotification, router])

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Create new blog</h1>

      <form
        action={formAction}
        className="space-y-4 rounded-lg border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block font-medium">
            Title
            <input
              type="text"
              name="title"
              defaultValue={state.values.title}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>

          {state.errors.title && (
            <p className="mt-1 text-sm text-red-600">{state.errors.title}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Author
            <input
              type="text"
              name="author"
              defaultValue={state.values.author}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>

          {state.errors.author && (
            <p className="mt-1 text-sm text-red-600">{state.errors.author}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">
            URL
            <input
              type="text"
              name="url"
              defaultValue={state.values.url}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </label>

          {state.errors.url && (
            <p className="mt-1 text-sm text-red-600">{state.errors.url}</p>
          )}
        </div>

        <button
          type="submit"
          data-testid="create-blog-button"
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  )
}
