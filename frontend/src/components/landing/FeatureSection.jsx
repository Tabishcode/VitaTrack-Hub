import { motion } from "framer-motion";
import {
  FaAppleAlt,
  FaRunning,
  FaChartLine,
  FaMobileAlt,
  FaUtensils,
  FaMedal,
} from "react-icons/fa";

const KeyFeatures = () => {
  const features = [
    {
      icon: <FaAppleAlt className="text-teal-500 text-2xl" />,
      title: "Nutrition Tracking",
      description:
        "Log meals with our extensive food database and get detailed nutrition breakdowns",
    },
    {
      icon: <FaRunning className="text-blue-500 text-2xl" />,
      title: "Workout Plans",
      description:
        "Customized exercise routines for all fitness levels with progress tracking",
    },
    {
      icon: <FaChartLine className="text-purple-500 text-2xl" />,
      title: "Progress Analytics",
      description:
        "Visualize your journey with detailed charts and milestone tracking",
    },
    {
      icon: <FaUtensils className="text-orange-500 text-2xl" />,
      title: "Smart Recipes",
      description:
        "Discover healthy recipes tailored to your dietary preferences",
    },
    {
      icon: <FaMobileAlt className="text-green-500 text-2xl" />,
      title: "Mobile Friendly",
      description:
        "Full functionality on all devices - track anywhere, anytime",
    },
    {
      icon: <FaMedal className="text-yellow-500 text-2xl" />,
      title: "Achievements",
      description: "Earn badges and rewards for hitting your health goals",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-3"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for{" "}
            <span className="text-teal-600">Health Success</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform combines all the tools you need to
            transform your health and fitness
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-2"
        >
          <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-md">
            Explore All Features
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;
