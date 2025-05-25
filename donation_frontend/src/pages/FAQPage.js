import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
const FAQPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };
  const faqs = [
    {
      question: "How Can I Make a Donation?",
      answer: "You can make a donation by visiting our Donate Now page and selecting a campaign to support.",
    },
    {
      question: "Is My Donation Tax-Deductible?",
      answer: "Yes, your donation is tax-deductible. You will receive a receipt for your contribution.",
    },
    {
      question: "Can I Donate In Honor or Memory of Someone?",
      answer: "Yes, you can dedicate your donation in honor or memory of someone special.",
    },
    {
      question: "How Will My Donation Be Used?",
      answer: "Your donation will be used to support the specific campaign you choose, ensuring maximum impact.",
    },
    {
      question: "Can I Set Up a Recurring Donation?",
      answer: "Yes, you can set up recurring donations to provide ongoing support to your chosen cause.",
    },
  ];

  return (
    <div className="min-h-screen">
      <motion.header
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="bg-white "
>
      <div className="w-full h-auto  py-10">
        <h1 className="text-center text-blue-600 text-6xl font-bold">Frequently Asked Questions</h1>
      </div>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
                <div className="text-blue-500">
                  {openQuestion === index ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
              {openQuestion === index && (
                <p className="mt-4 text-gray-600 text-base">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.header>
    </div>
  );
};
export default FAQPage;