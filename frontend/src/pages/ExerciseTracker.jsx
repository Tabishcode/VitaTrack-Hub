import { useState } from "react";
import axios from "axios";

function ExerciseSelector() {
  const [selectedExercise, setSelectedExercise] = useState("pull_up");
  const [showVideo, setShowVideo] = useState(false);

  const handleExerciseChange = (event) => {
    const exercise = event.target.value;
    setSelectedExercise(exercise);
    sendExerciseToBackend(exercise);
  };

  const sendExerciseToBackend = async (exercise) => {
    await fetch("http://localhost:8000/set_exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exercise }),
    });
  };

  const handleStart = async () => {
    await axios.post(
      "http://localhost:8000/set-exercise/",
      new URLSearchParams({ exercise: selectedExercise })
    );
    setShowVideo(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          🎯 Select an Exercise
        </h2>

        <div className="mb-6">
          <select
            onChange={handleExerciseChange}
            value={selectedExercise}
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="push_up">Push-Up</option>
            <option value="squat">Squat</option>
            <option value="pull_up">Pull-Up</option>
            <option value="bicep_curl">Bicep Curl</option>
            <option value="deadlift">Deadlift</option>
          </select>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 rounded-md transition-all duration-200"
        >
          🚀 Start Tracking
        </button>

        {showVideo && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              📹 Live Exercise Tracker
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
              <img
                src="http://localhost:8000/video-feed/"
                alt="Live Tracker"
                className="w-full max-w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseSelector;
