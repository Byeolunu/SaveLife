// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import api from '../services/api';
// import { ClipLoader } from "react-spinners";
// import { motion, useInView } from 'framer-motion';
// import { useRef } from 'react';
// import food from '../assets/images/food.png';

// const InspiringStories = () => {
//   const causeRef = useRef(null);
//   const isInView = useInView(causeRef, { once: true });
//   const { id } = useParams();
//   const [story, setStory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [causes, setCauses] = useState([]);
//   const [newStory, setNewStory] = useState({ name: '', description: '', image: null });
//   const [successMessage, setSuccessMessage] = useState('');
//   const [formError, setFormError] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null); 

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await api.get('/profile/');
//         setCurrentUser(response.data);
//       } catch (error) {
//         console.error('Error fetching current user:', error);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   useEffect(() => {
//     const fetchStory = async () => {
//       try {
//         const response = await api.get(`http://127.0.0.1:8000/api/inspiring-stories/${id}/`);
//         setStory(response.data);
//       } catch (err) {
//         setError('Failed to fetch the story.');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchStory();
//   }, [id]);

//   useEffect(() => {
//     const fetchCauses = async () => {
//       try {
//         const response = await api.get('campaigns/');
//         setCauses(response.data);
//       } catch (error) {
//         console.error('Error fetching campaigns:', error);
//       }
//     };

//     fetchCauses();
//   }, []);

//   const handleNext = () => {
//     navigate(`/inspiring-stories/${parseInt(id) + 1}`);
//   };

//   const handlePrevious = () => {
//     if (parseInt(id) > 1) {
//       navigate(`/inspiring-stories/${parseInt(id) - 1}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStory({ ...newStory, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setNewStory({ ...newStory, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage('');
//     setFormError('');
  
//     const formData = new FormData();
//     formData.append('name', newStory.name);
//     formData.append('description', newStory.description);
//     if (newStory.image) {
//       formData.append('image', newStory.image);
//     }
  
//     try {
//       const response = await api.post('http://127.0.0.1:8000/api/inspiring-stories/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 201) {
//         setSuccessMessage('Story created successfully!');
//         setNewStory({ name: '', description: '', image: null }); // Reset the form fields
//       }
//     } catch (error) {
//       console.error('Error creating story:', error);
//       setFormError('Failed to create the story. Please try again.');
//     }
//   };
  
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage('');
//     setFormError('');
  
//     const formData = new FormData();
//     formData.append('name', newStory.name);
//     formData.append('description', newStory.description);
//     if (newStory.image) {
//       formData.append('image', newStory.image);
//     }
  
//     try {
//       const response = await api.put(`http://127.0.0.1:8000/api/inspiring-stories/${id}/`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response.status === 200) {
//         setSuccessMessage('Story updated successfully!');
//         setIsEditing(false);
//         setStory(response.data);
//       }
//     } catch (error) {
//       console.error('Error updating story:', error);
//       setFormError('Failed to update the story. Please try again.');
//     }
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <ClipLoader
//         color={"yellow"}
//         loading={loading}
//         size={150}
//         aria-label="Loading Spinner"
//         data-testid="loader"
//       />
//     </div>
//   );
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
    
//     <div className="min-h-screen bg-gray-50 p-10 animate-fadeIn">
//       <motion.header
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className=""
//       >
//       <header className="text-blue-700 py-10 text-center space-y-4">
//         <h1 className="text-6xl font-extrabold drop-shadow-md">Inspiring Stories</h1>
//         <p className="text-xl text-gray-700">Discover the stories that inspire us to make a difference.</p>
//       </header>

//       {!isEditing ? (
//         <>
//           <section className="text-center py-10 animate-fadeInUp">
//             <h2 className="text-3xl font-bold text-blue-500 mb-2">{story.name}</h2>
//             <p className="text-gray-600 italic">By: {story.created_by}</p>
//           </section>

//           <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition duration-300">
//             {story.image && <img src={story.image} alt={story.name} className="w-full h-96 object-cover" />}
//             <div className="p-8 space-y-4">
//               <p className="text-gray-700 leading-relaxed text-lg">{story.description}</p>
//             </div>
//           </article>

