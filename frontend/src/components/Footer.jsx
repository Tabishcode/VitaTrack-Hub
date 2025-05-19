import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowUp,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { SiGoogletranslate } from "react-icons/si";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#07242B] text-white pt-12 pb-6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#FFBE00]">VitalHub</h3>
            <p className="text-gray-300">
              Your complete health and fitness companion for tracking meals,
              workouts, and wellness goals.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-300 hover:text-[#FFBE00] transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FFBE00] transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FFBE00] transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FFBE00] transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Premium Features",
                "How It Works",
                "Pricing",
                "Testimonials",
                "Blog",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFBE00] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Features</h3>
            <ul className="space-y-3">
              {[
                "Food Tracking",
                "Workout Logs",
                "Nutrition Analysis",
                "Meal Planning",
                "Progress Charts",
                "Mobile App",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#FFBE00] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Stay Updated</h3>
            <p className="text-gray-300">
              Subscribe to our newsletter for health tips and updates.
            </p>
            <div className="flex">
              <div className="relative flex-grow">
                <IoMdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#FFBE00]"
                />
              </div>
              <button className="bg-[#FFBE00] hover:bg-[#e6a900] text-[#07242B] font-medium px-4 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} VitalHub. All rights reserved.
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-[#FFBE00] transition-colors">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-[#FFBE00] transition-colors">
              Terms of Service
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-300 hover:text-[#FFBE00] transition-colors">
              <SiGoogletranslate className="mr-2" />
              English
            </button>
            <button
              onClick={scrollToTop}
              className="bg-[#FFBE00] hover:bg-[#e6a900] text-[#07242B] p-2 rounded-full transition-colors"
              aria-label="Back to top"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
