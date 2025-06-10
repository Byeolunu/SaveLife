import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/images/bg.png';
import char from '../assets/images/char.jpg';
import api from '../services/api';
import FAQPage from './FAQPage';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const HomePage = () => {
  const [causes, setCauses] = useState([]);
  const [userType, setUserType] = useState(null);
  const [stories, setStories] = useState([]);
  const causeRef = useRef(null);
  const storiesRef = useRef(null);
  const heroCardRef = useRef(null);
  const statsRef = useRef(null);
  
  const isInViewCauses = useInView(causeRef, { once: true, threshold: 0.1 });
  const isInViewStories = useInView(storiesRef, { once: true, threshold: 0.1 });
  const isInViewHeroCard = useInView(heroCardRef, { once: true, threshold: 0.3 });
  const isInViewStats = useInView(statsRef, { once: true, threshold: 0.3 });

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await api.get('campaigns/');
        setCauses(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCauses();
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get('inspiring-stories/');
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching inspiring stories:', error);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get('http://localhost:8000/api/profile/');
        setUserType(response.data.user_type);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden md:text-lg">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 66, 130, 0.8) 0%, rgba(0, 66, 132, 0.6) 50%, rgba(219, 39, 119, 0.4) 100%), url(${bgImage})`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white space-y-6 lg:space-y-8 text-center lg:text-left"
            >
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-pink-300 text-base sm:text-lg font-semibold tracking-wide uppercase"
              >
                Lend a Helping Hand
              </motion.p>
              
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                Only by Helping Each Other We Can Make{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">
                  the World Better
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Small acts of kindness can create lasting impact. Your donation helps build a better future for communities around the world.
              </motion.p>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/donate"
                  className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    Donate Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                
                {userType === 'org' && (
                  <Link
                    to="/add-campaign"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 text-center"
                  >
                    Add Campaign
                  </Link>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              ref={heroCardRef}
              initial={{ x: 100, opacity: 0, scale: 0.9 }}
              animate={isInViewHeroCard ? { x: 0, opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 text-gray-800 mx-auto max-w-md w-full"
            >
              <div className="space-y-6">
                <span className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold inline-block">
                  🎓 Education
                </span>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
                  Help Children Get out of Poverty & Have a Future
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  Every child deserves a chance. Your support brings education and hope to those in need.
                </p>
                
                <div className="space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-pink-500 to-pink-600 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={isInViewHeroCard ? { width: '60%' } : {}}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-green-600">12,050 DH raised</span>
                    <span className="text-gray-600">Goal: 20,000 DH</span>
                  </div>
                </div>
                
                <Link
                  to="/donate"
                  className="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg"
                >
                  Donate to This Cause
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Popular Causes Section */}
      <motion.section
        ref={causeRef}
        initial="hidden"
        animate={isInViewCauses ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Popular Causes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of donors making a real difference in communities worldwide
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Causes Cards */}
            <div className="lg:col-span-2 space-y-8">
              {causes.length > 0 ? (
                causes.slice(0, 2).map((cause, index) => (
                  <motion.div
                    key={cause.id}
                    variants={itemVariants}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div className="flex flex-col md:flex-row min-h-[280px]">
                      <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                        {cause.image ? (
                          <img
                            src={cause.image}
                            alt={cause.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-lg">📸 No Image</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="md:w-3/5 p-6 lg:p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {cause.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed line-clamp-3">
                            {cause.description.slice(0, 200)}...
                          </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                          <span className="font-semibold text-gray-700">
                            Goal: <span className="text-green-600 font-bold">{cause.goal} DH</span>
                          </span>
                          <Link
                            to="/donate"
                            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg text-center"
                          >
                            Donate Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-12 text-gray-500"
                >
                  <div className="text-6xl mb-4">🤝</div>
                  <p className="text-lg">No causes available at the moment.</p>
                </motion.div>
              )}
            </div>

            {/* Stats Card */}
            <motion.div
              ref={statsRef}
              initial="hidden"
              animate={isInViewStats ? "visible" : "hidden"}
              variants={statsVariants}
              className="lg:col-span-1"
            >
              <div
                className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 h-full relative overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(0, 66, 130, 0.95) 0%, rgba(0, 66, 132, 0.9) 50%, rgba(219, 39, 119, 0.8) 100%), url(${char})`,
                }}
              >
                <div className="relative z-10 text-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-center lg:text-left">
                      Your Impact at a Glance
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {[
                        { number: '125+', label: 'Families helped' },
                        { number: '48', label: 'Active campaigns' },
                        { number: '1,230', label: 'Donors this year' },
                        { number: '85%', label: 'Goal reached' }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={isInViewStats ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="text-center lg:text-left"
                        >
                          <div className="text-2xl lg:text-3xl font-bold text-pink-200 mb-1">
                            {stat.number}
                          </div>
                          <div className="text-sm text-white/90">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-pink-200">
                        Why Your Donation Matters
                      </h4>
                      <ul className="space-y-2 text-sm text-white/90">
                        {[
                          'Provide education to children in need',
                          'Support emergency relief for families',
                          'Create sustainable community projects',
                          'Help build a brighter future for all'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-pink-200 mt-1">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link
                      to="/donate"
                      className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg"
                    >
                      Contribute Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Inspiring Stories Section */}
      <motion.section
        ref={storiesRef}
        initial="hidden"
        animate={isInViewStories ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Inspiring Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories of hope, resilience, and transformation from the communities we serve
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {stories.length > 0 ? (
              stories.slice(0, 2).map((story, index) => (
                <motion.div
                  key={story.id}
                  variants={itemVariants}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="flex flex-col">
                    <div className="h-48 sm:h-56 relative overflow-hidden">
                      {story.image ? (
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-500 text-lg">📖 No Image</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                          {story.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed line-clamp-4">
                          {story.description.slice(0, 180)}...
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6">
                        <span className="text-sm text-gray-500">
                          By: <span className="font-semibold text-gray-700">{story.created_by}</span>
                        </span>
                        <Link
                          to={`/inspiring-stories/${story.id}`}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg text-center"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={itemVariants}
                className="col-span-2 text-center py-12 text-gray-500"
              >
                <div className="text-6xl mb-4">📚</div>
                <p className="text-lg">No inspiring stories available at the moment.</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      <FAQPage />
    </div>
  );
};

export default HomePage;