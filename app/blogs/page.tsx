import Link from "next/link"

import { getBlogs } from "../services/blogs"

export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams

  const search = filter?.toLowerCase() ?? ""

  const blogs = getBlogs()
    .filter((blog) =>
      blog.title.toLowerCase().includes(search)
    )
    .sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs</h1>

      <form action="/blogs" method="get">
        <input
          type="text"
          name="filter"
          defaultValue={filter ?? ""}
          placeholder="search by title"
        />

        <button type="submit">Search</button>
      </form>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>{" "}
            by {blog.author} — {blog.likes} likes
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs