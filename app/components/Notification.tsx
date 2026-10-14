"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) {
    return null
  }

  return (
    <div
      data-testid="notification"
      className={
        type === "success"
          ? "mx-auto mt-4 max-w-3xl rounded bg-green-600 px-4 py-3 text-white"
          : "mx-auto mt-4 max-w-3xl rounded bg-red-600 px-4 py-3 text-white"
      }
    >
      {message}
    </div>
  )
}
