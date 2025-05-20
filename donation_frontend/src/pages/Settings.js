// 


import React, { useState } from "react";
import { FaUser, FaCog, FaBell, FaChartBar } from "react-icons/fa";
import CampaignProgress from "../components/Campaign/CampaignProgress";
import {motion} from 'framer-motion';
const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Organization Profile", icon: <FaUser /> },
    { id: "preferences", label: "Donation Preferences", icon: <FaCog /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "progress", label: "Campaign Progress", icon: <FaChartBar /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="shadow-md"
    >
      {/* Responsive Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 border-b border-gray-200 hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 rounded-lg shadow-lg">
        {activeTab === "profile" && (
          <div className="bg-blue-400 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
              Organization Profile
            </h2>
            <form className="space-y-4 sm:space-y-6">
              {/* Form Fields */}
              {[
                "Organization Name",
                "Address",
                "Website URL",
                "Contact Phone",
                "Organization Email",
              ].map((label) => (
                <div key={label}>
                  <label className="block mb-2 text-sm sm:text-base font-medium text-white">
                    {label}
                  </label>
                  <input
                    type={label.includes("Email") ? "email" : "text"}
                    className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}
              {/* File Upload */}
              <div>
                <label className="block mb-2 text-sm sm:text-base font-medium text-white">
                  Upload Logo or Banner
                </label>
                <input
                  type="file"
                  className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                  accept="image/*"
                />
              </div>
              <button className="bg-white text-blue-400 px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300 w-full sm:w-auto">
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Other tabs follow similar structure */}
        {activeTab === "preferences" && (
          <div className="bg-blue-400 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
              Donation Preferences
            </h2>
            <form className="space-y-4 sm:space-y-6">
              {/* Preferences form fields */}
              {[
                "Enable Recurring Donations",
                "Enable Automatic Receipts",
                "Enable Thank-You Emails",
              ].map((label) => (
                <div key={label} className="flex items-center">
                  <label className="text-sm sm:text-base font-medium text-white mr-2">
                    {label}
                  </label>
                  <input type="checkbox" />
                </div>
              ))}
              {/* Other fields */}
              <button className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto">
                Save Preferences
              </button>
            </form>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-blue-400 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
              Notifications
            </h2>
            <form className="space-y-4 sm:space-y-6">
              {/* Notification settings */}
              <button className="bg-white text-blue-400 px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300 w-full sm:w-auto">
                Save Notifications
              </button>
            </form>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="bg-blue-400 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
              Campaign Progress
            </h2>
            <div className="overflow-x-auto">
              <CampaignProgress data={[]} />
            </div>
          </div>
        )}

      </div>
      </motion.header>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Settings;

