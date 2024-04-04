/* eslint-disable no-unused-vars */
import { useState } from "react";
import Symptom from "./symptoms/symptoms";
const Header = ({ clicked }) => {
  const [imagesVisible, setImagesVisible] = useState(false);

  const handleButtonClick = () => {
    clicked();
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-3/4 p-24 bg-gray-50 shadow rounded-xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Welcome to Your Personal Health Companion
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Experience a revolutionary way to understand your health. Our Smart
          Health App uses advanced AI to analyze your symptoms and provide
          insightful predictions. Take the first step towards a healthier you.
        </p>
        <button
          onClick={handleButtonClick}
          className="my-4 mx-auto bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Your Health Journey
        </button>
      </div>
    </div>
  );
};

export default Header;
