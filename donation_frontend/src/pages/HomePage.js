import{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/images/bg.png';
import api from '../services/api';
import FAQPage from './FAQPage';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const HomePage = () => {
  const [causes, setCauses] = useState([]);
  const [userType, setUserType] = useState(null);
  const [stories, setStories] = useState([]);
  const causeRef = useRef(null);
  const isInView = useInView(causeRef, { once: true });
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

  return (
    <div className="min-h-screen bg-white">
      <motion.header
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="bg-white shadow-md"
>
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 66, 130, 0.7), rgba(0, 66, 132, 0.4)), url(${bgImage})`,
        }}
      >
        <div className="text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-blue-300 font-poppins">SaveLife</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Here to share happiness, kindness, and support.<br />
            You're at the right place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Donate Now
            </Link>
          
            {userType === 'org' && (
              <Link
                to="/add-campaign"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
              >
                Add Campaign
              </Link>
            )}
          </div>
        </div>
        
      </section>
      </motion.header>
      <motion.section
        ref={causeRef}
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="py-20 bg-gray-50"
      >
      <section>
      <section className="py-20 bg-gray-50">
        <div className="px-4 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Popular Causes</h2>
          {causes.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-10">
              {causes.slice(0, 2).map((cause) => (
                <div key={cause.id} className="bg-white rounded-xl shadow-md overflow-hidden min-h-[350px] flex">
                  <div className="md:w-1/3 h-60 md:h-auto">
                    {cause.image ? (
                      <img
                        src={cause.image}
                        alt={cause.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{cause.title}</h3>
                      <p className="text-gray-600 mb-4">{cause.description.slice(0, 200)}...</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Goal: {cause.goal} DH</span>
                      <Link to={`/donate/`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-lg">
                        <button className="py-2 px-6">Donate</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No causes available at the moment.</p>
          )}
          <div className="flex justify-center mt-10">
            <Link to="/donate">
              <button className="px-5 py-3 bg-blue-600 text-white hover:text-blue-600 hover:bg-white border border-blue-600 rounded-2xl w-40">
                More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Inspiring Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="font-bold text-blue-400 text-5xl text-center mb-16">Inspiring Stories</div>
        <div className="grid lg:grid-cols-2 gap-10 px-4 max-w-7xl mx-auto">
          {stories.length > 0 ? (
            stories.slice(0, 2).map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-md overflow-hidden min-h-[350px] flex">
                <div className="md:w-1/3 h-60 md:h-auto">
                  {story.image ? (
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{story.name}</h3>
                    <p className="text-gray-600 mb-4">{story.description.slice(0, 200)}...</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">By: {story.created_by}</span>
                    <Link
                      to={`/inspiring-stories/${story.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No inspiring stories available at the moment.</p>
          )}
        </div>
      </section>
      </section>
      </motion.section>
      <FAQPage />
    </div>
  );
};
export default HomePage;
