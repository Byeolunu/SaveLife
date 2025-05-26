import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleNewsletterSubmit = () => {

    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <footer className="bg-blue-400 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Our Newsletters</h2>
              <p className="text-white">
                Subscribe to our newsletter to stay updated on our latest news,
                ongoing projects, upcoming events, and more. Stay connected with
                our mission!
              </p>

              <div className="flex justify-start space-x-4 mt-4">
                <FaFacebook className="h-6 w-6" />
                <FaXTwitter className="h-6 w-6" />
                <CiInstagram className="h-6 w-6" />
                <FaLinkedin className="h-6 w-6" />
              </div>
            </div>

            <div className="md:w-1/2 flex items-center space-x-2 ">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow p-3 border rounded"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="bg-pink-500 text-white px-10 py-3 rounded hover:bg-gray-800"
              >
                Submit Button
              </button>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="flex justify-center space-x-6 text-sm text-white">
              <span>Mentions Légales</span>
              <span>Politique de Confidentialité</span>
              <span>Contact & FAQ</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Layout;