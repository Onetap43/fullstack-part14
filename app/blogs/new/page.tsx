"use client"

import {
  useActionState,
  useEffect,
} from "react"
import { useRouter } from "next/navigation"

import { createBlog } from "../../actions/blogs"

const initialState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false,
}

export default function NewBlog() {
  const [state, formAction] =
    useActionState(createBlog, initialState)

  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.push("/blogs?created=1")
    }
  }, [state.success, router])

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Create new blog
      </h1>

      <form
        action={formAction}
        className="space-y-4 rounded-lg border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            defaultValue={state.values.title}
            className="w-full rounded border px-3 py-2"
          />

          {state.errors.title && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.title}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Author
          </label>

          <input
            type="text"
            name="author"
            defaultValue={state.values.author}
            className="w-full rounded border px-3 py-2"
          />

          {state.errors.author && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.author}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-medium">
            URL
          </label>

          <input
            type="text"
            name="url"
            defaultValue={state.values.url}
            className="w-full rounded border px-3 py-2"
          />

          {state.errors.url && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.url}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  )
}