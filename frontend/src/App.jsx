import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "./store/features/authSlice";
import Layout from "./Layout/Layout";
import { Home, ShopPage, About, Contact, ShoppingCart } from "./pages/exports.pages";
import Profile from "./pages/userDashBoard/Profile";
import Books from "./pages/userDashBoard/Books";
import CreateBook from "./pages/userDashBoard/CreateBook";
import DashboardOutlet from "./pages/userDashBoard/DashBoardLayout";
import EditPage from "./pages/userDashBoard/EditPage";
import Users from "./pages/userDashBoard/Users";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import api from "./api/axios";

function App() {
  const dispatch = useDispatch();

  // Rehydrate Redux auth from localStorage so isLoggedIn survives refresh / re-mount
  useEffect(() => {
    const rehydrateAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        dispatch(logout());
        return;
      }

      try {
        const res = await api.get("/user/me");

        dispatch(
          loginSuccess({
            user: res.data.data,
          })
        );
      } catch (err) {
        localStorage.removeItem("accessToken");
        dispatch(logout());
      }
    };

    rehydrateAuth();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route index path="/home" element={<Home />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="userDashBoard" element={<DashboardOutlet />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editProfile" element={<EditPage />} />
          <Route path="books" element={<Books />} />
          <Route path="addBook" element={<CreateBook />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="shoppingCart" element={<ShoppingCart />} />
      </Route>
    </Routes>
  )
}

export default App
