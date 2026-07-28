

import React, { useEffect, useState } from "react";
import { Heart, Info, Users, AlertCircle, Package, User, Calendar } from "lucide-react";
import axios from "axios";
import {server_url} from '../config/url'

const NeedyDash = () => {
  const [recentMeds, setRecentMeds] = useState([]);

  useEffect(() => {
    const fetchRecentMedicines = async () => {
      try {
        const response = await fetch(server_url + '/needy/recent-medicines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}) // Empty body as your endpoint doesn't need parameters
        });
        
        const data = await response.json();
        
        // Since your backend sends the array directly
        if (Array.isArray(data)) {
          setRecentMeds(data);
        } else {
          console.error('Expected array but got:', data);
          setRecentMeds([]); // Fallback to empty array
        }
      } catch (error) {
        console.error('Error fetching recent medicines:', error);
        setRecentMeds([]); // Fallback to empty array on error
      }
    };

    fetchRecentMedicines();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Welcome Header */}
        <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Welcome to MedMatch
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Find essential medicines donated by kind individuals and organizations.</p>
            </div>
          </div>
        </div>

        {/* Recently Added Medicines */}
        <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="text-emerald-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Recently Added Medicines</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentMeds.length > 0 ? recentMeds.map((med, idx) => (
              <div
                key={idx}
                className="group p-6 border border-gray-200 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Medicine Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                    <Package className="text-white w-6 h-6" />
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Available
                  </div>
                </div>

                {/* Medicine Details */}
                <div className="space-y-3">
                  <h3 className="font-bold text-emerald-700 text-xl group-hover:text-emerald-600 transition-colors">
                    {med.medName}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Quantity:</span>
                      <span className="text-gray-900 font-semibold">{med.qty}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Packing:</span>
                      <span className="text-gray-900 font-semibold">{med.packing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Company:</span>
                      <span className="text-gray-900 font-semibold">{med.company}</span>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 text-sm">Donor:</span>
                      <span className="text-gray-900 font-medium text-sm">{med.emailid}</span>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No medicines added recently.</p>
                <p className="text-gray-400 text-sm mt-1">Check back later for new donations.</p>
              </div>
            )}
          </div>
        </div>

        {/* How it Works Section */}
        <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Info className="text-blue-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">How to Use</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { step: "1", title: "Find Medicines", desc: "Go to the Find Medicines page." },
              { step: "2", title: "Search", desc: "Search by medicine name and your city." },
              { step: "3", title: "Contact Donor", desc: "Contact the listed donor via email for pickup or delivery." },
              { step: "4", title: "Use Responsibly", desc: "Use medicines responsibly and as per doctor's prescription." }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Donors Section */}
        <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="text-purple-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Meet Our Donors</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "MedCare Foundation", donations: "42 medicines donated", icon: "🏥" },
              { name: "City Hospital", donations: "27 medicines listed", icon: "🏥" },
              { name: "Community Volunteers", donations: "18 donations", icon: "👥" }
            ].map((donor, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{donor.icon}</span>
                  <h3 className="font-bold text-gray-900">{donor.name}</h3>
                </div>
                <p className="text-purple-700 font-medium text-sm">{donor.donations}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NeedyDash;
