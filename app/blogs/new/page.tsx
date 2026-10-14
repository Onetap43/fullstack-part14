"use client"

import { useActionState } from "react"

import { createBlog } from "../../actions/blogs"

const initialState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
}

export default function NewBlog() {
  const [state, formAction] = useActionState(
    createBlog,
    initialState
  )

  return (
    <div>
      <h1>Create new blog</h1>

      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              defaultValue={state.values.title}
            />
          </label>

          {state.errors.title && <p>{state.errors.title}</p>}
        </div>

        <div>
          <label>
            Author
            <input
              type="text"
              name="author"
              defaultValue={state.values.author}
            />
          </label>

          {state.errors.author && <p>{state.errors.author}</p>}
        </div>

        <div>
          <label>
            URL
            <input
              type="text"
              name="url"
              defaultValue={state.values.url}
            />
          </label>

          {state.errors.url && <p>{state.errors.url}</p>}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}