import { spawn } from "node:child_process"
import { config } from "dotenv"

const parsed = config({ path: ".env.test" }).parsed ?? {}

const env = {
  ...process.env,
  ...parsed,
  AUTH_SECRET: parsed.AUTH_SECRET || parsed.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  AUTH_URL: parsed.AUTH_URL || parsed.NEXTAUTH_URL || process.env.AUTH_URL,
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm"

const child = spawn(npm, ["run", "dev"], {
  env,
  stdio: "inherit",
})

child.on("exit", (code) => {
  process.exit(code ?? 0)
})
