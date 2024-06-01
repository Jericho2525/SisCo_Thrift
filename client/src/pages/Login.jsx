import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

 



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrors("Please fill in all fields.");
      return;
    }
    try {
      const result = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      console.log("Login response:", result.data); 
      setCookies("access_token", result.data.token); 
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/home");
      
    } catch (err) {
      setErrors("Error: Something went wrong!");
      
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-orange-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
       
        <form className="space-y-4" onSubmit={handleSubmit}> 
               {errors && <p className="text-red-500">{errors}</p>}
          <div>
            <label htmlFor="username" className="block font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500">
            Sign up here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
