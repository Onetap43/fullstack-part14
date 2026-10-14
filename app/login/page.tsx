"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [error, setError] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    const formData = new FormData(event.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
      return
    }

    showNotification("Login successful")
    router.push("/")
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>

      {error && (
        <p data-testid="error-message" className="mb-3 text-red-600">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Username
          <input
            type="text"
            name="username"
            required
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </label>

        <label className="block">
          Password
          <input
            type="password"
            name="password"
            required
            className="mt-1 block w-full rounded border px-3 py-2"
          />
        </label>

        <button
          type="submit"
          data-testid="login-button"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  )
}
