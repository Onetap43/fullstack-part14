import Link from "next/link"

import { getBlogs } from "../services/blogs"
import BlogCreatedNotification from "./BlogCreatedNotification"

export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{
    filter?: string
    created?: string
  }>
}) => {
  const { filter, created } =
    await searchParams

  const search =
    filter?.toLowerCase() ?? ""

  const allBlogs = await getBlogs()

  const blogs = allBlogs
    .filter((blog) =>
      blog.title
        .toLowerCase()
        .includes(search)
    )
    .sort((a, b) => b.likes - a.likes)

  return (
    <div className="mx-auto max-w-3xl p-6">
      <BlogCreatedNotification
        created={created === "1"}
      />

      <h1 className="mb-6 text-3xl font-bold">
        Blogs
      </h1>

      <form
        action="/blogs"
        method="get"
        className="mb-6 flex gap-2"
      >
        <input
          type="text"
          name="filter"
          defaultValue={filter ?? ""}
          placeholder="search by title"
          className="flex-1 rounded border bg-white px-3 py-2"
        />

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <ul className="space-y-3">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="rounded-lg border bg-white p-4 shadow-sm hover:bg-gray-50"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>

            <p className="mt-1 text-sm text-gray-600">
              by {blog.author} — {blog.likes} likes
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs