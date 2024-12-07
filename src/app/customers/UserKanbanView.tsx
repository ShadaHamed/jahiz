'use client';

import { User } from '@/utils/types';
// import userProfileIcon from '../../../public/userProfileIcon.png';
import Image from 'next/image';
import { useRef, useState } from 'react';
import userRepository from '@/apiCalls/userRepository';
import ExportPDF from '@/components/table/ExportPDF';
import { GlobalProvider } from '../branches/Context';
import { FaAddressCard, FaPhoneAlt  } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

type UserKanbanViewProps = {
    users: User[];
    onDelete: (id: string) => void;
};

const UserKanbanView: React.FC<UserKanbanViewProps> = ({ users, onDelete }) => {
    const [dropdownOpen, setDropdownOpen] = useState<number | null>();
    const contentRef = useRef<HTMLDivElement>(null);

    const handleDelete = async (id: string) => {
        const confirmed = confirm('Are you sure you want to delete this user?');
        if (!confirmed) return;

        try {
            await userRepository.deleteUser(id); // Call the API to delete the user
            alert('User deleted successfully!');
            onDelete(id); // Notify the parent component to update the state
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        }
    };

    const toggleDropdown = (index: number) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
        console.log('dropdownOpen opend for index', index)
    };

    return (
        <div className="grid sm:grid-col-2 md:grid-cols-4 gap-4 p-3">
            {users.map((user, index) => (
                <div
                    key={index}
                    className="relative w-full max-w-xs text-primaryColor bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                    <div className="flex justify-end px-3 pt-4 text-primaryColor">
                        <button
                            id={`dropdownButton-${index}`}
                            onClick={() => toggleDropdown(index)}
                            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
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
                            className={`absolute z-10 ${dropdownOpen === index ? 'block' : 'hidden'
                                } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                        >
                            <ul className="py-2" aria-labelledby={`dropdownButton-${index}`}>
                                <li>
                                    <a
                                        href={`/customers/edit/${user.id}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Edit
                                    </a>
                                </li>
                                <li id='li-export'
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                     <ExportPDF contentRef={contentRef} />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        // href={`/customers/delete/${user.id}`}
                                        onClick={() => handleDelete(user.id)}
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                                    >
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <GlobalProvider>
                        <div className="flex flex-row items-center justify-between p-2" ref={contentRef}>
                            <div>
                                <h5 className="absolute top-3 text-xl font-medium text-primaryColor dark:text-white">
                                    {user.name.en}  <span className="text-sm text-drakColor dark:text-gray-400">
                                       ({user.name.ar})
                                        </span>
                                </h5>
                                <p className='italic text-drakColor text-sm bold mb-2'>{user.role === 2? "Store Manager" : ""}</p>
                                <ul className='text-gray-800 text-xs'>
                                    <li className='flex items-center gap-2'>
                                        <MdOutlineMailOutline />
                                        {user.email}
                                    </li >
                                    <li className='flex items-center gap-2'>
                                        <FaAddressCard />
                                        {user.address}
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <FaPhoneAlt />
                                        {user.phone_number}
                                    </li>
                                </ul>
            
                            </div>
                            <div className='w-1/4'>
                                <Image
                                src="userProfileIcon.png"
                                alt="image profile"
                                className="w-20 h-19 bg-gray-100 rounded-full shadow-lg p-2"
                            />
                            </div>
                        </div>
                    </GlobalProvider>
                </div>
            ))}
        </div>
    );
};

export default UserKanbanView;
