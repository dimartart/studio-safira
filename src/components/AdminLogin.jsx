import React, { useState } from 'react'
import { supabase } from "../lib/supabaseClient";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError("Неверный логин или пароль");
      return;
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center mt-10 px-4 sm:px-6 lg:px-[10%] py-8 md:py-12 lg:py-[4rem]">
      <form onSubmit={handleSubmit} className="flex flex-col items-center text-white p-4 space-y-4 max-w-sm mx-auto">
        <h2 className="text-center uppercase text-[2rem] font-bold">Admin Panel Login</h2>
        {error && <p className="text-red-600">{error}</p>}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full text-white"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full text-white"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 uppercase">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;