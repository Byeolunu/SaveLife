import{ useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-white ">
      <motion.header
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="bg-white shadow-md"
>
      <div className="w-full min-h-screen bg-gray-100">
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-between px-4 md:px-16 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 66, 130, 0.6), rgba(0, 66, 132, 0.4)), url(${bgImage})`,
        }}
      >
        <div className="max-w-xl">
          <p className="text-pink-300 text-lg font-bold mb-2">Lend a Helping Hand</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-relaxed mb-6">
            Only by Helping Each Other We Can Make <br /> the World Better
          </h1>
          <p className="text-lg mb-6">
            Small acts of kindness can create lasting impact. Your donation helps build a better future.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/donate"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-5 py-4 rounded-lg"
            >
              Donate Now
            </Link>
            {userType === 'org' && (
              <Link
                to="/add-campaign"
                className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg border border-blue-600 hover:bg-blue-100"
              >
                Add Campaign
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 text-gray-800">
          <span className="bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Education
          </span>
          <h3 className="text-2xl font-bold mb-2">
            Help Children Get out of Poverty & Have a Future
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Every child deserves a chance. Your support brings education and hope to those in need.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="flex justify-between text-sm font-semibold mb-4">
            <span>$12,050</span>
            <span>Goal: $20,000</span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/donate"
              className="bg-blue-500 hover:bg-blue-600 text-center text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Donate
            </Link>
            
          </div>
        </div>
      </section>
    </div >
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
        <div className="font-bold text-blue-600 text-6xl text-center mb-16">Popular Causes</div>
        <div className="px-4 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 ">
          <div className="lg:basis-3/5 w-full grid gap-10 ">
            {causes.length > 0 ? (
              causes.slice(0, 2).map((cause) => (
                <div key={cause.id} className="bg-white rounded-xl shadow-md overflow-hidden min-h-[250px] flex  hover:shadow-2xl transition-shadow duration-300">
                  <div className="md:w-1/3 h-20 md:h-auto">
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
                      <h3 className="text-2xl font-bold mb-3 text-blue-500">{cause.title}</h3>
                      <p className="text-gray-600 mb-4">{cause.description.slice(0, 250)}...</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Goal: <span className='text-green-500'>{cause.goal} DH</span></span>
                      <Link to={`/donate/`} className="bg-pink-500 hover:bg-blue-600 text-white font-bold px-2 rounded-lg">
                        <button className="py-2 px-6">Donate</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No causes available at the moment.</p>
            )}
          </div>

          <div
  className="lg:basis-2/5 w-full bg-white rounded-xl shadow-lg p-10 border flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 bg-no-repeat bg-cover bg-center relative"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 66, 130, 0.9), rgba(0, 66, 132, 0.7)), url(${char})`,
  }}
>
  <div className="relative z-10 text-white">
    <h3 className="text-3xl font-bold mb-8">Your Impact at a Glance</h3>
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="flex items-center gap-4">
        <span className="text-pink-200 text-4xl font-bold">125+</span>
        <span>Families helped</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-pink-200 text-4xl font-bold">48</span>
        <span>Active campaigns</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-pink-200 text-4xl font-bold">1,230</span>
        <span>Donors this year</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-pink-200 text-4xl font-bold">85%</span>
        <span>Goal reached</span>
      </div>
    </div>
    <div className='py-10'>
      <h4 className="text-xl font-semibold mb-4 text-pink-200">Why Your Donation Matters</h4>
      <ul className="list-disc list-inside space-y-2">
        <li>Provide education to children in need</li>
        <li>Support emergency relief for families</li>
        <li>Create sustainable community projects</li>
        <li>Help build a brighter future for all</li>
      </ul>
    </div>
    <Link
      to="/donate"
      className="mt-10 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition text-center w-full"
    >
      Contribute Now
    </Link>
  </div>
  {/* Optional: Add an overlay for extra contrast */}
  <div className="absolute inset-0 rounded-xl bg-black opacity-30"></div>
</div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="font-bold text-blue-600 text-6xl text-center mb-16">Inspiring Stories</div>
        <div className="grid lg:grid-cols-2 gap-10 px-4 max-w-7xl mx-auto">
          {stories.length > 0 ? (
            stories.slice(0, 2).map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-md overflow-hidden min-h-[350px] flex  hover:shadow-2xl transition-shadow duration-300">
                <div className="md:w-1/3 h-60 md:h-auto ">
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
                      className="bg-pink-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
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

