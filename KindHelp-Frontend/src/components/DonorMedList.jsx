
import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Search, Package, Calendar, Building2, Hash, Trash2, Edit3, Eye, AlertCircle, CheckCircle2 } from "lucide-react";
import {server_url} from '../config/url'

const DonorMedicineList = () => {
  const [emailid, setEmailid] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!emailid) return alert("Please enter an Email ID");
    
    setLoading(true);
    try {
      const resp = await axios.post(server_url + "/donor/fetchMed", {
        emailid,
      });
      if (resp.data.status) setMedicines(resp.data.data);
      else alert(resp.data.msg);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (medId) => {
    try {
      const resp = await axios.post(server_url + "/donor/dltmedicine", {
        medid: medId,
      });
      if (resp.data.status) {
        setMedicines((prev) => prev.filter((med) => med._id !== medId));
        alert("Medicine deleted successfully");
      } else alert(resp.data.msg);
    } catch (err) {
      console.error(err);
      alert("Deletion failed");
    }
  };

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


  const isExpiringSoon = (expDate) => {
    const today = dayjs();
    const expiry = dayjs(expDate);
    const daysUntilExpiry = expiry.diff(today, 'day');
    return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  };

  const isExpired = (expDate) => {
    return dayjs(expDate).isBefore(dayjs());
  };

  const getExpiryStatus = (expDate) => {
    if (isExpired(expDate)) {
      return { status: 'expired', color: 'text-red-600', bgColor: 'bg-red-50', icon: <AlertCircle className="w-4 h-4" /> };
    } else if (isExpiringSoon(expDate)) {
      return { status: 'expiring', color: 'text-amber-600', bgColor: 'bg-amber-50', icon: <AlertCircle className="w-4 h-4" /> };
    } else {
      return { status: 'good', color: 'text-green-600', bgColor: 'bg-green-50', icon: <CheckCircle2 className="w-4 h-4" /> };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Medicine Listings
          </h1>
          <p className="text-xl text-gray-600">
            Manage and track all your donated medicines
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Search className="w-4 h-4 text-indigo-500" />
                Email ID
              </label>
              <input 
                type="email"
                value={emailid}
                onChange={(e) => setEmailid(e.target.value)}
                placeholder="Enter your email to fetch medicines"
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button
              onClick={handleFetch}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Fetching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Fetch Medicines
                </>
              )}
            </button>
          </div>
        </div>

        {/* Medicine Cards */}
        <div className="space-y-6">
          {medicines.length === 0 ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-xl rounded-3xl border border-white/50">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No medicines listed yet</p>
              <p className="text-gray-400 mt-2">Enter your email above to fetch your medicine listings</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {medicines.map((med, idx) => {
                const expiryStatus = getExpiryStatus(med.expdate);
                
                return (
                  <div
                    key={med._id}
                    className="group bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                              {med.medname}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{med.company}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Expiry Status Badge */}
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${expiryStatus.bgColor}`}>
                          <div className={expiryStatus.color}>
                            {expiryStatus.icon}
                          </div>
                          <span className={`text-sm font-medium ${expiryStatus.color}`}>
                            {expiryStatus.status === 'expired' ? 'Expired' : 
                             expiryStatus.status === 'expiring' ? 'Expiring Soon' : 'Good'}
                          </span>
                        </div>
                      </div>

                      {/* Medicine Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Hash className="w-4 h-4" />
                            Quantity
                          </div>
                          <p className="text-xl font-semibold text-gray-900">{med.qty}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Package className="w-4 h-4" />
                            Packaging
                          </div>
                          <p className="text-lg font-medium text-gray-700">{med.packing}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            Expiry Date
                          </div>
                          <p className={`text-lg font-medium ${expiryStatus.color}`}>
                            {dayjs(med.expdate).format("DD MMM YYYY")}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {med.info && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Eye className="w-4 h-4" />
                            Additional Information
                          </div>
                          <p className="text-gray-700">{med.info}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => alert("Redirect to edit form")}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-indigo-800 font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit Details
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${med.medname}"? This action cannot be undone.`)) {
                              handleDelete(med._id);
                            }
                          }}
                          className="flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 text-red-800 font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                        <button
                          onClick={() => alert(`Viewing details for ${med.medname}`)}
                          className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Progress bar for expiry */}
                    <div className="h-1 bg-gray-100">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          expiryStatus.status === 'expired' ? 'bg-red-500' : 
                          expiryStatus.status === 'expiring' ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                        style={{
                          width: expiryStatus.status === 'expired' ? '100%' : 
                                 expiryStatus.status === 'expiring' ? '70%' : '30%'
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {medicines.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <div className="text-3xl font-bold text-blue-600">{medicines.length}</div>
                <div className="text-sm text-blue-800">Total Medicines</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <div className="text-3xl font-bold text-green-600">
                  {medicines.filter(med => !isExpired(med.expdate) && !isExpiringSoon(med.expdate)).length}
                </div>
                <div className="text-sm text-green-800">Good Condition</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-2xl">
                <div className="text-3xl font-bold text-amber-600">
                  {medicines.filter(med => isExpiringSoon(med.expdate)).length}
                </div>
                <div className="text-sm text-amber-800">Expiring Soon</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-2xl">
                <div className="text-3xl font-bold text-red-600">
                  {medicines.filter(med => isExpired(med.expdate)).length}
                </div>
                <div className="text-sm text-red-800">Expired</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorMedicineList;