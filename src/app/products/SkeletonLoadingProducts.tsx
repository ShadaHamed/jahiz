import React from 'react';

const SkeletonLoadingProducts = ({ count = 6 }: { count?: number }) => {
  const skeletonItems = React.useMemo(() => Array.from({ length: count }), [count]);

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="relative w-60 bg-gray-200 shadow-md rounded-lg p-2 animate-pulse"
          aria-label="Loading product placeholder"
        >
          {/* Image placeholder */}
          <div className="h-48 bg-gray-300 rounded-t-lg"></div>

          {/* Text placeholders */}
          <div className="px-3 py-2">
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>

            <div className="flex items-center mt-2">
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4 ml-2"></div>
              <div className="ml-auto">
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoadingProducts;
