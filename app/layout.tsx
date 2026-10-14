import "./globals.css"

import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import Notification from "./components/Notification"
import {
  NotificationProvider,
} from "./components/NotificationContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main>{children}</main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}