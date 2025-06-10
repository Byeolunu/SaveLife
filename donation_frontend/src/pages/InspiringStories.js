import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { ClipLoader } from 'react-spinners';
import { motion} from 'framer-motion';
import { IoIosAddCircleOutline } from "react-icons/io";

const InspiringStories = () => {
  const formRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
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
        alert('Story created successfully!');
        setNewStory({ name: '', description: '', image: null });
        setShowAddForm(false);
      }
    } catch (error) {
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
      setFormError('Failed to update the story. Please try again.');
    }
  };

  const handleSidebarNewStoryClick = () => {
    setShowAddForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color={"pink"} loading={loading} size={150} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const Sidebar = () => (
    <aside className="w-72 min-w-60 max-w-xs bg-white shadow-2xl rounded-2xl p-6 flex flex-col justify-between h-fit">
      <div>
        {currentUser && (
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-2xl text-blue-600 mb-1">
              {currentUser.username[0]?.toUpperCase()}
            </div>
            <h3 className="text-base font-bold text-blue-600">{currentUser.username}</h3>
            <Link to="/settings" className="text-blue-500 underline text-xs mt-1">Profile</Link>
          </div>
        )}
        <div className="space-y-2 mb-6">
          <button
            onClick={handleSidebarNewStoryClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition flex items-center justify-center gap-2"
          >
            <IoIosAddCircleOutline />
            New Story
          </button>
          <Link to="/donate" className="w-full block bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded text-center transition">
            Donate
          </Link>
        </div>
        <nav className="space-y-2 mb-6">
          <Link to="/" className="block text-blue-500 hover:text-blue-700 font-semibold">
            Dashboard
          </Link>
          <Link to="/inspiring-stories/1" className="block text-blue-500 hover:text-blue-700 font-semibold">
            Inspiring Stories
          </Link>
          <Link to="/faq" className="block text-blue-500 hover:text-blue-700 font-semibold">
            FAQ
          </Link>
        </nav>
        <div className="mb-6">
          <h3 className="mb-2 font-semibold text-gray-700">Recent Stories</h3>
          <ul>
            {stories && stories.slice(0, 3).map((s) => (
              <li key={s.id} className="mb-1 text-sm">
                <Link to={`/inspiring-stories/${s.id}`} className="text-blue-500 hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-6 border-t border-gray-200"></div>
        <div className="text-sm italic text-gray-500 px-2">
          “The power of one story can move hearts, change minds, and build futures.”
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <a href="#" className="text-blue-500 hover:text-blue-700 text-sm" title="Facebook">
          <i className="fab fa-facebook">Facebook</i>
        </a>
        <a href="#" className="text-blue-400 hover:text-blue-600 text-sm" title="Twitter">
          <i className="fab fa-twitter">Twitter</i>
        </a>
        <a href="#" className="text-pink-500 hover:text-pink-700 text-sm" title="Instagram">
          <i className="fab fa-instagram">Instagram</i>
        </a>
      </div>
      
    </aside>
  );

  return (
    <div className="flex min-h-screen items-stretch bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-10 animate-fadeIn h-full">
        <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <header className="text-blue-700 py-10 text-center space-y-4">
            <h1 className="text-6xl font-extrabold">Inspiring Stories</h1>
            <p className="text-xl text-gray-700">Discover the stories that inspire us to make a difference.</p>
          </header>
          {!isEditing ? (
            <>
              <section className="text-center py-10">
                <h2 className="text-3xl font-bold text-pink-500 mb-2">{story?.name}</h2>
                <p className="text-gray-600 italic">By: {story?.created_by}</p>
              </section>
              <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                {story?.image && (
                  <img src={story.image} alt={story.name} className="w-full h-96 object-cover" />
                )}
                <div className="p-8 space-y-4">
                  <p className="text-gray-700 text-lg">{story?.description}</p>
                </div>
              </article>
              {currentUser?.username === story?.created_by && (
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
            className="bg-pink-300 hover:bg-blue-600 text-white font-bold py-5 px-20 rounded-lg disabled:opacity-50"
            disabled={stories.findIndex((s) => s.id === parseInt(id)) <= 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-pink-300 hover:bg-blue-600 text-white font-bold py-5 px-20 rounded-lg"
            disabled={stories.findIndex((s) => s.id === parseInt(id)) >= stories.length - 1}
          >
            Next
          </button>
        </div>
        <section className="mt-10" ref={formRef}>
         
          {showAddForm && (
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
          )}
        </section>
        <section className="py-20 mt-20">
          <div className="px-4 max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-center mb-16 text-blue-400">Popular Causes</h2>
            {causes.length > 0 ? (
              <div className="grid md:grid-cols-2  gap-10">
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
    </div>
  );
};

export default InspiringStories;
