import React from "react";
import { useNavigate } from "react-router-dom";
import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import applepay from "../../assets/images/apple.png";
import googlepay from "../../assets/images/gpay.png";
import mobile from "../../assets/images/mobile.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary landing text-white flex flex-col  items-center  h-screen">
      {/* Navbar */}
      <nav className="w-100 bg-secondary flex justify-between px-15 p-2 absolute top-0">
        <h1 className="text-2xl font-bold">quickpay</h1>
        <div className=" flex gap-2">
          <button
            className="primary-outlined-btn br-8 mr-2"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button
            className="primary-contained-btn br-8 mr-2"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </div>
      </nav>
      <div className="flex items-center justify-center w-100 h-screen">
        {/* Hero Section */}
        <div className="text-center z-1 mt-2 p-2">
          <h2 className="text-3xl text-bold mb-2">
            Online Payments - Made Easy.
          </h2>
          <p className="text-xl">
            Fast, Secure, and Convenient payment solutions for you.
          </p>

          {/* Payment Icons */}
          <div className="flex justify-center mt-2 gap-2">
            <img src={visa} alt="Visa" className="h-12 br-50" />
            <img src={mastercard} alt="Mastercard" className="h-12 br-50" />
            <img src={applepay} alt="Apple Pay" className="h-12 br-50" />
            <img src={googlepay} alt="Google Pay" className="h-12 br-50" />
          </div>

          {/* CTA Button */}
          <button
            className="primary-outlined-btn br-8 mt-2"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>

        {/* Mockup Image */}
        <div className="flex justify-center w-550 h-80">
          <img src={mobile} alt="Mobile App Mockup" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
