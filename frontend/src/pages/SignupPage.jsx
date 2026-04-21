import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api";

function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await registerUser(form);
      setMessage("Signup successful. Please login.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <main className="auth-wrap">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create account</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="amazon-btn" type="submit">
          Register
        </button>
        {message && <p className="status">{message}</p>}
        {error && <p className="status error">{error}</p>}
        <p className="auth-switch-text">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </main>
  );
}

export default SignupPage;