//           {currentUser && currentUser.username === story.created_by && (
//             <div className="text-center mt-10">
//               <button
//                 onClick={() => {
//         setNewStory({
//           name: story.name || '',
//           description: story.description || '',
//           image: null, // Don't prefill file input, browsers don't allow it
//         });
//         setIsEditing(true);
//       }}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300"
//               >
//                 Edit Story
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <section className="py-20 mt-20 animate-fadeIn">
//           <div className="px-4 max-w-7xl mx-auto">
//             <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Edit Your Story</h2>
//             {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
//             {formError && <p className="text-red-500 text-center">{formError}</p>}
//             <form onSubmit={handleEditSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//               <div>
//                 <label className="block mb-2 font-bold">Story Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={newStory.name}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   placeholder="Enter the story name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 font-bold">Description</label>
//                 <textarea
//                   name="description"
//                   value={newStory.description}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   placeholder="Enter the story description"
//                   rows="5"
//                   required
//                 ></textarea>
//               </div>
//               <div>
//                 <label className="block mb-2 font-bold">Image</label>
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={handleFileChange}
//                   className="w-full p-3 border rounded-lg"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
//               >
//                 Update Story
//               </button>
//             </form>
//           </div>
//         </section>
//       )}
//       </motion.header>

//       <div className="flex justify-between items-center max-w-4xl mx-auto mt-10">
//         <button
//           onClick={handlePrevious}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 disabled:opacity-50"
//           disabled={parseInt(id) <= 1}
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleNext}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300"
//         >
//           Next
//         </button>
//       </div>

//       <section className="py-20 mt-20 animate-fadeIn">
//         <div className="px-4 max-w-7xl mx-auto">
//           <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Create a New Story</h2>
//           {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
//           {formError && <p className="text-red-500 text-center">{formError}</p>}
//           <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
//             <div>
//               <label className="block mb-2 font-bold">Story Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={newStory.name}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border rounded-lg"
//                 placeholder="Enter the story name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 font-bold">Description</label>
//               <textarea
//                 name="description"
//                 value={newStory.description}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border rounded-lg"
//                 placeholder="Enter the story description"
//                 rows="5"
//                 required
//               ></textarea>
//             </div>
//             <div>
//               <label className="block mb-2 font-bold">Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 onChange={handleFileChange}
//                 className="w-full p-3 border rounded-lg"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
//             >
//               Submit Story
//             </button>
//           </form>
//         </div>
//       </section>

//       <section className="py-20 mt-20 animate-fadeIn">
//         <div className="px-4 max-w-7xl mx-auto">
//           <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Popular Causes</h2>
//           {causes.length > 0 ? (
//             <div className="grid md:grid-cols-2 gap-10">
//               {causes.slice(0, 2).map((cause) => (
//                 <div key={cause.id} className="bg-white rounded-xl shadow-xl overflow-hidden min-h-[350px] flex hover:shadow-2xl transition duration-300">
//                   <div className="md:w-1/3 h-60 md:h-auto">
//                     {cause.image ? (
//                       <img src={cause.image} alt={cause.title} className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                         <span className="text-gray-500">No Image</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-6 md:w-2/3 flex flex-col justify-between">
//                     <div>
//                       <h3 className="text-2xl font-bold mb-3 text-blue-500">{cause.title}</h3>
//                       <p className="text-gray-600 mb-4 text-sm leading-relaxed">{cause.description.slice(0, 200)}...</p>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="font-bold text-sm">Goal: {cause.goal} DH</span>
//                       <Link to={`/donate/${cause.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-lg transition duration-300">
//                         <button className="py-2 px-6 text-sm">Donate</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-500">No popular causes available.</div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default InspiringStories;

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { ClipLoader } from 'react-spinners';
import { motion, useInView } from 'framer-motion';

