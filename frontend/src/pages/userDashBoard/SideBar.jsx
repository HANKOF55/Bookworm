import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import api from "../../api/axios"; // <-- Make sure api is imported!

const SideBar = ({ menuItems }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      
      try {
        await api.post("/user/logout", {}); 
      } catch (err) {
      }

      // Remove token and Redux state
      localStorage.removeItem("accessToken");
      dispatch(logout());
      navigate("/home");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="w-full h-full flex xl:flex-col items-center justify-start xl:items-start px-4 xl:p-6 rounded-xl gap-4 xl:gap-6 shadow-2xl">

        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `block w-full text-md font-semibold p-2 py-1 rounded-md text-center hover:bg-gray-700 transition ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-gray-700 text-gray-200"
              }`
            }
            // style={{ textAlign: "center" }}
          >
            {item.name}
          </NavLink>
        ))}

        <button
          className="bg-red-500 px-4 w-full py-1 font-semibold text-white rounded-md hover:bg-red-600 active:bg-red-500 hover:cursor-pointer"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </section>
    </>
  );
};

export default SideBar;
