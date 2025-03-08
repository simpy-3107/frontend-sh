import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic
  setEmail(e.target.email.value);
  setPassword(e.target.password.value);
    console.log(email, password);
    axios.post("https://backend1-r5ut.onrender.com/user/login", {
        email,
        password
        
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        localStorage.setItem('token', data.token);
        navigate("/");
  }).catch((err)=>{
    console.log(err)
  })

  };

  return (
<div className="h-screen flex items-center justify-center bg-gray-900">
  <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96 transform transition-all hover:scale-105 hover:shadow-3xl">
    <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform transition-all hover:scale-105 hover:shadow-lg"
          placeholder="Enter your email"
        />
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transform transition-all hover:scale-105 hover:shadow-lg"
          placeholder="Enter your password"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 transform transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:scale-105 hover:shadow-xl"
      >
        Login
      </button>
    </form>

    {/* Additional Link */}
    <div className="mt-4 text-center">
      <a href="#" className="text-sm text-indigo-400 hover:text-indigo-600">Forgot Password?</a>
    </div>
  </div>
</div>
  )
};

export default LoginPage;
