import { motion } from "framer-motion";
import PromoPic from "../../../public/promoPic.jpg";
// import Image from "next/image";

const PromoSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
      {/* Left side with text content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 max-w-2xl lg:ml-[5%] text-center lg:text-left mb-8 lg:mb-0"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight"
        >
          Your Complete <span className="text-teal-600">Health</span> &{" "}
          <span className="text-blue-600">Fitness</span> Companion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg sm:text-xl mb-6 text-gray-600 max-w-lg"
        >
          Track meals, monitor workouts, and achieve your wellness goals with
          our all-in-one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center lg:items-start mb-6"
        >
          <button className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-6 rounded-full font-bold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg group">
            <span className="relative z-10">Start Tracking Free</span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-7 h-7 rounded-full bg-teal-100 border-2 border-white"
                ></div>
              ))}
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">
              Join 10,000+ happy users
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md"
        >
          {[
            { icon: "🍎", text: "Food Tracking" },
            { icon: "🏋️", text: "Workout Log" },
            { icon: "📊", text: "Analytics" },
            { icon: "🥗", text: "Recipes" },
            { icon: "🏆", text: "Challenges" },
            { icon: "📱", text: "Mobile App" },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-gray-100"
            >
              <span className="text-lg mr-2">{feature.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {feature.text}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right side with image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 max-w-2xl p-4 lg:p-0 relative mt-0"
      >
        <div className="relative w-full h-56 sm:h-64 md:h-80 lg:h-[28rem] rounded-xl overflow-hidden shadow-xl border-4 border-white transform rotate-1 hover:rotate-0 transition-all duration-500">
          <img
            src={PromoPic}
            alt="Health and fitness tracking app screenshot"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-md border border-gray-100 hidden lg:block">
          <div className="flex items-center">
            <div className="bg-teal-100 p-1.5 rounded-md mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">
                +85% Success Rate
              </p>
              <p className="text-[10px] text-gray-500">
                for users tracking regularly
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PromoSection;
