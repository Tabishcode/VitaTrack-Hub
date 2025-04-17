import fitnessImg from "../../../public/fitness.jpg";
import foodImg from "../../../public/food.png";

const FeaturesSection = () => {
  return (
    <div className="relative bg-[#F7F3F0] py-20">
      {/* Top curved SVG */}
      <svg
        className="absolute top-0 left-0 w-full h-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f3f4f6"
          d="M0,96L1440,224L1440,0L0,0Z"
        ></path>
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-16 text-gray-800">
          What It Takes to Succeed
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
            <img
              src="/fitness.jpg"
              alt="Track Fitness"
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Track Your Fitness
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your workouts, track your progress, and stay on top of your goals. Whether you're lifting, running, or doing yoga — we’ve got you covered.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
            <img
              src="/food.png"
              alt="Manage Food"
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Manage Your Food
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Plan your meals, track nutrition, and stick to your goals — whether you're going keto, vegan, or just aiming for balance.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom curved SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f3f4f6"
          d="M0,224L1440,96L1440,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default FeaturesSection;



