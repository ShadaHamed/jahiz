'use client'

import { useRef, useState, useEffect } from 'react';
import userRepository from '@/apiCalls/userRepository';
import ExportPDF from '@/components/table/ExportPDF';
import { useGlobal } from '../userContext';
import { FaAddressCard, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import Pagination from '@/components/table/pagination';
import { useRouter } from 'next/navigation';

type UserKanbanViewProps = {
  onDelete: (id: string) => void;
};

const UserKanbanView: React.FC<UserKanbanViewProps> = ({ onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const { kanbanProcessedUsers, k_pages, pageNumber, loading, refrechUsers } = useGlobal();
  const router = useRouter();

  // useEffect(() => {
  //   // Simulate loading for demo purposes
  //   const timer = setTimeout(() => setLoading(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  const preprocessedUsers = kanbanProcessedUsers.map((user) => {
    const fullName = user.name;
    const match = fullName.match(/^(.*?)\s\((.*?)\)$/);
    return {
      ...user,
      nameEn: match ? match[1] : fullName,
      nameAr: match ? match[2] : '',
    };
  });

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
        await userRepository.deleteUser(id); // Call the API to delete the user
        toast.success('User deleted successfully!');

        const currentUrl = window.location.pathname;
        const params = new URLSearchParams(window.location.search);

        // Check if it's the last item on the last page
        if (k_pages === pageNumber && kanbanProcessedUsers.length === 1) {
          if (pageNumber > 1) {
            params.set('pageNumber', (pageNumber - 1).toString()); // Update to the previous page
          }
          // Update the URL without reloading the page
          router.push(`${currentUrl}?${params.toString()}`);
          await refrechUsers();
        } else {
          // Reload the page to reflect the changes
          window.location.reload();
        }
        
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
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
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
            ))
          : preprocessedUsers.map((user, index) => (
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
                  className={`absolute right-3 top-5 z-10 ${dropdownOpen === index ? "block" : "hidden"
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
                    {/* <li className='block w-full text-left px-4 py-2 text-primaryColor hover:bg-light'>
                      <button
                        onClick={() => handleExportPDF(user.id)}
                        className="block w-full text-left px-4 py-2 text-primaryColor hover:bg-light"
                      >
                        Export as PDF
                      </button>
                      <ExportPDF contentRef={contentRef} />
                    </li> */}
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
                    <p className="italic text-sm font-medium text-darkColor mb-2">{user.role}</p>
                    <ul className="text-darkColor text-xs space-y-1">
                      <li className="flex items-center gap-2">
                        <MdOutlineMailOutline className="text-primaryColor_2" />
                        <span
                          className="truncate md:max-w-[100px] sm:max-w-[400px] xl:max-w-[600px]"
                          title={user.email}
                        >
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
      {!loading && <Pagination pageNumber={pageNumber} pages={k_pages} route="/users" />}
    </div>
  );
};

export default UserKanbanView;
