import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useState, useEffect, useCallback } from "react";
import { Alert } from "@heroui/alert";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(null);
  const [successMessage, setSuccessMessage] = useState();

  
  const fetchUsers = useCallback(async () => {
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
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUserById = async (userId) => {
    try {
      setIsDeleteLoading(true);
      setErrorDeleting(null);
      setIsDeleted(false);
      setSuccessMessage("");

      const res = await api.delete(`/user/${userId}`);

      if (res.data?.success) {
        setSuccessMessage(res.data?.message || "User deleted successfully.");
        setIsDeleted(true);
        // Refetch all users after successful deletion
        await fetchUsers();
      }
    } catch (err) {
      setErrorDeleting(
        err.response?.data?.error?.message ||
        "Error deleting user. Please try again."
      );
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <>
      {success && (
        <section className="mx-auto p-2 z-0">
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
                <TableRow
                  className="border-1 border-gray-400 rounded-xl"
                  key={user._id}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Link
                      to={`/userDashBoard/users/${user._id}`}
                      className="mr-2 px-3 py-[0.3rem] bg-blue-500 text-white border-none rounded-[0.4rem] cursor-pointer hover:bg-blue-600 inline-block"
                      style={{ textDecoration: 'none' }}
                    >
                      View
                    </Link>
                    <button
                      className="px-3 py-[0.3rem] bg-red-500 text-white border-none rounded-[0.4rem] cursor-pointer hover:bg-red-600"
                      onClick={() => handleDeleteUserById(user._id)}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {error && (
        <section className="w-full h-full flex justify-center items-center">
          <Alert color="danger" title={error} />
        </section>
      )}

      {isDeleted && <Alert color="success" title={successMessage} />}

      {errorDeleting && <Alert color="danger" title={errorDeleting} />}
    </>
  );
};

export default Users;