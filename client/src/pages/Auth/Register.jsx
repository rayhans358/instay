import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../../services/api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    try {
      await registerUser({
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
      setRegisterSuccess(true);

    } catch (error) {
      alert("Registration failed. Please try again later");
    }
  }

  if (registerSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Create Account</h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-login">Sign Up</button>
          <div className="text-center py-2 text-gray-700 flex justify-center gap-2.5">
            Already have an account?
            <Link
              className="text-black hover:text-[#F5385D] hover:font-bold hover:underline"
              to={'/login'}
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;