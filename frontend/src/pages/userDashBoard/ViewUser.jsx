import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";


const ViewUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [avatar, setAvatar] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                setSuccess(false);
                setError(null);
                setIsLoading(true);

                const res = await api.get(`/user/${userId}`);

                if (res.data?.success) {
                    setSuccess(res.data?.success);
                    const user = res.data?.data;
                    setName(user.name || "");
                    setEmail(user.email || "");
                    setRole(user.role || "");
                    setAvatar(typeof user.avatar === "string" ? user.avatar : "");
                    setCreatedAt(user.createdAt ? new Date(user.createdAt).toLocaleString() : "");
                    setUpdatedAt(user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "");
                }
            } catch (err) {
                // CORS/network failure: err.response is undefined
                if (err.response?.status === 404) {
                    setError(err.response.data?.error?.message);
                } else if (err.response?.status === 403) {
                    setError(err.response.data?.error?.message);
                } else if (err.request) {
                    setError(
                        "Could not reach server. This is often caused by a CORS error (check backend CORS config for your frontend origin), or the server is offline."
                    );
                } else {
                    setError("Something went wrong. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUserById();
        }
    }, [userId]);

    const updateUserById = async (userId) => {
        setError(null);
        setSuccess(false);
        setIsLoading(true);

        try {
            const payload = {
                avatar: (typeof avatar === "string" ? avatar.trim() : ""),
                name: (typeof name === "string" ? name.trim() : ""),
                email: (typeof email === "string" ? email.trim() : ""),
                role: (typeof role === "string" ? role.trim() : ""),
            };

            const res = await api.patch(`/user/${userId}`, payload);

            if (res.data?.success) {
                setSuccess(true);
                const updatedUser = res.data?.data;
                setName(updatedUser.name || "");
                setEmail(updatedUser.email || "");
                setRole(updatedUser.role || "");
                setAvatar(typeof updatedUser.avatar === "string" ? updatedUser.avatar : "");
                setCreatedAt(updatedUser.createdAt ? new Date(updatedUser.createdAt).toLocaleString() : "");
                setUpdatedAt(updatedUser.updatedAt ? new Date(updatedUser.updatedAt).toLocaleString() : "");
            } else {
                setError(res.data?.error?.message || "Failed to update user.");
            }
        } catch (err) {
            // CORS/network failure: err.response is undefined
            if (err.response?.data?.error?.message) {
                setError(err.response.data.error.message);
            } else if (err.request) {
                setError(
                    "Could not reach server. This is often caused by a CORS error (check backend CORS config for your frontend origin), or the server is offline."
                );
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-6">
            <div className="w-full max-w-md md:max-w-xl bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-black"
                    >
                        ←
                    </button>
                    <h2 className="text-lg font-semibold">User Profile</h2>
                </div>

                {error && (
                    <div className="mb-4 text-red-600 bg-red-50 border border-red-300 px-4 py-2 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 text-green-700 bg-green-50 border border-green-300 px-4 py-2 rounded">
                        User updated successfully.
                    </div>
                )}

                {isLoading && (
                    <div className="mb-4 text-gray-500">Loading user...</div>
                )}

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={
                            typeof avatar === "string" && avatar.trim()
                                ? avatar
                                : "https://via.placeholder.com/100?text=Avatar"
                        }
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover border mb-3"
                    />
                    <input
                        type="text"
                        placeholder="Paste avatar image URL"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Created At</label>
                        <input
                            value={createdAt}
                            disabled
                            className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Updated At</label>
                        <input
                            value={updatedAt}
                            disabled
                            className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        onClick={() => { updateUserById(userId); }}
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUser;
