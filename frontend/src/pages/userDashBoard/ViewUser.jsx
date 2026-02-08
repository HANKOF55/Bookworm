import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewUser = ({ user }) => {
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [avatar, setAvatar] = useState(user.avatar);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-6">
            {/* Card */}
            <div className="w-full max-w-md md:max-w-xl bg-white rounded-xl shadow-sm p-5">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-black"
                    >
                        ←
                    </button>
                    <h2 className="text-lg font-semibold">User Profile</h2>
                </div>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={
                            avatar?.trim()
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
                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Role */}
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

                    {/* Created At (readonly) */}
                    <div>
                        <label className="text-sm text-gray-600">Created At</label>
                        <input
                            value={new Date(user.createdAt).toLocaleString()}
                            disabled
                            className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500"
                        />
                    </div>

                    {/* Updated At (readonly) */}
                    <div>
                        <label className="text-sm text-gray-600">Updated At</label>
                        <input
                            value={new Date(user.updatedAt).toLocaleString()}
                            disabled
                            className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-500"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUser;
