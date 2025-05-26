import React, { useState,useEffect } from "react";
import { FaUser, FaCog, FaBell, FaChartBar } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../services/api"; 
import { useAuth } from '../services/auth';
import CampaignList from "../components/Campaign/CampaignList";

const Settings = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const { user } = useAuth(); 
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    description:"",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("user");
  const [username,setUserName]=useState("");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get('http://localhost:8000/api/profile/');
        setUserType(response.data.user_type);
        setUserName(response.data.username);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const tabs =
    userType === 'org'
      ? [
          { id: "profile", label: "Organization Profile", icon: <FaUser /> },
          { id: "preferences", label: "Donation Preferences", icon: <FaCog /> },
          { id: "notifications", label: "Notifications", icon: <FaBell /> },
          { id: "progress", label: "Campaign Progress", icon: <FaChartBar /> },
        ]
      : [{ id: "profile", label: "User Profile", icon: <FaUser /> }];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
  const fetchCampaigns = async () => {
    try {
      const response = await api.get('my-campaigns/');
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };
  fetchCampaigns();
}, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;
      await api.patch("http://localhost:8000/api/profile/", payload);
      alert("Profile updated successfully!");
    } catch (err) 
    {
      alert("Failed to update profile.");
      console.error(err.response?.data); // Affiche le détail de l’erreur dans la console

    }
  };

  return (

    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="shadow-md"
      >
        <h1 className="text-5xl font-extrabold text-center text-blue-700 p-7">Welcome Back <span className="text-pink-500">{username}</span></h1>
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

        {userType === "user" && activeTab === "profile" && (
          <div className="p-4 sm:p-6 rounded-lg shadow-lg">
                <div className=" p-4 sm:p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
                    User Profile
                  </h2>
                  {message && (
                    <div className="mb-4 text-black font-bold">{message}</div>
                  )}
                  <form
                    className="space-y-4 sm:space-y-6"
                    onSubmit={handleProfileSave}
                  >
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        UserName
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter username"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Password (leave blank to keep current)
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter address"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-pink-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300 w-full sm:w-auto"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            )}

        {userType === 'org' && (
          <>
            {activeTab === "profile" && (
              <div className="p-4 sm:p-6 rounded-lg shadow-lg">
                <div className=" p-4 sm:p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
                    Organization Profile
                  </h2>
                  {message && (
                    <div className="mb-4 text-black font-bold">{message}</div>
                  )}
                  <form
                    className="space-y-4 sm:space-y-6"
                    onSubmit={handleProfileSave}
                  >
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter username"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Password (leave blank to keep current)
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder={"Enter description"}
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        placeholder="Enter address"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-pink-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300 w-full sm:w-auto"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            )}
            {activeTab === "preferences" && (
  <div className="p-4 sm:p-6 rounded-lg shadow-lg">
    <h2 className="text-xl sm:text-2xl font-semibold  text-black mb-2">
      Donation Preferences
    </h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-2 text-black font-medium">
          Default Donation Amount
        </label>
        <input
          type="number"
          name="default_donation"
          min="1"
          className="w-full p-2 border rounded-lg"
          placeholder="Enter default amount"
        />
      </div>
      <div>
        <label className="block mb-2 text-black font-medium">
          Currency
        </label>
        <select className="w-full p-2 border rounded-lg" name="currency">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="MAD">MAD</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-white text-blue-400 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300"
      >
        Save Preferences
      </button>
    </form>
  </div>
)}
{activeTab === "notifications" && (
  <div className=" p-4 sm:p-6 rounded-lg shadow-lg">
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
      Notification Settings
    </h2>
    <form className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="email_notifications"
          className="mr-2"
        />
        <label htmlFor="email_notifications" className="text-black">
          Email Notifications
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="sms_notifications"
          className="mr-2"
        />
        <label htmlFor="sms_notifications" className="text-black">
          SMS Notifications
        </label>
      </div>
      <button
        type="submit"
        className="bg-white text-blue-400 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300"
      >
        Save Notification Settings
      </button>
    </form>
  </div>
)}
           {activeTab === "progress" && (
  <div className=" p-4 sm:p-6 rounded-lg shadow-lg p-10">
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
      Campaign Progress
    </h2>
    <div className="overflow-x-auto">
      <CampaignList 
  campaigns={campaigns}
  onSelectCampaign={setSelectedCampaign}
  userType={user?.user_type}
  isOwner={() => true}
/>
    </div>
  </div>
)}
          </>
        )}
      </motion.header>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Settings;
