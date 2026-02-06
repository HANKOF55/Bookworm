import BookwormLogo from "../assets/images/BookwormLogo.png";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const Login = ({handleShowSignUp}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassWord] = useState(false);

    const handleShowPassword = (e) =>{
        e.preventDefault()
        setShowPassWord((prev) => !prev)
    }

  return (
    <>
      <div className="p-6">
        <div>
          <img className="h-[70px] mx-auto mt-5" src={BookwormLogo} alt="" />
          <header className="text-2xl font-semibold text-gray-700 text-center mt-4">
            Sign in to your account
          </header>
        </div>

        <form className="flex flex-col gap-4 w-full max-w-sm mt-4 mx-auto">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="w-full text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <div className="flex flex-col w-full">
              <button
                type="button"
                className="self-end mb-1 text-gray-700 focus:outline-none mt-3 absolute right-10"
                onMouseDown={handleShowPassword}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{ background: "none", border: "none", padding: 0 }}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-200 w-full"
                required
                minLength={8}
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 active:bg-orange-800 transition-colors"
          >
            Login
          </button>
          <button
            type="button"
            className="mt-2 text-orange-600 hover:underline text-sm font-semibold hover:cursor-pointer"
            onClick={handleShowSignUp}
          >
            Don't have an account?
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
