
import React from 'react'

const Users = () => {
  
    return (
    <>
        <section>
        <div className="overflow-x-auto w-full">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-orange-200 text-gray-700">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-left">Updated At</th>
                <th className="py-3 px-4 text-left">Refresh Token</th>
              </tr>
            </thead>
            <tbody>
              {/* Example static users: In real app map over users array */}
              {[
                {
                  name: "John Doe",
                  email: "john@example.com",
                  role: "admin",
                  createdAt: "2023-12-01T18:23:44.222Z",
                  updatedAt: "2024-05-10T12:34:56.666Z",
                  refreshToken: "12345abcdef",
                },
                {
                  name: "Jane Smith",
                  email: "jane@example.com",
                  role: "user",
                  createdAt: "2024-01-15T09:12:01.488Z",
                  updatedAt: "2024-05-07T15:28:44.123Z",
                  refreshToken: null,
                },
              ].map((user, idx) => (
                <tr
                  key={idx}
                  className="text-gray-900 even:bg-orange-50 hover:bg-orange-100 transition"
                >
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">{user.role}</td>
                  <td className="py-2 px-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="py-2 px-4">
                    {user.refreshToken ? (
                      <span className="break-all text-xs">{user.refreshToken}</span>
                    ) : (
                      <span className="text-gray-400 italic">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        </section>
    </>
  )
}

export default Users