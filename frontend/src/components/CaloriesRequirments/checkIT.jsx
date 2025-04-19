import React, { useEffect, useState } from "react";


// Particle Animation Effect
const ParticleEffect = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: 0,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      };
      setParticles((prev) => [...prev, newParticle]);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animation: `fall ${particle.speed}s linear infinite`,
          }}
        />
      ))}

      <style>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: fall linear infinite;
        }

        @keyframes fall {
          from {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          to {
            transform: translateY(100vh) translateX(${Math.random() * 2 - 1}vh);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

const Congratulation = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-slate-500 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 overflow-hidden">
      {/* Particle Effect Overlay */}
      <ParticleEffect />

      {/* Congratulations Card */}
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-96 z-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          🎉 Congratulations! 🎉
        </h1>
        <p className="text-lg mb-4 text-center text-gray-700">
          You submitted the form successfully!
        </p>

        {/* User Info Section */}
        <div className="text-sm text-gray-700 text-center mb-4">
          <p>
            <strong>Name:</strong> {"hello"}
          </p>
          <p>
            <strong>Email:</strong> {"email"}
          </p>
          <p>
            <strong>Age:</strong> {"age"}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-center space-x-4 mt-4">
          {/* Go Back Button */}
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
            onClick={() => alert("Going Back...")}
          >
            Go Back
          </button>

          {/* Start Your Success Tracking */}
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-200"
            onClick={() => alert("Success Tracking Started!")}
          >
            Start Your Tracking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;
