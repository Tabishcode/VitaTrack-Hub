import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "This app completely changed my relationship with food and exercise. Lost 20lbs in 3 months!",
      name: "Sarah K.",
      role: "Fitness Enthusiast",
      stars: 5,
    },
    {
      quote:
        "As a nutritionist, I recommend this to all my clients. The tracking is so comprehensive yet simple.",
      name: "Dr. Michael T.",
      role: "Certified Nutritionist",
      stars: 5,
    },
    {
      quote:
        "Never stuck to an app this long before. The progress charts keep me motivated every single day.",
      name: "James L.",
      role: "Marathon Runner",
      stars: 4,
    },
  ];

  const metrics = [
    { value: "10K+", label: "Active Users" },
    { value: "500K+", label: "Meals Tracked" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "4.9/5", label: "App Rating" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Metrics Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"
        >
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <p className="text-4xl font-bold text-teal-600 mb-2">
                {metric.value}
              </p>
              <p className="text-gray-600">{metric.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by <span className="text-teal-600">Health-Conscious</span>{" "}
            People
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <FaQuoteLeft className="text-gray-300 text-2xl mb-4" />
              <p className="text-gray-700 mb-6">{testimonial.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < testimonial.stars
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } text-sm`}
                    />
                  ))}
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
          className="text-center mt-12"
        >
          <button className="bg-white text-teal-600 py-3 px-8 rounded-full font-semibold hover:bg-teal-50 transition-all duration-300 border border-teal-600 shadow-sm">
            Read More Success Stories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
