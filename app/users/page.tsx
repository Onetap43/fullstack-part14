import Link from "next/link"

import { getUsers } from "../services/users"

export const instant = false

const Users = async () => {
  const users = await getUsers()

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users