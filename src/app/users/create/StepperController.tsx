import React from 'react'

const StepperController = ({ handleClick, currentStep, steps }) => {
  console.log('curent step', currentStep)
  console.log('step length', steps.length )
  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => handleClick("back")}
        className={`bg-white text-gray-600 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-gray-200 hover:text-gray-50 transition duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentStep === 1}
      >
        Back
      </button>

      {/* Next or Submit Button */}
      {currentStep < steps.length ? (
        <button
          type="button"
          onClick={() => handleClick("next")}
          className="bg-primaryColor text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-primaryColor_2 transition duration-200 ease-in-out"
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="bg-primaryColor text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-primaryColor_2 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      )}
    </div>
  );
};


export default StepperController