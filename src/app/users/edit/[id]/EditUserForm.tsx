'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '@/components/ReusableForm';
import { Role, User } from '@/utils/types';
import userRepository from '@/apiCalls/userRepository';
import { userFormFields } from '@/utils/formFields';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import roleRepository from '@/apiCalls/roleRepository';

type UserFormValues = Omit<User, 'id'>;

interface EditCustomerFormProps {
  id: string;
  initialValues: UserFormValues;
}

const EditCustomerForm: React.FC<EditCustomerFormProps> = ({id, initialValues}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, watch ,setValue} = useForm<UserFormValues>({
    mode: 'onSubmit', // Validation will trigger only after form submit;
    defaultValues: initialValues,
  })
  const password = watch("password");

const [showPassword, setShowPassword] = useState(false);
const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword((prevState) => !prevState);
}; 
const toggleConfirmedPasswordVisibility = () => {
  setShowConfirmedPassword((prevState) => !prevState);
}; 

useEffect(() => {
  const fetchRoles = async () => {
    try {
      const data = await roleRepository.getAllRoles();
      setRoles(data); // Update roles state with the fetched data
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  fetchRoles();

}, []);

  const handleEditSubmit = async (data: UserFormValues) => {
    try {
      await userRepository.updateUser(id, data);
      toast.success('user Information updated successfully!');
      router.push('/users'); 
    } catch (error) {
      console.error('Error updating customer information:', error);
      toast.error('Failed to update data. Please try again.');
    }
  };

  const handleChange = (field: keyof UserFormValues, value: string) => {
    setValue(field, value); // Dynamically update field value
  };
  

  return (
  //   <ReusableForm<User>
  //   fields= {userFormFields}
  //   initialValues={initialValues}
  //   onSubmit={handleEditSubmit}
  //   submitButtonLabel="Save Changes"
  // />
  <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-semibold bg-primaryColor text-white p-4 mb-6 rounded-t-xl">Edit User Information</h1>
                <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name (English)</label>
                        <input
                            type="text"
                            className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                            {...register("name.en", { 
                              required: "Name in English is required" ,
                              pattern: {
                                value: /^[a-zA-Z\s-]+$/,
                                message: "Name in English must contain only English letters"
                              }
                            })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name (Arabic)</label>
                        <input
                            type="text"
                            className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                            {...register("name.ar", { 
                              required: "Name in Arabic is required" ,
                              pattern: {
                                value: /^[\u0621-\u064A\u0617-\u061A\u064B-\u0652\s]+$/,
                                message: "Name in Arabic must contain only Arabic letters"
                              }
                            })}
                        />
                    </div>
                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                            {...register("phone_number", {
                              required: "Phone number is required",
                              pattern: {
                                value: /^\+?[0-9]*$/,
                                message: "Phone must contain only numbers",
                              },
                              minLength: {
                                value: 10,
                                message: "Phone number must be at least 10 digits",
                              },
                              maxLength: {
                                value: 15,
                                message: "Phone number cannot exceed 15 digits",
                              },
                            })}
                        />
                    </div>
                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                            {...register ("address", {required: "Address is requied"})}
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                            {...register("email", { 
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation pattern
                                message: "Email should contain an '@' symbol and a domain name (e.g., example@domain.com)", 
                              }
                            })}
                        />
                    </div>
                    {/* Password */}
                    <div className='relative'>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                            {...register("password", {
                              required: "Password is required", // Password is required
                              minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long",
                              },
                              // maxLength: {
                              //   value: 20,
                              //   message: "Password cannot exceed 20 characters",
                              // },
                              // pattern: {
                              //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, // Strong password pattern
                              //   message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
                              // },
                            })}
                        />
                            {/* Show/Hide Password Icon */}
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-2 top-5 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                            tabIndex={0}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            ></path>
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            ></path>
                          </svg>
                          )}
                        </button>
                    </div>
                    <div className='relative'>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            id='password_confirmation'
                            type={showConfirmedPassword ? 'text' : 'password'}
                            className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                            {...register("password_confirmation", {
                              required: "Please confirm your password",
                              validate: value => value === password || "Passwords do not match", // Custom validation to check if passwords match
                            })}
                        />
                           {/* Show/Hide Password Icon */}
                           <button
                          type="button"
                          onClick={toggleConfirmedPasswordVisibility}
                          className="absolute right-2 top-5 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                            tabIndex={0}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            ></path>
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            ></path>
                          </svg>
                          )}
                        </button>
                    </div>
                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                                  <select
                      {...register("role", {
                        required: "You should select a role", 
                      })}
                      className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                      defaultValue=""
                      onChange={() => 
                        {
                        clearErrors("role");}
                      } 
                    >
                      <option value="" disabled>
                        Select a role
                      </option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end gap-2">
                      <button 
                        type='button'
                        onClick={() => router.push('/users')}
                        className='px-4 py-2 w-full md:w-[90px] bg-white text-gray-600 text-xs uppercase rounded-md font-medium cursor-pointer border-2 border-slate-300 hover:bg-gray-200 hover:text-gray-500 transition duration-200 ease-in-out'>
                        Cancel
                      </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primaryColor text-white rounded-md shadow hover:bg-primaryColor_2focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default EditCustomerForm