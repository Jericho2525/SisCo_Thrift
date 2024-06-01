import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/user/signup", {
        username,
        password,
        email,
      });
      alert("Registration Completed! Now Take a Login!");
      navigate("/login");
      console.log("Signup Success!", result);
    } catch (err) {
      if (err.response.data.type === "username already exist") {
        alert("Username already in use!");
      } else {
        alert("ERROR:Something went wrong!");
      }
      console.log(err);
      console.log(err.response)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-orange-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="username" className="block font-semibold mb-1">
              Username
            </label>
            <input
              type="email"
              id="username"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/login" className="text-orange-500">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
