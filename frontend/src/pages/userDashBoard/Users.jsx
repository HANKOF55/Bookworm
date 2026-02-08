import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";


const Users = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchUsers = async () => {
      try {

        setSuccess(false);
        setError(null);
        setIsLoading(true);

        const res = await api.get("/user");

        if (res.data?.success) {
          setSuccess(res.data?.success);
          setUsers(res.data?.data);
        }

      } catch (err) {

        if (err.response?.status === 404) {
          setError(err.response.data?.error?.message);
        } else if (err.response?.status === 403) {
          setError(err.response.data?.error?.message);
        }
        else if (err.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers();

  }, [  ])



  return (
    <>
      {success &&
        <section className="mx-auto p-2">


          <Table className="shadow-md" removeWrapper aria-label="User list table">
            <TableHeader className="overflow-hidden rounded-xl border border-gray-500">
              <TableColumn className="font-semibold border border-gray-500">
                NAME
              </TableColumn>
              <TableColumn className="font-semibold border border-gray-500">
                EMAIL
              </TableColumn>
              <TableColumn className="font-semibold border border-gray-500">
                ROLE
              </TableColumn>
              <TableColumn className="font-semibold border border-gray-500">
                ACTION
              </TableColumn>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow className="border-1 border-gray-400 rounded-xl" key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <button
                      className="mr-2 px-3 py-[0.3rem] bg-blue-500 text-white border-none rounded-[0.4rem] cursor-pointer hover:bg-blue-600"

                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-[0.3rem] bg-red-500 text-white border-none rounded-[0.4rem] cursor-pointer hover:bg-red-600"

                      onClick={() => alert(`Delete user: ${user.name}`)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      }

      {error &&
        <section className="w-full h-full flex justify-center items-center">
          <Alert color="danger" title={error} />
        </section>
      }
    </>
  )
}

export default Users