import Link from "next/link"
import { redirect } from "next/navigation"

import { getMe } from "../services/me"
import { generateApiToken, markAsRead } from "../actions/me"

export const instant = false

export default async function MePage() {
  const user = await getMe()

  if (!user) {
    redirect("/login")
  }

  const unread = user.readingList.filter((item) => !item.read)
  const read = user.readingList.filter((item) => item.read)

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My page</h1>

      <section
        data-testid="user-profile"
        className="mb-8 rounded-lg border bg-white p-5 shadow-sm"
      >
        <p data-testid="user-name">
          <strong>Name:</strong> {user.name}
        </p>

        <p data-testid="user-username">
          <strong>Username:</strong> {user.username}
        </p>
      </section>

      <section
        data-testid="api-token-section"
        className="mb-8 rounded-lg border bg-white p-5 shadow-sm"
      >
        <h2 className="mb-2 text-xl font-bold">API token</h2>

        {user.token ? (
          <div data-testid="token-display">
            <code
              data-testid="api-token"
              className="block break-all rounded bg-gray-100 p-3"
            >
              {user.token}
            </code>
          </div>
        ) : (
          <p data-testid="no-token-message">
            No token has been generated yet.
          </p>
        )}

        <form action={generateApiToken} className="mt-3">
          <button
            type="submit"
            data-testid="generate-token-button"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Generate new token
          </button>
        </form>
      </section>

      <section data-testid="reading-list-section">
        <h2 className="mb-3 text-2xl font-bold">Reading list</h2>

        {user.readingList.length === 0 && (
          <p data-testid="empty-reading-list">Reading list is empty.</p>
        )}

        <div data-testid="unread-section" className="mb-8">
          <h3 className="mb-3 text-xl font-bold">Unread</h3>

          {unread.length === 0 ? (
            <p data-testid="no-unread-blogs">No unread blogs.</p>
          ) : (
            <ul className="space-y-3">
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

                  <form action={markAsRead} className="mt-2">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      data-testid={`mark-read-${item.id}`}
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    >
                      Mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div data-testid="read-section">
          <h3 className="mb-3 text-xl font-bold">Read</h3>

          {read.length === 0 ? (
            <p>No read blogs.</p>
          ) : (
            <ul className="space-y-3">
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
          )}
        </div>
      </section>
    </div>
  )
}
