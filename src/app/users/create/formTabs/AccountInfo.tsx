'use client'

import { Role, User } from '@/utils/types';
import { useState } from 'react';
import { UseFormRegister, FieldErrors, FieldValues, UseFormSetError, UseFormClearErrors, UseFormWatch } from "react-hook-form";

type userAccountInfo = Omit<User, 'id' | 'name' | 'email' | 'phone_number' | 'address'>;

interface AccountInfoProps<T extends FieldValues> {
  formData: userAccountInfo;
  roles: Role[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  watch: UseFormWatch<T>;
}

const AccountInfo: React.FC<AccountInfoProps<User>> = ({ register, errors, setError, clearErrors, watch, formData, roles, handleChange }) => {
  // Watch password field to compare it with password_confirmation
  const password = watch("password");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfirmedPasswordVisibility = () => {
    setShowConfirmedPassword((prevState) => !prevState);
  };

  return (
    <div className='flex flex-col'>
      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Password
        </div>
        <div className='relative bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
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
            placeholder='Password'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-xs'
            onChange={ () => {
              // handleChange(e)
              clearErrors("password")
            }}
          />
          {/* Show/Hide Password Icon */}
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-1 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? (
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 select-none cursor-pointer absolute top-1 right-2"
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
          className="h-5 w-5 select-none cursor-pointer absolute top-1 right-2"
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
        {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}
      </div>
      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Password Confirmation
        </div>
        <div className='relative bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            id='password_confirmation'
            type={showConfirmedPassword?'text':'password'}
            {...register("password_confirmation", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match", // Custom validation to check if passwords match
            })}
            name="password_confirmation"
            placeholder='Confirm your password'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-xs'
            onChange={ () => {
              // handleChange(e)
              clearErrors("password_confirmation")
            }}
          />
              {/* Show/Hide Password Icon */}
      <button
        type="button"
        onClick={toggleConfirmedPasswordVisibility}
        className="absolute right-2 top-1 text-gray-500 hover:text-gray-700"
      >
        {showConfirmedPassword ? (
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 select-none cursor-pointer absolute top-1 right-2"
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
          className="h-5 w-5 select-none cursor-pointer absolute top-1 right-2"
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
        {errors.password_confirmation && (<p className="text-red-500 italic">{errors.password_confirmation?.message}</p>)}
      </div>
      <div className="w-full mx-2 flex-1">
  <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
    Select role
  </div>
  <div className="bg-white my-2 p-1 flex border border-gray-200 rounded relative">
    {/* Dropdown with custom arrow */}
    <select
      {...register("role", {
        required: "You should select a role",
      })}
      className="p-1 px-2 appearance-none outline-none w-full text-gray-800 text-xs"
      defaultValue=""
      onChange={() => {
        clearErrors("role");
      }}
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
    {/* Custom dropdown arrow */}
    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
  </div>
  {errors.role && (
    <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
  )}
</div>


    </div>
  )
}

export default AccountInfo