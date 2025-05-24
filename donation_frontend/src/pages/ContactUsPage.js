import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { IoCall } from "react-icons/io5";
import { FaHourglassEnd } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:8000/api/submit/", formData);
      if (response.status === 201) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setErrorMessage("Failed to send your message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-md"
      >
        <div className="bg-blue-400 px-8 py-9 h-64 flex flex-col justify-center text-white">
          <h1 className="text-6xl font-bold">Contact Us</h1>
          <p className="mt-2">
            We’d love to hear from you! Whether you have a question, a suggestion, <br />
            or want to collaborate, feel free to get in touch. Your message matters to us.
          </p>
        </div>
      </motion.header>

      <section className="px-8 mt-10">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
        <p>You can reach us by phone, email, or through the contact form below. <br />
          Our team is committed to responding to you as soon as possible.
        </p>
        <div className="flex justify-between mt-6 flex-wrap gap-6">
          <div className="text-center flex-1">
            <IoCall className="w-10 h-10 mx-auto mb-2" />
            <h3 className="font-bold">Call Us</h3>
            <p>(+212) 672882380</p>
          </div>
          <div className="text-center flex-1">
            <FaHourglassEnd className="w-10 h-10 mx-auto mb-2" />
            <h3 className="font-bold">Hours</h3>
            <p>Mon-Sat<br />8:30-5:00</p>
          </div>
          <div className="text-center flex-1">
            <MdMarkEmailUnread className="w-10 h-10 mx-auto mb-2" />
            <h3 className="font-bold">Email Us</h3>
            <p>savelife@gmail.com</p>
          </div>
        </div>
      </section>

      <section className="mt-10 bg-blue-600 text-white p-8 rounded-lg mx-8">
        <h2 className="text-3xl font-bold mb-6">Get in Touch!</h2>
        {successMessage && <p className="text-green-300">{successMessage}</p>}
        {errorMessage && <p className="text-red-300">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 text-black border rounded"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 text-black border rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 text-black border rounded h-32"
              placeholder="Type your message here"
              required
            />
          </div>
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-blue-900">
            Submit
          </button>
        </form>
      </section>

      <section className="mt-12 px-8">
        <h2 className="text-3xl font-bold mb-4">Our Location</h2>
        <p className="mb-4">
          Visit us at our office located in Casablanca. Click on the map below to view our location on Google Maps.
        </p>
        <a
          href="https://www.google.com/maps/place/Casablanca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.310947456914!2d-7.620054684800308!3d33.57311098073556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cdcbf1b0f1b1%3A0x4c8b8b8b8b8b8b8b!2sCasablanca!5e0!3m2!1sen!2sma!4v1616161616161!5m2!1sen!2sma"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </a>
      </section>
    </div>
  );
};

export default ContactUsPage;
