"use client"

import { useActionState } from "react"

import { registerUser } from "../actions/users"

const initialState = {
  error: "",
  values: {
    username: "",
    name: "",
  },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(
    registerUser,
    initialState
  )

  return (
    <div>
      <h1>Register</h1>

      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values.username}
            />
          </label>
        </div>

        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              defaultValue={state.values.name}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input type="password" name="password" />
          </label>
        </div>

        <div>
          <label>
            Confirm password
            <input
              type="password"
              name="passwordConfirm"
            />
          </label>
        </div>

        {state.error && <p>{state.error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  )
}