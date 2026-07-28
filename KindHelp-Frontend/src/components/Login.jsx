
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import loadingAnimation from "./loading.json"; // 👈 Replace with your downloaded Lottie JSON
import {server_url} from '../config/url'

const Login = () => {
  const [formData, setFormData] = useState({ uid: "", pwd: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.uid || !formData.pwd) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const resp = await axios.post(server_url + "/user/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (resp.data.status) {

        localStorage.setItem("token", resp.data.token);
        
        setTimeout(() => {
          resp.data.obj.usertype === "donor"
            ? navigate("/ddash")
            : navigate("/ndash");
        }, 800); // ⏳ Delay added so the loader becomes visible
      } else {
        alert(resp.data.msg);
        setLoading(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("⚠️ Server error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex items-center justify-center px-5 py-10 mt-6">
      <div className="max-w-5xl w-full transform scale-[0.97] grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden relative">
        {/* Left Illustration */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 flex items-center justify-center"
        >
          <img
            src="/undraw_vibe-coding_mjme.png"
            alt="Login illustration"
            className="w-[80%] max-w-xs"
          />
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-12 relative"
        >
          {/* Form-only Overlay Loader */}
          {loading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg">
              <div className="w-24 h-24">
                <Lottie animationData={loadingAnimation} loop autoplay />
              </div>
              <p className="mt-3 text-[#5B3FFF] font-semibold text-sm">
                Logging in...
              </p>
            </div>
          )}

          <h2 className="text-3xl font-bold text-[#5B3FFF] mb-6 text-center md:text-left">
            Welcome Back
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                name="uid"
                type="email"
                value={formData.uid}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3FFF]"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <div className="relative">
                <input
                  name="pwd"
                  type={showPassword ? "text" : "password"}
                  value={formData.pwd}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full mt-1 px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B3FFF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#5B3FFF]"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-[#5B3FFF] hover:bg-[#472aff] text-white font-semibold rounded-lg transition-all"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#5B3FFF] hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
