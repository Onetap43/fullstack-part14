import { notFound } from "next/navigation"

import { getBlogById } from "../../services/blogs"
import { likeBlog } from "../../actions/blogs"

export const instant = false

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const blog =
    await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-3xl font-bold">
          {blog.title}
        </h1>

        <p className="mb-2">
          <strong>Author:</strong>{" "}
          {blog.author}
        </p>

        <p className="mb-2">
          <strong>URL:</strong>{" "}
          <a
            href={blog.url}
            className="text-blue-600 hover:underline"
          >
            {blog.url}
          </a>
        </p>

        <p className="mb-4">
          <strong>Likes:</strong>{" "}
          {blog.likes}
        </p>

        <form action={likeBlog}>
          <input
            type="hidden"
            name="id"
            value={blog.id}
          />

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Like
          </button>
        </form>
      </div>
    </div>
  )
}

export default BlogPage