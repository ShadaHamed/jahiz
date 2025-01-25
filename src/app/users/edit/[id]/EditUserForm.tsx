'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Role, User } from '@/utils/types';
import userRepository from '@/apiCalls/userRepository';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import roleRepository from '@/apiCalls/roleRepository';
import { useGlobal } from '../../userContext';

type UserFormValues = Omit<User, 'id'>;

interface EditCustomerFormProps {
  id: string;
  initialValues: UserFormValues;
}

const EditCustomerForm: React.FC<EditCustomerFormProps> = ({ id, initialValues }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, watch, setValue } = useForm<UserFormValues>({
    mode: 'onSubmit', // Validation will trigger only after form submit;
    defaultValues: initialValues,
  })
  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const { loading, setLoading } = useGlobal();
  const [localLoading, setLocalLoading] = useState(false);

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
    setLoading(true)
    setLocalLoading(true)
    try {
      await userRepository.updateUser(id, data);
      toast.success('user data updated successfully!');
      router.push('/users');
    } catch (error) {
      console.error('Error updating customer information:', error);
      toast.error('Failed to update data. Please try again.');
    } finally {
      setLoading(false)
      setLocalLoading(false)
    }
  };

  const handleChange = (field: keyof UserFormValues, value: string) => {
    setValue(field, value); // Dynamically update field value
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl md:max-w-2xl lg:max-w-4xl rounded-lg shadow-md p-4 sm:p-8">
        <h1 className="text-2xl font-semibold bg-primaryColor text-white p-4 mb-6 rounded-t-xl">Edit User Information</h1>
        <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4 sm:space-y-6">
          {/* <div className="grid grid-cols-full sm:grid-cols-2 gap-4"> */}
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name (English)</label>
              <input
                type="text"
                className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                {...register("name.en", {
                  required: "Name in English is required",
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
                  required: "Name in Arabic is required",
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
                {...register("address", { required: "Address is requied" })}
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

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                {...register("role", {
                  required: "You should select a role",
                })}
                className="mt-1 p-2 bg-gray-100 block w-full focus:shadow-sm focus:border focus:border-primaryColor appearance-none sm:text-sm"
                defaultValue=""
                onChange={() => {
                  clearErrors("role");
                }
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
          <div className="flex flex-col md:flex-row justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push('/users')}
              className="px-4 py-2 bg-white text-gray-600 text-xs uppercase rounded-md font-medium border-2 border-slate-300 hover:bg-gray-200 hover:text-gray-500 transition duration-200 ease-in-out">
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center items-center px-4 py-2 w-full md:w-auto bg-primaryColor text-white rounded-md shadow hover:bg-primaryColor_2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {localLoading ? (
                <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                  {/* Spinner */}
                </svg>
              ) : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditCustomerForm