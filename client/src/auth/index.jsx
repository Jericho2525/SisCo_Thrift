import { useState } from "react";
import useCookies from "useCookies"
import useNavigate from "useNavigate"
import axios from "axios"
function index() {
  return (
    <div>
      <Login/>
      <Signup/>
    </div>
  )
}



const Login = () => {
    const[email , setEmail]= useState("");
    const [password , setPassword] = useState("")
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const result = await axios.post("http://localhost:5000/user/login", {
              email,
              password
          });
  
          console.log("Login response:", result.data);
          setCookies("access_token", result.data.token);
          window.localStorage.setItem("userID", result.data.userID);
          navigate("/")
      } catch (err) {
          console.log(err.response.data);
      }
  };
  console.log(handleSubmit)
  
  

  return (
    <div className="flex justify-center items-center h-screen bg-orange-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-orange-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export { LoginForm, SignupForm };



export default index
