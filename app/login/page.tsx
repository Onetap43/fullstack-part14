"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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

    router.push("/")
    router.refresh()
  }

  return (
    <div>
      <h1>Login</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>

        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}