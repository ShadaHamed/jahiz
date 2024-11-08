import React from 'react'

const SearchBox = () => {
  return (
    <>
      <nav className="flex justify-between items-center">
        <div className="flex-grow">
          <input
            type="text"
            className="w-3/4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center"></div>
      </nav>
    </>
  )
}

export default SearchBox