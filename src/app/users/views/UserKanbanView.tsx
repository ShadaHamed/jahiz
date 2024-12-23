'use client';

import { User } from '@/utils/types';
// import userProfileIcon from '../../../public/userProfileIcon.png';
import Image from 'next/image';
import { useRef, useState } from 'react';
import userRepository from '@/apiCalls/userRepository';
import ExportPDF from '@/components/table/ExportPDF';
import { GlobalProvider, useGlobal } from '../userContext'; 
import { FaAddressCard, FaPhoneAlt  } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import Pagination from '@/components/table/pagination';

type UserKanbanViewProps = {
    onDelete: (id: string) => void;
};

const UserKanbanView: React.FC<UserKanbanViewProps> = ({  onDelete }) => {
    const [dropdownOpen, setDropdownOpen] = useState<number | null>();
    const contentRef = useRef<HTMLDivElement>(null);
    const {kanbanProcessedUsers, pages, pageNumber} = useGlobal();

    //Seperate english name from arabic name 
    const preprocessedUsers = kanbanProcessedUsers.map((user) => {
        const fullName = user.name; // Assuming 'name' contains the full name like 'John Doe (جون دو)'
        const match = fullName.match(/^(.*?)\s\((.*?)\)$/);
      
        return {
          ...user,
          nameEn: match ? match[1] : fullName, // Default to fullName if format doesn't match
          nameAr: match ? match[2] : '',       // Default to empty if Arabic name not found
        };
      });

    const handleDelete = async (id: string) => {
        const confirmed = confirm('Are you sure you want to delete this user?');
        if (!confirmed) return;

        try {
            await userRepository.deleteUser(id); // Call the API to delete the user
            toast.success('User deleted successfully!');
            onDelete(id); // Notify the parent component to update the state
        } catch (error) {
            toast.error('Failed to delete user. Please try again.');
        }
    };

    const toggleDropdown = (index: number) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    return (
      <div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {preprocessedUsers.map((user, index) => (
            <div
              key={index}
              className="relative w-full max-w-xs text-darkColor bg-light border border-secondaryColor rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex justify-between px-3 pt-4">
                <h5 className="flex flex-col text-xl font-semibold text-primaryColor">
                    {user.nameEn}{" "}
                    <span className="text-sm text-secondaryColor">({user.nameAr})</span>
                </h5>
                <button
                  id={`dropdownButton-${index}`}
                  onClick={() => toggleDropdown(index)}
                  className="inline-block text-darkColor hover:bg-secondaryColor/50 focus:ring-2 focus:outline-none focus:ring-secondaryColor rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id={`dropdown-${index}`}
                  className={`absolute right-3 top-12 z-10 ${dropdownOpen === index ? "block" : "hidden"
                    } text-sm bg-white border border-secondaryColor rounded-lg shadow-md`}
                >
                  <ul className="py-2">
                    <li>
                      <a
                        href={`/users/edit/${user.id}`}
                        className="block px-4 py-2 text-primaryColor hover:bg-light"
                      >
                        Edit
                      </a>
                    </li>
                    <li className='block w-full text-left px-4 py-2 text-primaryColor hover:bg-light'>
                      {/* <button
                        onClick={() => handleExportPDF(user.id)}
                        className="block w-full text-left px-4 py-2 text-primaryColor hover:bg-light"
                      >
                        Export as PDF
                      </button> */}
                      <ExportPDF contentRef={contentRef} />
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-light"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                    <div className='flex items-center justify-between space-x-11'>

                        
                        {/* <h5 className="flex flex-col text-xl font-semibold text-primaryColor">
                            {user.nameEn}{" "}
                            <span className="text-sm text-secondaryColor">({user.nameAr})</span>
                        </h5> */}
                        
                        
                        {/* <div className="w-16 h-16 bg-gray-200 rounded-full shadow-md flex items-center justify-center"> */}
                            {/* Replace with the actual profile image */}
                            {/* <span className="text-primaryColor_2 font-bold text-lg">P</span>
                        </div>
                        */}
                    </div>
                  <p className="italic text-sm font-medium text-darkColor mb-2">{user.role}</p>
                  <ul className="text-darkColor text-xs space-y-1">
                    <li className="flex items-center gap-2">
                      <MdOutlineMailOutline className="text-primaryColor_2" />
                        <span className="truncate md:max-w-[100px] sm:max-w-[400px] xl:max-w-[600px]" title={user.email}>
                          {user.email}
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaAddressCard className="text-primaryColor_2" />
                      {user.address}
                    </li>
                    <li className="flex items-center gap-2">
                      <FaPhoneAlt className="text-primaryColor_2" />
                      {user.phone_number}
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
          ))}
        </div>
        <Pagination
        pageNumber={pageNumber}
        pages={pages}
        route="/users"
      />
      </div>
    );
};

export default UserKanbanView;
