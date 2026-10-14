"use client"

import { useEffect, useRef } from "react"

import {
  useNotification,
} from "../components/NotificationContext"

export default function BlogCreatedNotification({
  created,
}: {
  created: boolean
}) {
  const { showNotification } =
    useNotification()

  const shown = useRef(false)

  useEffect(() => {
    if (created && !shown.current) {
      shown.current = true

      showNotification(
        "Blog created successfully!",
        "success"
      )

      window.history.replaceState(
        {},
        "",
        "/blogs"
      )
    }
  }, [created, showNotification])

  return null
}