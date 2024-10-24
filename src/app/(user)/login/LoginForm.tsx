"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineMail } from "react-icons/md";
import { BiLockOpenAlt } from "react-icons/bi";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<LoginFormInputs>({
      mode: 'onSubmit', // Validation will trigger only after form submit;
    })

    const onSubmit = async (data: LoginFormInputs) => {
        
        try {
          clearErrors(); // Clear errors before submission
          setLoading(true);

          //stimulate API request
          // await axios.post(`${DOMAIN}/api/login`, { email, password });

          router.replace('/');
          toast.success("Login successful");
          setLoading(false);
          router.refresh();
        } catch (error:any) {
          const apiErrors = error?.response?.data?.errors;

          if (apiErrors && Array.isArray(apiErrors)) {
            apiErrors.forEach((apiError: { field: keyof LoginFormInputs; message: string }) => {
                setError(apiError.field, {
                    type: 'server',
                    message: apiError.message,
                });
            });
        } else {
          toast.error(error?.response?.data.message);
        }
            setLoading(false);
        }
        
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className='mb-4'>
        <label className='block text-sm mb-2'>
        <span className="font-semibold ">Email</span> 
        <div className="relative flex items-center">
          <span className="absolute left-3 text-secondaryColor">
            <MdOutlineMail size={20}/>
          </span>        
        <input 
          type="email" 
          placeholder= "example @gmail.com"
          {...register("email", { 
            required: "Email is required" 
          })}
          className={`form-input shadow appearance-none border rounded w-full ps-8 py-2 placeholder-secondaryColor text-drakColor focus:outline-none focus:ring-2 focus:ring-primaryColor
             ${errors.email ? 'border-red-500' : ''}`}

        />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </label>
      </div>
      <div className='mb-4'>
        <label className=' block text-sm mb-2'>
        <span className="font-semibold">Password</span> 
        <div className='relative flex items-center'>
        <span className="absolute left-3 text-secondaryColor">
          <BiLockOpenAlt size={20} />
        </span>
        <input 
        type="password" 
        placeholder="Password" 
        {...register("password", {
          minLength: {
            value: 6,  // Minimum password length
            message: "Password must be at least 6 characters long"
          }
        }

        )}
        className={`form-input shadow appearance-none border rounded w-full ps-8 py-2 placeholder-secondaryColor text-drakColor focus:outline-none focus:ring-2 focus:ring-primaryColor 
          ${errors.password ? 'border-red-500' : ''}`}

        />
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </label>
      </div>
      <div className='flex items-center justify-between mb-4'>
        <label className='inline-flex items-center'>
          <input
           type="checkbox"
           className='form-checkbox h-4 w-4 text-purple-600'
           />
           <span className='ml-2 text-gray-700'>Remember me</span>
        </label>
        <a href="#" className='text-sm text-purple-600 hover:text-purple-800'>
          Forget Password
        </a>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="w-full text-white bg-primaryColor py-2 px-4 rounded font-bold hover:bg-primaryColor_2">
              Login
          </button>
      </form>
  )
}

export default LoginForm