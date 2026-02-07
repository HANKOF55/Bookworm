import SideBar from "./SideBar";
import DashboardOutlet from "./DahboardOutlet";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DashBoardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [navItems, setNavItems] = useState([]);
  const [error, setError] = useState(null);

  // Menu items
  const userSettings = [
    { name: "Profile", path: "/userDashBoard/profile" },
    { name: "Edit Profile", path: "/userDashBoard/editProfile" },
  ];

  const adminSettings = [
    { name: "Profile", path: "/userDashBoard/profile" },
    { name: "Books", path: "/userDashBoard/books" },
    { name: "Add Book", path: "/userDashBoard/addBook" },
    { name: "Users", path: "/userDashBoard/users" },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setUser(null);
        setError("No access token found.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);

      try {
        // Prefer /user/me to match App.jsx, fallback to /user/profile if needed
        const res = await api.get("/user/me").catch(
          async err => {
            if (err?.response?.status === 404) {
              return await api.get("/user/profile");
            }
            throw err;
          }
        );
        setUser(res.data?.data);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Failed to fetch user profile");
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!user) return setNavItems([]);
    if (user.role === "admin") setNavItems(adminSettings);
    else setNavItems(userSettings);
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/home", { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <section className="justify-center h-[90vh] container mx-auto">
        <div className="w-full flex flex-col py-10 xl:flex-row h-full justify-center">
          <div className="w-full xl:w-1/5 xl:h-full h-1/8 p-4">
            <SideBar menuItems={navItems} />
          </div>
          <div className="w-full xl:w-2/3 h-full p-4">
            {/* Render <Settings /> here; it includes its own <Outlet /> for nested settings routes */}
            <DashboardOutlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default DashBoardLayout;