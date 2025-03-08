import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [Products, setProducts] = useState([]);
  const navigate = useNavigate();
  function getproducts() {
    axios.get("https://backend1-r5ut.onrender.com/user/allproducts", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
       
      }
      
    })
      .then((res) => {
        const data = res.data
        console.log(data); 
        console.log(res.data.products);// Inspect the full response to check if "products" is available
        setProducts(res.data.products); // Ensure this is the correct structure
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
    
  }
  const logout = async () => {
    try {
      // Make the POST request to the backend to log out the user
      const response = await axios.post(
        "https://backend1-r5ut.onrender.com/user/logout", 
        {}, // Body content if needed
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      // Check for successful response
      if (response.status === 200) {
        // Successfully logged out
        console.log('Logout successful');
        
        // Remove token from localStorage
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const navigateToSignup = () => {
    navigate('/signup');
  };




  
  useEffect(() => {
    getproducts();
  }, []);
  return (
    <main className="min-h-screen p-6 md:p-1 flex justify-center items-center  bg-gray-800">
    {/* Logout Button Positioned at the Top, Only Show When User is Logged In */}
    {localStorage.getItem("token") && (
      <button
        onClick={logout}
        className="fixed top-6 right-6 py-2 px-6 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition duration-300 focus:outline-none"
      >
        Logout
      </button>
    )}
  
    {/* Main Content */}
    <div className="container mx-auto mt-10">
      {/* Title or Heading */}
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Products</h1>
  
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(Products) && Products.length > 0 ? (
          Products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product-details`, { state: { product } })}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer border-2 border-gray-200"
            >
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={product.image[0]}
                alt={product.name}
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{product.name}</h2>
                <p className="text-lg font-semibold text-indigo-600 mb-4">{product.price}</p>
                <p className="text-gray-600 text-base mb-6">{product.description}</p>
                <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
         
            <div className="text-center text-white">
              <p className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 shadow-xl">
                No products available. PLEASE SIGN UP TO SEE PRODUCTS
              </p>
              <button
                onClick={navigateToSignup}
                className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-xl transform hover:scale-105 hover:bg-blue-600 transition duration-300"
              >
                SIGN UP
              </button>
            </div>
          
        )}
      </div>
    </div>
  </main>
  )
};  

export default Home;
