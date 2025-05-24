import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ThankYou = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="min-h-screen flex flex-col items-center justify-center bg-blue-50"
  >
    <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your action means a lot to us. We appreciate your support and kindness!
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  </motion.div>
);

export default ThankYou;