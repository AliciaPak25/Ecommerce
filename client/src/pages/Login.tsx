import { useState, SyntheticEvent, useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserErrors } from "../models/errors";
import { IShopContext, ShopContext } from "../context/shop-context";
import logo from "../assets/logo/hanger.png";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/user/login", {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      let errorMessage: string = "";
      switch (error?.response?.data?.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User doesn't exist";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username/password combination";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      alert("ERROR: " + errorMessage);
    }
  };

  return (
    <section className="bg-black w-full h-screen py-36 flex items-center">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-[400px] m-auto p-6 bg-black shadow-md shadow-gray-800 rounded-md">
          <div className="flex mb-4 items-center">
            <img
              src={logo}
              alt="logo-image"
              className="h-7 w-7 bg-white rounded-full"
            />
            <h2 className="text-white text-lg ml-2">Stellar Style</h2>
          </div>
          <h2 className="my-2 text-xl font-semibold text-white">Login</h2>
          <p className="small-medium md:base-regular text-[#8580aa]">
            To shop in Stellar Style, please login.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <div className="flex flex-col mt-2">
              <label
                htmlFor="username"
                className="text-white text-base font-semibold"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full mt-3 py-2 px-3 h-10 bg-[#201f23] text-slate-200 rounded outline-none border border-[#201f23] focus:border-emerald-500 focus:ring-0"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="password"
                className="text-white text-base font-semibold"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full mt-3 py-2 px-3 h-10 bg-[#201f23] text-slate-200 rounded outline-none border border-[#201f23] focus:border-emerald-500 focus:ring-0"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-[#7f8c7b] hover:bg-[#576361] border-[#7f8c7b] hover:border-emerald-500 text-white rounded-md w-full"
            >
              Login
            </button>
            <div className="text-center">
              <span className="text-slate-400 me-2">
                Don't have an account?
              </span>
              <Link
                to="/register"
                className="text-white font-bold inline-block"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
