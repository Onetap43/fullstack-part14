import { notFound } from "next/navigation"

import { getBlogById } from "../../services/blogs"
import { likeBlog } from "../../actions/blogs"
import { getCurrentUser } from "../../services/session"
import { isBlogInReadingList } from "../../services/me"
import { addToReadingList } from "../../actions/me"

export const instant = false

const BlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const user = await getCurrentUser()

  const readingListEntry = user
    ? await isBlogInReadingList(user.id, blog.id)
    : null

  const canAddToReadingList =
    user && blog.userId !== user.id && !readingListEntry

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div
        data-testid="blog-detail"
        className="rounded-lg border bg-white p-6 shadow-sm"
      >
        <h1 data-testid="blog-title" className="mb-4 text-3xl font-bold">
          {blog.title}
        </h1>

        <p data-testid="blog-author" className="mb-2">
          <strong>Author:</strong> {blog.author}
        </p>

        <p className="mb-2">
          <strong>URL:</strong>{" "}
          <a href={blog.url} className="text-blue-600 hover:underline">
            {blog.url}
          </a>
        </p>

        <p className="mb-4">
          <strong>Likes:</strong> {blog.likes}
        </p>

        <form action={likeBlog} className="mb-4">
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Like
          </button>
        </form>

        {canAddToReadingList && (
          <form action={addToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              type="submit"
              data-testid="add-to-reading-list-button"
              className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            >
              Add to reading list
            </button>
          </form>
        )}

        {user && blog.userId !== user.id && readingListEntry && (
          <p className="text-green-700">Already in reading list</p>
        )}
      </div>
    </div>
  )
}

export default BlogPage
