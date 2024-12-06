'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSearchText(new URLSearchParams(window.location.search).get('query') || '');
  }, []);

  const handleClick = () => {
    setInputVisible(!isInputVisible); // Toggle input visibility on small screens
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const currentUrl = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    if (searchText.trim() === '') {
      // Clear query parameter
      params.delete('query');
    } else {
      // Add or update query parameter
      params.set('query', encodeURIComponent(searchText));
    }

    // Update the URL
    router.push(`${currentUrl}?${params.toString()}`);
  };

  return (
    <div className="relative">
      {/* Mobile Search Icon */}
      <div 
        className="block md:hidden text-gray-900 cursor-pointer"
        onClick={handleClick}
      >
        <FaSearch size={20} />
      </div>

      {/* Mobile Input Box */}
      {isInputVisible && (
        <div className="md:hidden absolute mb-3 w-96 z-10 shadow-lg p-2 rounded-md">
          <form className="relative w-full bg-none" onSubmit={formSubmitHandler}>
            <input
              type="text"
              className="block w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md pl-10 focus:outline-none focus:shadow-md"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
              <FaSearch size={18} />
            </div>
          </form>
        </div>
      )}

      {/* Desktop Search Box */}
      <form
        className="hidden md:flex justify-between items-center w-96"
        onSubmit={formSubmitHandler}
      >
        <div className="relative w-full">
          <input
            type="text"
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md pl-10 focus:outline-none focus:shadow-md"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
            <FaSearch size={18} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
