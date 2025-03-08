import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';  // Import the Signup component
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';

function App() {
  // Create the router with correct path and elements
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      </>
  )
}

export default App;