const InspiringStories = () => {
  const causeRef = useRef(null);
  const isInView = useInView(causeRef, { once: true });
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [causes, setCauses] = useState([]);
  const [stories, setStories] = useState([]);

  const [newStory, setNewStory] = useState({ name: '', description: '', image: null });
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch all stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get('/inspiring-stories/');
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching all stories:', error);
      }
    };
    fetchStories();
  }, []);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get('/profile/');
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  // Fetch single story
  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/inspiring-stories/${id}/`);
        setStory(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch the story.');
        setStory(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  // Fetch causes
  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await api.get('/campaigns/');
        setCauses(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCauses();
  }, []);

  // Navigation logic based on valid stories
  const handleNext = () => {
    const currentIndex = stories.findIndex((s) => s.id === parseInt(id));
    if (currentIndex !== -1 && currentIndex < stories.length - 1) {
      const nextStory = stories[currentIndex + 1];
      navigate(`/inspiring-stories/${nextStory.id}`);
    }
  };

  const handlePrevious = () => {
    const currentIndex = stories.findIndex((s) => s.id === parseInt(id));
    if (currentIndex > 0) {
      const prevStory = stories[currentIndex - 1];
      navigate(`/inspiring-stories/${prevStory.id}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStory({ ...newStory, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewStory({ ...newStory, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setFormError('');

    const formData = new FormData();
    formData.append('name', newStory.name);
    formData.append('description', newStory.description);
    if (newStory.image) {
      formData.append('image', newStory.image);
    }

    try {
      const response = await api.post('/inspiring-stories/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setSuccessMessage('Story created successfully!');
        setNewStory({ name: '', description: '', image: null });
      }
    } catch (error) {
      console.error('Error creating story:', error);
      setFormError('Failed to create the story. Please try again.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setFormError('');

    const formData = new FormData();
    formData.append('name', newStory.name);
    formData.append('description', newStory.description);
    if (newStory.image) {
      formData.append('image', newStory.image);
    }

    try {
      const response = await api.put(`/inspiring-stories/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setSuccessMessage('Story updated successfully!');
        setIsEditing(false);
        setStory(response.data);
      }
    } catch (error) {
      console.error('Error updating story:', error);
      setFormError('Failed to update the story. Please try again.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader color={"yellow"} loading={loading} size={150} />
    </div>
  );

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10 animate-fadeIn">
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <header className="text-blue-700 py-10 text-center space-y-4">
          <h1 className="text-6xl font-extrabold">Inspiring Stories</h1>
          <p className="text-xl text-gray-700">Discover the stories that inspire us to make a difference.</p>
        </header>

        {!isEditing ? (
          <>
            <section className="text-center py-10">
              <h2 className="text-3xl font-bold text-blue-500 mb-2">{story.name}</h2>
              <p className="text-gray-600 italic">By: {story.created_by}</p>
            </section>
            <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
              {story.image && (
                <img src={story.image} alt={story.name} className="w-full h-96 object-cover" />
              )}
              <div className="p-8 space-y-4">
                <p className="text-gray-700 text-lg">{story.description}</p>
              </div>
            </article>
            {currentUser?.username === story.created_by && (
              <div className="text-center mt-10">
                <button
                  onClick={() => {
                    setNewStory({
                      name: story.name || '',
                      description: story.description || '',
                      image: null,
                    });
                    setIsEditing(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Edit Story
                </button>
              </div>
            )}
          </>
        ) : (
          // Edit form
          <section className="py-20 mt-20">
            <div className="px-4 max-w-7xl mx-auto">
              <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Edit Your Story</h2>
              {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
              {formError && <p className="text-red-500 text-center">{formError}</p>}
              <form onSubmit={handleEditSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div>
                  <label className="block mb-2 font-bold">Story Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newStory.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-bold">Description</label>
                  <textarea
                    name="description"
                    value={newStory.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                    rows="5"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-bold">Image</label>
                  <input type="file" name="image" onChange={handleFileChange} className="w-full p-3 border rounded-lg" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
                  Update Story
                </button>
              </form>
            </div>
          </section>
        )}
      </motion.header>

      <div className="flex justify-between items-center max-w-4xl mx-auto mt-10">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50"
          disabled={stories.findIndex((s) => s.id === parseInt(id)) <= 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          disabled={stories.findIndex((s) => s.id === parseInt(id)) >= stories.length - 1}
        >
          Next
        </button>
      </div>
      <section className="py-20 mt-20">
        <div className="px-4 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Create a New Story</h2>
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          {formError && <p className="text-red-500 text-center">{formError}</p>}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div>
              <label className="block mb-2 font-bold">Story Name</label>
              <input
                type="text"
                name="name"
                value={newStory.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Description</label>
              <textarea
                name="description"
                value={newStory.description}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                rows="5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Image</label>
              <input type="file" name="image" onChange={handleFileChange} className="w-full p-3 border rounded-lg" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
              Submit Story
            </button>
          </form>
        </div>

      </section>
      <section className="py-20 mt-20">
        <div className="px-4 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Popular Causes</h2>
          {causes.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-10">
              {causes.slice(0, 2).map((cause) => (
                <div key={cause.id} className="bg-white rounded-xl shadow-xl overflow-hidden min-h-[350px] flex hover:shadow-2xl transition duration-300">
                  <div className="md:w-1/3 h-60 md:h-auto">
                    {cause.image ? (
                      <img src={cause.image} alt={cause.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-blue-500">{cause.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{cause.description.slice(0, 200)}...</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">Goal: {cause.goal} DH</span>
                      <Link to={`/donate/${cause.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-lg transition duration-300">
                        <button className="py-2 px-6 text-sm">Donate</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No popular causes available.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InspiringStories;
