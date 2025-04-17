import {
  FaDumbbell,
  FaChartLine,
  FaComments,
  FaUtensils,
  FaVideo,
} from "react-icons/fa";
// import food_plan from '../../../public'
const plans = [
  {
    title: "Training Plan",
    image: "/fitness_plan.png", // Replace with actual path
    features: [
      { icon: <FaDumbbell />, text: "Adaptive AI Powered Training Validations" },
      { icon: <FaComments />, text: "AI Coach Support" },
      { icon: <FaChartLine />, text: "Exercises Video-Library" },
    ],
    footerText: "Learn More",
  },
  {
    title: "Nutrition Plan",
    image: "/food_plan.jpg", // Replace with actual path
    features: [
      { icon: <FaUtensils />, text: "Food Detection Powered by AI" },
      { icon: <FaChartLine />, text: "All Needed Metrics Included" },
      { icon: <FaVideo />, text: "Dynamic Plan Interacts With Your Lifestyle" },
    ],
    footerText: "Coming Soon",
  },
];

const PlanCards = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center px-4 py-10">
      {plans.map((plan, idx) => (
        <div
          key={idx}
          className="relative w-full md:w-1/2 h-[400px] rounded-xl overflow-hidden text-white shadow-lg "
          style={{
            backgroundImage: `url(${plan.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gray-50 bg-opacity-30 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {plan.title.toUpperCase()}
              </h2>
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="text-lg bg-gray-800 p-2 rounded">
                      {feature.icon}
                    </div>
                    <span className="font-semibold">
                      {feature.text.toUpperCase()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right italic text-sm opacity-90">
              {plan.footerText}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanCards;
