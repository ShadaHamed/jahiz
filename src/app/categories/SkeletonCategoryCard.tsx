import React from "react";

const SkeletonCategoryCard = () => (
  <div
    className="relative flex flex-col items-center p-4 mx-6 md:mx-0 bg-gray-200 text-gray-800 shadow-lg border border-gray-200 rounded-lg animate-pulse"
  >
    
    {/* Dropdown Button Placeholder */}
    <div className="absolute top-2 right-2 w-5 h-5 bg-gray-300 rounded-full"></div>

    {/* Circle Placeholder for Image */}
    <div className="overflow-hidden rounded-full w-20 h-20 bg-gray-300"></div>

    {/* Text Placeholder */}
    <div className="mt-4 text-center">
      <div className="h-4 bg-gray-300 rounded-md w-32 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded-md w-20"></div>
    </div>
  </div>
);

const SkeletonCategoryList = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <SkeletonCategoryCard key={index} />
    ))}
  </>
);

export default SkeletonCategoryList;
