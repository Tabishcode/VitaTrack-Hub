import React from "react";
import fitnessImg from "../../../public/fitness.png";
import moneyImg from "../../../public/money.png";
import foodImg from "../../../public/food.png";
import securityImg from "../../../public/security.png";

const FeaturesSection = () => {
  return (
    <div className="relative bg-[#F7F3F0] py-12">
      {/* Top curved background using SVG */}
      <svg
        className="absolute top-0 left-0 w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f3f4f6"
          fillOpacity="1"
          d="M0,96L1440,224L1440,0L0,0Z"
        ></path>
      </svg>

      <div className="relative z-10 text-center">
        <h2 className="text-2xl font-semibold mb-8">
          What it takes to succeed
        </h2>

        {/* Four feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="text-center">
            <img
              src={fitnessImg}
              alt="Track Fitness"
              className="mx-auto mb-4 size-[50%]"
            />
            <h3 className="font-semibold text-lg">Track Your Fitness</h3>
            <p>
              Monitor your workouts, track your progress, and stay on top of
              your fitness goals. Whether you're lifting, running, or doing
              yoga, we’ve got you covered.
            </p>
          </div>

          {/* Card 2 */}
          <div className="text-center">
            <img
              src={moneyImg}
              alt="Manage Money"
              className="mx-auto mb-4 size-[50%]"
            />
            <h3 className="font-semibold text-lg">Manage Your Money</h3>
            <p>
              Keep track of all your expenses, set savings goals, and visualize
              your spending habits. Get detailed insights and keep your finances
              in check.
            </p>
          </div>

          {/* Card 3 */}
          <div className="text-center">
            <img
              src={foodImg}
              alt="Manage Food"
              className="mx-auto mb-4 size-[50%]"
            />
            <h3 className="font-semibold text-lg">Manage Your Food</h3>
            <p>
              Plan your daily meals, track your nutritional intake, and make
              sure you're staying on top of your diet. Whether you’re going
              keto, vegan, or balanced meals, we make it simple.
            </p>
          </div>

          {/* Card 4 */}
          <div className="text-center">
            <img
              src={securityImg}
              alt="Secure Passwords"
              className="mx-auto mb-4 size-[50%]"
            />
            <h3 className="font-semibold text-lg">Secure Your Passwords</h3>
            <p>
              Store and organize all your passwords securely in one place.
              Generate strong passwords and check the health of your existing
              ones for added peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom curved background using SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f3f4f6"
          fillOpacity="1"
          d="M0,224L1440,96L1440,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default FeaturesSection;
