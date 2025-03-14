import PromoPic from '../../../public/promoPic.jpg'

const PromoSection = () => {
  return (
    <div className="flex items-center justify-center">
      {/* Left side with text content */}
      <div className="flex-1  ml-[5%]">
        <h1 className="text-3xl font-semibold mb-4">
          Transform Your Life with Our All-in-One Platform
        </h1>
        <h2 className="text-lg mb-2">Streamline Your Journey:</h2>
        <p className="mb-4">
          Manage your <span className="font-semibold">meals</span>, track{" "}
          <span className="font-semibold">fitness</span>, monitor{" "}
          <span className="font-semibold">expenses</span>, and secure{" "}
          <span className="font-semibold">passwords</span>—all in one place.
        </p>
        <button className="bg-teal-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-teal-600 mb-4">
          Join Today
        </button>
        <p>Start your path to a more organized and fulfilling life!</p>
      </div>

      {/* Right side with image */}
      <div className="flex-1 p-6">
        <img
          src={PromoPic} // Placeholder image; replace with your image link
          alt="Promotional Graphic"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default PromoSection;
