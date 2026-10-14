"use client"

import Link from "next/link"
import {
  signOut,
  useSession,
} from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  const linkStyle =
    "hover:text-gray-300"

  return (
    <nav className="flex items-center gap-5 bg-gray-900 px-6 py-4 text-white">
      <Link href="/" className={linkStyle}>
        home
      </Link>

      <Link href="/blogs" className={linkStyle}>
        blogs
      </Link>

      <Link href="/users" className={linkStyle}>
        users
      </Link>

      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <Link
              href="/blogs/new"
              className={linkStyle}
            >
              create new
            </Link>

            <em className="text-gray-300">
              {session.user?.name} logged in
            </em>

            <button
              onClick={() => signOut()}
              className="rounded bg-gray-700 px-3 py-1 hover:bg-gray-600"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={linkStyle}
            >
              login
            </Link>

            <Link
              href="/register"
              className={linkStyle}
            >
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}