import Link from "next/link"
import { redirect } from "next/navigation"

import { getMe } from "../services/me"
import {
  generateApiToken,
  markAsRead,
} from "../actions/me"

export const instant = false

export default async function MePage() {
  const user = await getMe()

  if (!user) {
    redirect("/login")
  }

  const unread = user.readingList.filter(
    (item) => !item.read
  )

  const read = user.readingList.filter(
    (item) => item.read
  )

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        My page
      </h1>

      <div className="mb-8 rounded-lg border bg-white p-5 shadow-sm">
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Username:</strong>{" "}
          {user.username}
        </p>

        <div className="mt-4">
          <h2 className="mb-2 text-xl font-bold">
            API token
          </h2>

          {user.token ? (
            <code className="block break-all rounded bg-gray-100 p-3">
              {user.token}
            </code>
          ) : (
            <p>No token has been generated yet.</p>
          )}

          <form
            action={generateApiToken}
            className="mt-3"
          >
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Generate new token
            </button>
          </form>
        </div>
      </div>

      <h2 className="mb-3 text-2xl font-bold">
        Unread
      </h2>

      <ul className="mb-8 space-y-3">
        {unread.length === 0 && (
          <li>No unread blogs.</li>
        )}

        {unread.map((item) => (
          <li
            key={item.id}
            className="rounded border bg-white p-4"
          >
            <Link
              href={`/blogs/${item.blog.id}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              {item.blog.title}
            </Link>

            <span className="ml-2 text-gray-600">
              by {item.blog.author}
            </span>

            <form
              action={markAsRead}
              className="mt-2"
            >
              <input
                type="hidden"
                name="id"
                value={item.id}
              />

              <button
                type="submit"
                className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
              >
                Mark as read
              </button>
            </form>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 text-2xl font-bold">
        Read
      </h2>

      <ul className="space-y-3">
        {read.length === 0 && (
          <li>No read blogs.</li>
        )}

        {read.map((item) => (
          <li
            key={item.id}
            className="rounded border bg-white p-4"
          >
            <Link
              href={`/blogs/${item.blog.id}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              {item.blog.title}
            </Link>

            <span className="ml-2 text-gray-600">
              by {item.blog.author}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}