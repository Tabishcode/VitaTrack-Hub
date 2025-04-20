import { useState } from "react";
import Congratulation from "./CaloriesRequirments/Congratulation";
import axios from "axios";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [showCongrats, setShowCongrats] = useState(false);
  const [errors, setErrors] = useState({});
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateCalories = (data) => {
    // Convert weight to kg if in pounds
    const weightKg =
      data.weightUnit === "lb"
        ? parseFloat(data.weight) * 0.453592
        : parseFloat(data.weight);

    // Convert height to cm if in feet
    let heightCm = parseFloat(data.height);
    if (data.heightUnit === "ft") {
      const feet = parseFloat(data.height);
      heightCm = feet * 30.48; // 1 ft = 30.48 cm
    }

    const age = calculateAge(data.dob);

    // Mifflin-St Jeor Equation (most accurate)
    let bmr;
    if (data.gender === "Male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      // Female or Other
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    // Revised activity multipliers (more precise)
    const activityMultiplier =
      {
        "Not Very Active": 1.2, // Sedentary (little/no exercise)
        "Lightly Active": 1.375, // Light exercise 1-3 days/week
        Active: 1.55, // Moderate exercise 3-5 days/week
        "Very Active": 1.725, // Hard exercise 6-7 days/week
        "Extremely Active": 1.9, // Very hard exercise + physical job
      }[data.activityLevel] || 1.2;

    const tdee = bmr * activityMultiplier;

    // Goal-based adjustments (percentage-based for safety)
    let calories;
    if (data.goal.toLowerCase().includes("lose")) {
      // 15-20% deficit for weight loss
      calories = tdee * 0.85;
    } else if (data.goal.toLowerCase().includes("gain")) {
      // 10-15% surplus for weight gain
      calories = tdee * 1.1;
    } else {
      // Maintenance
      calories = tdee;
    }

    return Math.round(calories);
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1 && !formData.goal) {
      newErrors.goal = "Goal is required";
    }
    if (step === 3 && !formData.activityLevel) {
      newErrors.activityLevel = "Activity level is required";
    }
    if (step === 4) {
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.height || isNaN(formData.height))
        newErrors.height = "Enter a valid height";
      if (!formData.weight || isNaN(formData.weight))
        newErrors.weight = "Enter a valid weight";
      if (!formData.dob) {
        newErrors.dob = "Date of birth is required";
      } else {
        const age = calculateAge(formData.dob);
        if (age < 10 || age > 100)
          newErrors.dob = "Age must be between 10 and 100";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fix the errors before continuing.");
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const payload = {
      dob: formData.dob,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      gender: formData.gender,
      goal: formData.goal.toLowerCase(),
      calories: calculateCalories(formData),
    };

    try {
      const response = await axios.post("/api/user/updateByFormData", payload);
      if (response.data.success) {
        setShowCongrats(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again later.");
    }
  };

  const progressWidth = `${(step / 4) * 100}%`;

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
                  onClick={() => {
                    setFormData({ ...formData, goal });
                    setErrors({ ...errors, goal: "" });
                  }}
                >
                  {goal}
                </div>
              ))}
            </div>
            {errors.goal && <p className="text-red-500 mt-2">{errors.goal}</p>}
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
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300"
                }`}
                onClick={() =>
                  setFormData({ ...formData, activityLevel: level })
                }
              >
                <h3 className="font-bold">{level}</h3>
              </div>
            ))}
            {errors.activityLevel && (
              <p className="text-red-500 mt-2">{errors.activityLevel}</p>
            )}
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
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                  className={`border p-2 w-full rounded-l-md ${
                    errors.height ? "border-red-500" : ""
                  }`}
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
              {errors.height && <p className="text-red-500">{errors.height}</p>}

              <div className="flex items-center">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  className={`border p-2 w-full rounded-l-md ${
                    errors.weight ? "border-red-500" : ""
                  }`}
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
              {errors.weight && <p className="text-red-500">{errors.weight}</p>}

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`border p-2 w-full rounded ${
                  errors.dob ? "border-red-500" : ""
                }`}
              />
              {errors.dob && <p className="text-red-500">{errors.dob}</p>}
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
