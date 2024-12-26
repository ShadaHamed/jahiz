'use client';

import { Branch } from '@/utils/types';
import { useGlobal } from '@/app/branches/Context';
import { FaFilter } from 'react-icons/fa';

type FilterBoxProps = {
  data: Branch[];
};

const FilterBox: React.FC<FilterBoxProps> = ({ data }) => {
  const { selectedLocation, setSelectedLocation,filteredBranches, setFilteredBranches, uniqueLocations } = useGlobal();

  // Handle filter changes
  const handleFilter = (location: string) => {
    setSelectedLocation(location);
    const filtered = data.filter((branch) => {
      const matchesLocation = location ? branch.location === location : true;
      return matchesLocation;
    });
    setFilteredBranches(filtered);
  };

  return (
    <div className="relative flex items-center space-x-4 border-0">
      {/* Icon visible only on small screens */}
      <div className='relative flex flex-row items-center justify-center mr-6 xl:hidden'>
        <FaFilter size={40} className='z-10 text-white border rounded-md p-2 bg-primaryColor'/>
      {/* Dropdown (hidden by default on small screens, visible when icon is clicked) */}
      { (
        <select
          name="filter"
          className="absolute left-4 z-0 w-full px-4 py-3 border-0 rounded text-sm text-gray-800 focus:outline-none lg:focus:shadow-md"
          value={selectedLocation}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      )}
      </div>

      {/* Dropdown always visible on larger screens */}
      <select
        name="filter"
        className="hidden xl:block w-96 px-4 py-3 border-0 rounded text-sm bg-gray-100 text-gray-800 focus:outline-none focus:shadow-md"
        value={selectedLocation}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="">All Locations</option>
        {uniqueLocations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBox;
