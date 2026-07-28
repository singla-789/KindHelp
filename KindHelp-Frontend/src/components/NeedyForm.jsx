



// Updated NeedyForm.jsx UI
import React, { useState } from "react";
import axios from "axios";
import {server_url} from '../config/url'
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const NeedyForm = () => {
  const [formData, setFormData] = useState({
    emailid: "",
    contact: "",
    name: "",
    dob: "",
    gender: "",
    address: "",
    frontadharurl: "",
    backadharurl: "",
  });

  const [email, setEmailid] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmailid(decoded.uid || "");
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [backDisabled, setBackDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFetch = async () => {
    if (!email) return alert("Email ID is required");
    try {
      const resp = await axios.post(server_url + "/needy/fetch", {
        emailid: email,
      });
      if (resp.data.status) setFormData(resp.data.data);
      else alert(resp.data.msg);
    } catch (err) {
      console.error(err);
      alert("Fetch failed");
    }
  };

  const handleFrontUpload = async (e) => {
    const file = e.target.files[0];
    setFrontPreview(URL.createObjectURL(file));

    const fd = new FormData();
    fd.append("frontadhar", file);

    try {
      const resp = await axios.post(server_url + "/needy/upload-front", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (resp.data.status) {
        const { extracted, imageUrl } = resp.data;
        setFormData((prev) => ({
          ...prev,
          frontadharurl: imageUrl,
          name: extracted.name || prev.name,
          dob: extracted.dob
            ? new Date(extracted.dob).toISOString().split("T")[0]
            : prev.dob,
          gender: extracted.gender || prev.gender,
          address: extracted.address || prev.address,
        }));
        if (extracted.address) setBackDisabled(true);
      } else alert("Aadhaar extraction failed");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleBackUpload = async (e) => {
    const file = e.target.files[0];
    setBackPreview(URL.createObjectURL(file));

    const fd = new FormData();
    fd.append("backadhar", file);

    try {
      const resp = await axios.post(server_url + "/needy/upload-back", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (resp.data.status) {
        const { extracted, imageUrl } = resp.data;
        setFormData((prev) => ({
          ...prev,
          backadharurl: imageUrl,
          address: extracted.address || prev.address,
        }));
      } else alert("Back upload failed");
    } catch (err) {
      console.error(err);
      alert("Back upload error");
    }
  };

  const handleSubmit = async () => {
    const resp = await axios.post(server_url + "/needy/save", formData);
    if (resp.data.status) alert("Saved successfully");
    else alert(resp.data.msg);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl border border-gray-200 rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center text-emerald-600 mb-10">
          Needy Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Email ID</label>
            <input 
              name="emailid"
              value={email}
              onChange={handleChange}
              disabled
              className="w-full mt-2 border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleFetch}
              className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-xl shadow hover:bg-emerald-700"
            >
              Fetch
            </button>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Contact Number</label>
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              maxLength={10}
              className="w-full mt-2 border border-gray-300 px-4 py-3 rounded-xl shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <label className="text-emerald-600 font-medium block">
              Front Aadhaar Upload
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFrontUpload}
              className="text-sm"
            />
            {frontPreview && <img src={frontPreview} alt="Front Aadhaar" className="w-full rounded-lg border" />}
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Name"
              className="w-full border px-4 py-3 rounded-lg" />
            <input name="dob" value={formData.dob} onChange={handleChange} placeholder="DOB"
              className="w-full border px-4 py-3 rounded-lg" />
            <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender"
              className="w-full border px-4 py-3 rounded-lg" />
          </div>

          <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <label className="text-emerald-600 font-medium block">
              Back Aadhaar Upload
            </label>
            <input
              type="file"
              accept="image/*"
              disabled={backDisabled}
              onChange={handleBackUpload}
              className="text-sm"
            />
            {backPreview && <img src={backPreview} alt="Back Aadhaar" className="w-full rounded-lg border" />}
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border px-4 py-3 rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-center gap-6 pt-10">
          <button
            onClick={handleSubmit}
            className="bg-emerald-600 text-white text-lg px-8 py-3 rounded-xl shadow hover:bg-emerald-700"
          >
            Send to server
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeedyForm;


