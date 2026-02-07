import { useState, useEffect } from "react";
import api from "../../api/axios";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchUserProfile = async () => {

      try {

        const res = await api.get("/user/me");

        setUser(res.data.data);

      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          setUser(null)
        }

        setError(err.response?.data?.error?.message || "Something went wrong.");

      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);


  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  if (!user) return null;

  return (
    <>
      <section className="w-full h-full flex flex-col">
        <div className="flex flex-col sm:flex-row flex-1 w-full h-full bg-white rounded-xl shadow-lg p-10 gap-12 items-stretch">
          {/* Left: Avatar and Heading */}
          <div className="flex flex-col justify-center items-center sm:w-2/5 w-full gap-6">
            <div className="w-40 h-40 rounded-full bg-orange-200 flex items-center justify-center text-6xl font-bold text-orange-700 shadow mb-6">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>USER</span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-center w-full">My Profile</h2>
          </div>

          {/* Right: User Details */}
          <div className="flex-1 flex flex-col justify-center w-full">
            <div className="w-full h-full flex flex-col justify-evenly gap-8 text-lg">
              <div className="flex gap-8 justify-between items-center border-b pb-4">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-gray-900">{user.name}</span>
              </div>
              <div className="flex gap-8 justify-between items-center border-b pb-4">
                <span className="font-semibold text-gray-700">Role:</span>
                <span className="capitalize text-gray-900">{user.role}</span>
              </div>
              <div className="flex gap-8 justify-between items-center border-b pb-4">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex gap-8 justify-between items-center border-b pb-4">
                <span className="font-semibold text-gray-700">Account Created:</span>
                <span className="text-gray-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</span>
              </div>
              <div className="flex gap-8 justify-between items-center">
                <span className="font-semibold text-gray-700">Last Updated:</span>
                <span className="text-gray-900">{user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "—"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
