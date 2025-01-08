import React from 'react'

function MainSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden">
    {/* Header Skeleton */}
    <div className="w-full fix p-6 items-center justify-center md:justify-start">
      <div className="h-8 bg-gray-200 rounded w-32 mx-auto lg:mx-0 mb-6"></div>

      {/* Search and Buttons Skeleton */}
      <div className="flex lg:justify-between items-center my-8">
        <div className="flex items-center justify-center gap-2">
          <div className="h-10 w-48 bg-gray-200 rounded"></div>
          <div className="h-10 w-40 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-between gap-1">
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="overflow-x-auto border h-[60vh] rounded-lg">
       
      </div>
    </div>
  </div>
  )
}

export default MainSkeleton