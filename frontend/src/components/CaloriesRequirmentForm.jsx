import { useState } from "react";
import Congratulation from "./CaloriesRequirments/Congratulation";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [showCongrats, setShowCongrats] = useState(false);
  const [formData, setFormData] = useState({
    activityLevel: "",
    age: "",
    weight: "",
    gender: "",
    goal: "",
    height: "",
    heightUnit: "cm",
    weightUnit: "kg",
    feedback: "",
    dob: "",
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const prevStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    } else {
      console.log("Custom action for step 1");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData);
    setShowCongrats(true);
  };

  const progressWidth = `${(step / 5) * 100}%`;

  return (
    <div className="w-full max-w-lg mx-auto mt-8 pb-8 shadow-lg rounded-lg">
      {showCongrats && <Congratulation data={formData} />}

      <div className="relative px-4">
        <div className="overflow-hidden h-3 mb-6 bg-gray-200 rounded">
          <div
            style={{ width: progressWidth }}
            className="h-full bg-blue-500 rounded"
          ></div>
        </div>
      </div>

      <div className="overflow-auto h-80 mb-6">
        {step === 1 && (
          <div className="p-4">
            <h2 className="text-center font-bold text-lg mb-4">
              Welcome Tabish, Please select one Goal from below
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Lose Weight",
                "Maintain Weight",
                "Gain Weight",
                "Gain Muscle",
                "Modify My Diet",
                "Manage Stress",
                "Increase Step Count",
              ].map((goal) => (
                <div
                  key={goal}
                  className={`border p-4 rounded-lg cursor-pointer text-center transition ${
                    formData.goal === goal
                      ? "bg-blue-500 text-white border-blue-700"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, goal })}
                >
                  {goal}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 text-center">
            <h2 className="font-bold text-lg mb-4">Your Goal</h2>
            <p className="mb-4">
              Tracking your food is a scientifically proven method to hit your
              goals. Let’s talk about your goal to {formData.goal.toLowerCase()}
              .
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">
              What is your baseline activity level?
            </h2>
            {["Not Very Active", "Lightly Active", "Active"].map((level) => (
              <div
                key={level}
                className={`border-2 p-3 rounded-lg mb-4 cursor-pointer ${
                  formData.activityLevel === level
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() =>
                  setFormData({ ...formData, activityLevel: level })
                }
              >
                <h3 className="font-bold">{level}</h3>
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4 text-center">
              Select your gender and enter your details.
            </h2>
            <div className="flex justify-around mb-4">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {gender}
                </label>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                  className="border p-2 w-full rounded-l-md"
                />
                <select
                  name="heightUnit"
                  value={formData.heightUnit}
                  onChange={handleChange}
                  className="border p-2 rounded-r-md"
                >
                  <option value="cm">cm</option>
                  <option value="ft">ft</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  className="border p-2 w-full rounded-l-md"
                />
                <select
                  name="weightUnit"
                  value={formData.weightUnit}
                  onChange={handleChange}
                  className="border p-2 rounded-r-md"
                >
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                </select>
              </div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between px-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={prevStep}
        >
          Previous
        </button>
        {step < 4 ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={nextStep}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
