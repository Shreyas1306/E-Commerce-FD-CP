import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const redirectTo = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await loginUser(form);
      login(res.token, res.user);
      setMessage("Login successful.");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <main className="auth-wrap">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="amazon-btn" type="submit">
          Sign In
        </button>
        {message && <p className="status">{message}</p>}
        {error && <p className="status error">{error}</p>}
        <p className="auth-switch-text">
          New to this site? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
