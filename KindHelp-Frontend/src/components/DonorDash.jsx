

import React from "react";
import { ClipboardList, PackagePlus, Activity, PlusCircle, TrendingUp, Users, Calendar, Heart, AlertCircle } from "lucide-react";
import { useEffect,useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'
import {server_url} from '../config/url'

const DonorDash = () => {

  const [noofmed, countmed] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { uid } = jwtDecode(token);
      medonated(uid);
    }
  }, []);

  const medonated = async (email) => {
    try {
      const url = server_url + `/donor/totalmed?email=${email}`;
      const resp = await axios.get(url);

      if (resp.data.status) {
        countmed(resp.data.count);
      } else {
        alert("⚠️ Error: " + resp.data.msg);
      }
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("⚠️ Server error occurred.");
    }
  };

   const stats = [
    {
      label: "Total Donations",
      value: noofmed,
      icon: <PackagePlus size={24} />,
      bg: "from-blue-600 to-blue-700",
      lightBg: "bg-blue-50",
      change: "+3 this month",
      trend: "up",
      color: "blue"
    },
    {
      label: "Active Listings",
      value: 4,
      icon: <ClipboardList size={24} />,
      bg: "from-emerald-600 to-emerald-700",
      lightBg: "bg-emerald-50",
      change: "2 expiring soon",
      trend: "warning",
      color: "emerald"
    },
    
  ];

  const recentActivity = [
    { 
      action: "New medicine request received", 
      medicine: "Paracetamol 500mg", 
      time: "2 hours ago", 
      type: "request",
      status: "pending"
    },
    { 
      action: "Medicine successfully donated", 
      medicine: "Amoxicillin 250mg", 
      time: "1 day ago", 
      type: "donation",
      status: "completed"
    },
    { 
      action: "Listing updated", 
      medicine: "Insulin 100IU/ml", 
      time: "2 days ago", 
      type: "update",
      status: "active"
    },
    { 
      action: "Donation request fulfilled", 
      medicine: "Metformin 500mg", 
      time: "3 days ago", 
      type: "donation",
      status: "completed"
    }
  ];

  const getStatusColor = (type, status) => {
    if (type === 'request') return 'bg-amber-100 text-amber-700 border border-amber-200';
    if (type === 'donation' && status === 'completed') return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
    return 'bg-blue-100 text-blue-700 border border-blue-200';
  };

  const getActivityIcon = (type) => {
    if (type === 'request') return <AlertCircle className="w-4 h-4" />;
    if (type === 'donation') return <Heart className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Professional Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Welcome Donor
                </h1>
                <p className="text-gray-600 mt-1">
                  Track your impact and manage donations
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                <span className="text-sm font-medium">Active Donor</span>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${item.bg} rounded-xl flex items-center justify-center shadow-lg`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-lg ${
                  item.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 
                  item.trend === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-gray-50 text-gray-600'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs font-medium">{item.change}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-gray-900">{item.value}</h3>
                <p className="text-gray-600 font-medium">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(activity.type, activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.medicine}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-auto">
            <div className="flex items-center gap-3 mb-6">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <a
                href="/ddash/donorForm"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 text-center"
              >
                Add New Medicine
              </a>
              <a
                href="/ddash/donorMedList"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200 text-center"
              >
                View My Donations
              </a>
              <a
                href="/ddash/AvailMed"
                className="block w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200 text-center border border-emerald-200"
              >
                Make Available
              </a>
            </div>
          </div>
        </div>

        {/* Professional CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-lg">
          <div className="text-center text-white space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Expand Your Impact</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Your donations make a real difference. Continue helping those in need by adding more medicines to our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <a
                href="/ddash/donorForm"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                Add New Donation
              </a>
              <a
                href="/ddash/donorMedList"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-200"
              >
                <ClipboardList className="w-5 h-5" />
                Manage Listings
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDash;