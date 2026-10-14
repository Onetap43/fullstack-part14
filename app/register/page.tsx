"use client"

import { useActionState } from "react"

import { registerUser, type RegisterState } from "../actions/users"

const initialState: RegisterState = {
  errors: {},
  values: {
    username: "",
    name: "",
  },
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Register</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block">
            Username
            <input
              type="text"
              name="username"
              defaultValue={state.values.username}
              className="mt-1 block w-full rounded border px-3 py-2"
            />
          </label>
          {state.errors.username && (
            <p data-testid="username-error" className="mt-1 text-red-600">
              {state.errors.username}
            </p>
          )}
        </div>

        <div>
          <label className="block">
            Name
            <input
              type="text"
              name="name"
              defaultValue={state.values.name}
              required
              className="mt-1 block w-full rounded border px-3 py-2"
            />
          </label>
        </div>

        <div>
          <label className="block">
            Password
            <input
              type="password"
              name="password"
              className="mt-1 block w-full rounded border px-3 py-2"
            />
          </label>
          {state.errors.password && (
            <p data-testid="password-error" className="mt-1 text-red-600">
              {state.errors.password}
            </p>
          )}
        </div>

        <div>
          <label className="block">
            Confirm Password
            <input
              type="password"
              name="passwordConfirm"
              className="mt-1 block w-full rounded border px-3 py-2"
            />
          </label>
          {state.errors.passwordConfirm && (
            <p
              data-testid="passwordConfirm-error"
              className="mt-1 text-red-600"
            >
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>

        {state.errors.general && (
          <p className="text-red-600">{state.errors.general}</p>
        )}

        <button
          type="submit"
          data-testid="register-button"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Register
        </button>
      </form>
    </div>
  )
}
