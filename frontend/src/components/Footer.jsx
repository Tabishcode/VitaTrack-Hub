import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa"; // Import the icons
import backtoTop from "../../public/gotoTop.png"; // Assuming the path to the image is correct

const Footer = () => {
  // Scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#07242B] text-white py-6 relative z-[-1]">
      {/* Header Section */}
      {/* <div className="mx-auto hidden sm:hidden lg:flex md:flex font-bold w-[90%] sm:text-sm md:text-lg lg:text-lg xl:text-xl">
        <div className="w-1/4 px-4">About</div>
        <div className="w-[24%] px-4">Categories</div>
        <div className="w-[24%] px-4">Support</div>
        <div className="w-[27%] px-4">Subscribe</div>
      </div> */}

      {/* <div className="justify-start mt-2 mb-2 hidden sm:hidden lg:flex md:flex">
        <div className="w-[100%] h-[.5px] bg-gray-400"></div>
      </div> */}

      <div className="mx-auto py-6 px-4 w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col text-center md:text-left">
            <h2 className="font-bold text-lg mb-2 sm:flex lg:hidden md:hidden">
              About
            </h2>
            <div className="block lg:hidden md:hidden sm:block w-full h-[1px] bg-gray-400 mb-4"></div>
            <ul className="space-y-6 cursor-pointer">
              <li className="hover:text-[#FFBE00]">About Us</li>
              <li className="hover:text-[#FFBE00]">Premium Account</li>
              <li className="hover:text-[#FFBE00]">How to use</li>
              <li className="hover:text-[#FFBE00]">Pricing</li>
              <li className="hover:text-[#FFBE00]">Services</li>
              <li className="hover:text-[#FFBE00]">Terms of Service</li>
            </ul>
          </div>
          <div className="flex flex-col text-center md:text-left">
            <h2 className="font-bold text-lg mb-2 sm:flex lg:hidden md:hidden">
              Categories
            </h2>
            <div className="block lg:hidden md:hidden sm:block w-full h-[1px] bg-gray-400 mb-4"></div>
            <ul className="space-y-6 cursor-pointer">
              <li className="hover:text-[#FFBE00]">Food Tracking</li>
              <li className="hover:text-[#FFBE00]">Fitness Tracking</li>
              <li className="hover:text-[#FFBE00]">Expense Management</li>
              <li className="hover:text-[#FFBE00]">Passwords Management</li>
              <li className="hover:text-[#FFBE00]"></li>
             
            </ul>
          </div>
          <div className="flex flex-col text-center md:text-left">
            <h2 className="font-bold text-lg mb-2 sm:flex lg:hidden md:hidden">
              Support
            </h2>
            <div className="block lg:hidden md:hidden sm:block w-full h-[1px] bg-gray-400 mb-4"></div>
            <ul className="space-y-6 cursor-pointer">
              <li className="hover:text-[#FFBE00]">Help & Support</li>
              <li className="hover:text-[#FFBE00]">FAQ VitalHub</li>
              <li className="hover:text-[#FFBE00]">Contact Us</li>
              <li className="hover:text-[#FFBE00]">Services</li>
              <li className="hover:text-[#FFBE00]">Terms of Service</li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h2 className="font-bold text-lg mb-2 sm:flex lg:hidden md:hidden sm:text-sm md:text-lg lg:text-lg xl:text-xl">
              Subscribe
            </h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center bg-gray-900 py-3 px-2 rounded-md">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 bg-gray-900 text-white text-sm placeholder-[#7A7A7A] focus:outline-none"
                  style={{ width: "70%" }}
                />
                <button className="text-white px-2 border-l border-gray-400">
                  Send
                </button>
              </div>

              {/* Follow Us Section */}
              <div className="flex items-center justify-between mt-4">
                <h2 className="text-md mb-2">Follow Us</h2>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-white hover:text-[#FFBE00]">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="text-white hover:text-[#FFBE00]">
                    <FaTwitter />
                  </a>
                  <a href="#" className="text-white hover:text-[#FFBE00]">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-white hover:text-[#FFBE00]">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Go to Top Button */}
      <div className="absolute right-5 mr-[5%] bottom-[20%]">
        <button
          onClick={scrollToTop}
          className="shadow-s size-14 flex justify-center items-center rounded-full bg-white hover:bg-[#FFBE00]"
        >
          <img src={backtoTop} alt="Go to top" className="cursor-pointer" />
        </button>
      </div>
      <div className="flex justify-start mt-2 mb-2">
        <div className="w-[100%] h-[.5px] bg-gray-400"></div>
      </div>

      <div className="flex justify-between items-center px-6 md:px-10">
        <p>© VitalHub. 2024. All rights reserved.</p>
        <button className="bg-black text-white px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-900 focus:outline-none">
          <span>English</span>
          <span className="ml-2">→</span> {/* Right arrow */}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
