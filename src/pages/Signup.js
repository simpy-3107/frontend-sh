import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function Signup() 
{
  const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(name, email, password)
      axios.post("https://backend1-r5ut.onrender.com/user/signup",{
        name,
        email,
        password
      }).then((res)=>{
       const  data = res.data
       localStorage.setItem('token', data.token);
       navigate("/");
     

      }).catch((err)=>{
        console.log(err)
      })
      }
    
    

  return (
    <main className="min-h-screen bg-zinc-800 flex justify-center items-center">
    <div className="bg-purple-500 p-8 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
  
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
  
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Sign Up
          </button>
        </div>
      </form>
  
      {/* New Button for Login */}
      <div className="mt-4 text-center">
        <p className="text-white text-sm">
          Already have an account? 
          <button 
            onClick={() => navigate('/login')}  // Use navigate or window.location
            className="text-indigo-600 font-semibold hover:underline focus:outline-none"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  </main>
  
    
  )
}

export default Signup
