

import React, { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Calendar, Users, Upload, Save, RefreshCw, Search } from "lucide-react";
import {server_url} from '../config/url'

const DonorForm = () => {




  const [formData, setFormData] = useState({
    emailid: "",
    name: "",
    age: "",
    gender: "",
    curaddress: "",
    curcity: "",
    contact: "",
    qualification: "",
    occupation: "",
    adharpic: null,
    profilepic: null,
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

  const [imagePreview, setImagePreview] = useState({
    adharpic: null,
    profilepic: null,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;

    switch (name) {
      case "emailid":
        if (!value) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Invalid email";
        break;
      case "name":
        if (!value) error = "Name is required";
        break;
      case "age":
        if (!value) error = "Age is required";
        else if (parseInt(value) < 18) error = "Must be at least 18";
        break;
      case "gender":
        if (!value) error = "Gender is required";
        break;
      case "contact":
        if (!value) error = "Contact number is required";
        else if (!contactRegex.test(value)) error = "Must be 10 digits";
        break;
      case "curaddress":
        if (!value) error = "Address is required";
        break;
      case "curcity":
        if (!value) error = "City is required";
        break;
      case "qualification":
        if (!value) error = "Qualification is required";
        break;
      case "occupation":
        if (!value) error = "Occupation is required";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview((prev) => ({
          ...prev,
          [name]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "emailid",
      "name",
      "age",
      "gender",
      "contact",
      "curaddress",
      "curcity",
      "qualification",
      "occupation",
    ];

    let valid = true;
    requiredFields.forEach((field) => {
      validateField(field, formData[field]);
      if (!formData[field] || errors[field]) valid = false;
    });
    return valid;
  };

  const handleFetch = async () => {
    const { emailid } = formData;
    if (!emailid) {
      alert("Please enter Email ID to fetch data.");
      return;
    }

    try {
      const resp = await fetch(server_url + "/donor/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailid }),
      });

      const data = await resp.json();

      if (data.status) {
        const fetched = data.data;
        
        setFormData((prev) => ({
          ...prev,
          name: fetched.name || "",
          age: fetched.age || "",
          gender: fetched.gender || "",
          contact: fetched.contact || "",
          curaddress: fetched.curaddress || "",
          curcity: fetched.curcity || "",
          qualification: fetched.qualification || "",
          occupation: fetched.occupation || "",
          adharpic: null,
          profilepic: null,
        }));

        setImagePreview({
          adharpic: fetched.adharpic || null,
          profilepic: fetched.profilepic || null,
        });

        alert("Donor data fetched successfully!");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Something went wrong during fetch.");
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert("Please fix errors before saving.");
      return;
    }
    formData.curaddress = formData.curaddress.trim();
    formData.curcity = formData.curcity.trim().toLowerCase();
    let url =  server_url + "/donor/save";
        
    let fd = new FormData();
    for(let prop in formData){
      fd.append(prop, formData[prop]);
    }
    
    try {
      const resp = await fetch(url, {
        method: "POST",
        body: fd,
      });

      const data = await resp.json();

      if(data.status == true)
        alert(data.msg);
      else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("⚠️ Server error occurred.");
    }
  };

  const handleUpdate = async () => {
    if (!isFormValid()) {
      alert("Please fix errors before updating.");
      return;
    }

    let url = server_url + "/donor/update";
    let fd1 = new FormData();
    for (let prop in formData) {
      fd1.append(prop, formData[prop]);
    }

    try {
      const resp = await fetch(url, {
        method: "POST",
        body: fd1,
      });

      const data = await resp.json();

      if(data.status == true)
        alert(data.msg);
      else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("⚠️ Server error occurred.");
    }
  };

  const removeImage = (imageType) => {
    setFormData((prev) => ({ ...prev, [imageType]: null }));
    setImagePreview((prev) => ({ ...prev, [imageType]: null }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Donor Registration Form
          </h1>
          <p className="text-gray-600 text-lg">Join our community of medicine donors and help save lives</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Form Fields Section */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Email Section with Fetch */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Email ID
                </label>
                <div className="flex gap-3">
                  <input 
                    type="email"
                    name="emailid"
                    value={formData.emailid}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    disabled
                    className="flex-1 px-4 py-3 text-sm border-0 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 shadow-sm"
                  />
                  <button
                    onClick={handleFetch}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Fetch
                  </button>
                </div>
                {errors.emailid && <p className="text-red-500 text-sm mt-2 ml-2">{errors.emailid}</p>}
              </div>

              {/* Personal Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User className="w-4 h-4 text-indigo-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Age */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                </div>

                {/* Gender */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Users className="w-4 h-4 text-indigo-500" />
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">👨 Male</option>
                    <option value="Female">👩 Female</option>
                    <option value="Other">🏳️‍⚧️ Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Phone className="w-4 h-4 text-indigo-500" />
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                </div>

                {/* Address */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    Current Address
                  </label>
                  <input
                    type="text"
                    name="curaddress"
                    value={formData.curaddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  {errors.curaddress && <p className="text-red-500 text-sm">{errors.curaddress}</p>}
                </div>

                {/* City */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    Current City
                  </label>
                  <input
                    type="text"
                    name="curcity"
                    value={formData.curcity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  {errors.curcity && <p className="text-red-500 text-sm">{errors.curcity}</p>}
                </div>

                {/* Qualification */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <GraduationCap className="w-4 h-4 text-indigo-500" />
                    Qualification
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                  >
                    <option value="">Select Qualification</option>
                    <option value="None">📚 None</option>
                    <option value="High School">🎓 High School</option>
                    <option value="Diploma">📜 Diploma</option>
                    <option value="Undergraduate">🎓 Undergraduate</option>
                    <option value="Postgraduate">👨‍🎓 Postgraduate</option>
                    <option value="Other">🔍 Other</option>
                  </select>
                  {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
                </div>

                {/* Occupation */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Briefcase className="w-4 h-4 text-indigo-500" />
                    Occupation
                  </label>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                  >
                    <option value="">Select Occupation</option>
                    <option value="None">❌ None</option>
                    <option value="Student">🎓 Student</option>
                    <option value="Engineer">⚙️ Engineer</option>
                    <option value="Doctor">👨‍⚕️ Doctor</option>
                    <option value="Teacher">👨‍🏫 Teacher</option>
                    <option value="Other">💼 Other</option>
                  </select>
                  {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
                </div>
              </div>

              {/* File Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["profilepic", "adharpic"].map((field) => (
                  <div key={field} className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Upload className="w-4 h-4 text-indigo-500" />
                      {field === "adharpic" ? "Aadhaar Card" : "Profile Picture"}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        id={field}
                        name={field}
                        onChange={handleChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <label
                        htmlFor={field}
                        className="cursor-pointer bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-2 border-dashed border-indigo-300 text-indigo-600 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-md flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Choose Image
                      </label>
                      {formData[field] && (
                        <span className="text-sm text-gray-600 truncate max-w-32">
                          {formData[field]?.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Registration
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Update
                </button>
              </div>
            </div>

            {/* Image Preview Section */}
            <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 rounded-2xl shadow-inner space-y-8">
              <h3 className="text-xl font-semibold text-gray-700 border-b border-indigo-200 pb-3 flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-500" />
                Image Previews
              </h3>
              
              {["profilepic", "adharpic"].map((imgKey) => (
                <div key={imgKey} className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-600 capitalize flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    {imgKey === "profilepic" ? "Profile Picture" : "Aadhaar Card"}
                  </h4>
                  {imagePreview[imgKey] ? (
                    <div className="relative group">
                      <img
                        src={imagePreview[imgKey]}
                        alt={imgKey}
                        className="w-full h-48 object-cover rounded-xl border-2 border-white shadow-lg transition-transform duration-200 group-hover:scale-105"
                      />
                      <button
                        onClick={() => removeImage(imgKey)}
                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-lg transition-all duration-200 hover:scale-110"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center space-y-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-gray-500 text-sm">No image selected</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorForm;