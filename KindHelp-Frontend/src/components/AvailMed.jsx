
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Package, Building2, Calendar, Hash, Info, PackagePlus, Edit3 } from "lucide-react";
import {server_url} from '../config/url'

const AvailMed = () => {
  const [formData, setFormData] = useState({
    emailid: "",
    medicine: "",
    company: "",
    expdate: "",
    packing: "",
    qty: "",
    info: "",
  });
  
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormData((prev) => ({
          ...prev,
          emailid: decoded.uid || "",
        }));
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // TODO: Connect to API

    try {
      const url = server_url + "/donor/saveMed";
      const resp = await axios.post(url, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      alert(resp.data.msg);
    } catch (error) {
      console.error("Save failed:", error.message);
      alert("⚠️ Server error occurred.");
    }
  };

  const handleUpdate = async () => {
    try {
      const url = server_url + "/donor/updateMed";
      const resp = await axios.post(url, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      alert(resp.data.msg);
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("⚠️ Server error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Medicine Availability Form
          </h1>
          <p className="text-gray-600 text-lg">Share your available medicines with those in need</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Email ID
              </label>
              <input 
                type="email"
                name="emailid"
                value={formData.emailid}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 text-sm border-0 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 shadow-sm"
                disabled
              />
            </div>

            {/* Medicine Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medicine Name */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Package className="w-4 h-4 text-indigo-500" />
                  Medicine Name
                </label>
                <input
                  type="text"
                  name="medicine"
                  value={formData.medicine}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>

              {/* Company */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Building2 className="w-4 h-4 text-indigo-500" />
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>

              {/* Expiry Date */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expdate"
                  value={formData.expdate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Hash className="w-4 h-4 text-indigo-500" />
                  Quantity
                </label>
                <input
                  type="number"
                  name="qty"
                  value={formData.qty}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* Packing Type */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Package className="w-4 h-4 text-indigo-500" />
                Packing Type
              </label>
              <select
                name="packing"
                value={formData.packing}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md bg-white"
              >
                <option value="">Select packing type</option>
                <option value="Blister Pack">💊 Blister Pack</option>
                <option value="Bottle">🍼 Bottle</option>
                <option value="Sachet">📦 Sachet</option>
                <option value="Strip">📋 Strip</option>
                <option value="Vial">🧪 Vial</option>
                <option value="Tube">🧴 Tube</option>
                <option value="Other">📦 Other</option>
              </select>
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Info className="w-4 h-4 text-indigo-500" />
                Additional Information
              </label>
              <textarea
                name="info"
                value={formData.info}
                onChange={handleChange}
                rows="4"
                placeholder="Any additional details about the medicine, storage conditions, or special instructions..."
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <PackagePlus className="w-5 h-5" />
                Avail To Public
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Edit3 className="w-5 h-5" />
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AvailMed;