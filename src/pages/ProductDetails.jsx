import React from 'react'
import { useLocation } from 'react-router-dom'
import { useRazorpay } from "react-razorpay";
import axios from "axios";


function ProductDetails() {
    const location = useLocation()
    const product = location.state.product
   const {Razorpay}= useRazorpay();

   
    
     
     
        const handlePayment = async () => {
          try {
            // Get the token from localStorage and log it to the console
            const token = localStorage.getItem("token");
            console.log("Token from localStorage:", token);  // Log the token
        
            // Check if token exists (if not, handle accordingly)
            if (!token) {
              console.error("Token is missing!");
              alert("Please log in first!");
              return;
            }
        
            // Fetch the order details from the backend using the token
            const response = await axios.get("https://backend1-r5ut.onrender.com/user/order/" + product._id, {
              headers: {
                "Authorization": `Bearer ${token}`,
              },
            });
        
            const order = response.data.order;
            console.log("Order response:", order); // Log the order details
        
            const options = {
              key: "rzp_test_CAa3gCF0eP8i4R", // Replace with your Razorpay key
              amount: order.amount, // Amount in paise
              currency: order.currency, // Correct currency value
              name: "Test Company",
              description: "Test Transaction",
              order_id: order.id, // Use the order_id received from the backend
              handler: async (paymentResponse) => {
                try {
                  // Payment verification request
                  const verifyResponse = await axios.post(
                    "https://backend1-r5ut.onrender.com/user/verifypayment/" + order.id,
                    {
                      paymentID: paymentResponse.razorpay_payment_id,
                      orderid: paymentResponse.razorpay_order_id,
                      signature: paymentResponse.razorpay_signature,
                    },
                    {
                      headers: {
                        "Authorization": `Bearer ${token}`,
                      },
                    }
                  );
                  console.log("Payment verification response:", verifyResponse.data);
                } catch (error) {
                  console.error("Error during payment verification:", error);
                }
              },
              prefill: {
                name: "John Doe",
                email: "john.doe@example.com",
                contact: "9999999999",
              },
              theme: {
                color: "#F37254",
              },
            };
        
            // Create a Razorpay instance and open the payment modal
            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();
          } catch (error) {
            console.error("Error during payment:", error);
            alert("There was an error with the payment process.");
          }
        };
        
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    <h1 className="text-3xl font-bold text-center mb-4">{product.name}</h1>
    <img src={product.image[0]} alt={product.name} className="w-64 h-64 object-cover mb-4" />
    <p className="text-xl font-semibold text-gray-800 mb-4">{product.price}</p>
    <p className="text-gray-600 text-center mb-6">{product.description}</p>
    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"onClick={handlePayment} >
        Buy Now
    </button>
</div>

  )
}

export default ProductDetails


