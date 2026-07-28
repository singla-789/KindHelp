

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "./loading.json"; // 👈 Your Lottie file
import {server_url} from '../config/url'

const Signup = () => {
  const [formData, setFormData] = useState({
    uid: "",
    pwd: "",
    usertype: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    if (name === "uid") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
    }
    if (name === "pwd") {
      if (!value) error = "Password is required";
      else if (value.length < 6) error = "Minimum 6 characters required";
    }
    if (name === "usertype") {
      if (!value) error = "Please select a user type";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleUsertypeClick = (type) => {
    setFormData((prev) => ({ ...prev, usertype: type }));
    validateField("usertype", type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      validateField(key, val);
      if (
        !val ||
        (key === "uid" && !/\S+@\S+\.\S+/.test(val)) ||
        (key === "pwd" && val.length < 6)
      ) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const url = server_url + "/user/signup";
      const resp = await axios.post(url, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      alert(resp.data.msg);
      setLoading(true); // Show loader
      setTimeout(() => {
        navigate("/login");
      }, 1000); // Delay redirect for 1s
    } catch (error) {
      console.error("Signup failed:", error.message);
      alert("⚠️ Server error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex items-center justify-center px-4 py-10 relative mt-7">
      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-24 h-24">
            <Lottie animationData={loadingAnimation} loop autoplay />
          </div>
          <p className="mt-3 text-[#5B3FFF] font-semibold text-sm">
            Redirecting to login...
          </p>
        </div>
      )}

      <div className="w-full max-w-5xl transform scale-[0.97] grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Illustration */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 flex items-center justify-center scale-[0.85]"
        >
          <img src="/undraw_publish-post_7g2z.png" alt="Post" className="w-[80%] max-w-xs" />
          <img src="/undraw_accept-task_vzpn.png" alt="Accept" className="w-[80%] max-w-xs" />
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-7 relative"
        >
          <h2 className="text-2xl font-bold text-[#5B3FFF] mb-4">Create Account</h2>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <motion.div animate={errors.uid ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}>
              <label className="text-gray-700 font-medium text-sm">Email</label>
              <input
                name="uid"
                type="text"
                value={formData.uid}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.uid ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#5B3FFF]"
                }`}
              />
              {errors.uid && <p className="text-red-500 text-xs mt-1">{errors.uid}</p>}
            </motion.div>

            {/* Password */}
            <motion.div animate={errors.pwd ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}>
              <label className="text-gray-700 font-medium text-sm">Password</label>
              <div className="relative">
                <input
                  name="pwd"
                  type={showPassword ? "text" : "password"}
                  value={formData.pwd}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={`w-full mt-1 px-3 py-2 text-sm pr-10 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.pwd ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#5B3FFF]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#5B3FFF]"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.pwd && <p className="text-red-500 text-xs mt-1">{errors.pwd}</p>}
            </motion.div>

            {/* User Type */}
            <div>
              <label className="text-gray-700 font-medium text-sm block mb-2">Choose Account Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: "donor", icon: "👤", title: "Donor", desc: "Donate unused items." },
                  { value: "recipient", icon: "🎁", title: "Recipient", desc: "Receive essential items." },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleUsertypeClick(option.value)}
                    className={`flex flex-col items-start gap-1 px-4 py-3 border rounded-lg transition-all text-left shadow-sm hover:shadow-md ${
                      formData.usertype === option.value
                        ? "border-[#5B3FFF] bg-[#f3f0ff]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{option.title}</p>
                      <p className="text-xs text-gray-500">{option.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              {errors.usertype && <p className="text-red-500 text-xs mt-2">{errors.usertype}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 text-sm bg-[#5B3FFF] hover:bg-[#472aff] text-white font-semibold rounded-lg transition-all"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#5B3FFF] hover:underline font-medium">Login</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
