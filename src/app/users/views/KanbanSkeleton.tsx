import React from 'react'

function KanbanSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
                
            <div
            key={index}
            className="w-full max-w-xs bg-gray-200 border border-gray-300 rounded-lg shadow-lg animate-pulse"
            >
            <div className="h-4 bg-gray-300 rounded mt-4 mx-4 w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded mt-2 mx-4 w-1/2"></div>
            <div className="h-14 bg-gray-300 rounded mx-4 mt-4"></div>
            <div className="h-4 bg-gray-300 rounded mt-4 mx-4 w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded mt-2 mx-4 w-1/2 mb-4"></div>
            
            </div>
        ))}
    </div>
  )
}

export default KanbanSkeleton