import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../services/api/auth";
import { UserContext } from "../../services/context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password, });
      setUser(response?.data);
      alert("Login successful");
      setLoginSuccess(true);

    } catch (error) {
      alert("Login failed");
      console.error("error login failed", error);
    }
  }

  if (loginSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Log In</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-login">Login</button>
          <div className="text-center py-2 text-gray-700 flex justify-center gap-2.5">
            Dont have an account?
            <Link
              className="text-black hover:text-[#F5385D] hover:font-bold hover:underline"
              to={'/register'}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;