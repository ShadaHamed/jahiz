"use client";

import { useRouter } from 'next/navigation';
import { MdOutlineMail } from "react-icons/md";
import { BiLockOpenAlt } from "react-icons/bi";
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthContext';
import { AxiosError } from 'axios';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth();

    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<LoginFormInputs>({
      mode: 'onSubmit', // Validation will trigger only after form submit;
    })

    const onSubmit = async (data: LoginFormInputs) => {
        
        try {
          clearErrors(); // Clear errors before submission

          //stimulate API request
          await login(data.email, data.password);

          router.replace('/');
          router.refresh();
          
        } catch (err) {
          const error = err as AxiosError<{
            errors?: { field: keyof LoginFormInputs; message: string }[];
            message?: string;
          }>;
          
          const apiErrors = (error as any)?.response?.data?.errors;

          if (apiErrors && Array.isArray(apiErrors)) {
            apiErrors.forEach((apiError: { field: keyof LoginFormInputs; message: string }) => {
                setError(apiError.field, {
                    type: 'server',
                    message: apiError.message,
                });
            });
        } else {
          setError("email", {
            type: 'server',
            message: error.response?.data?.message || "An unexpected error occurred",
          });
        }
        }
        
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className='mb-4'>
        <label className='block text-xs'>
        <span className="font-semibold">Email</span> 
        <div className="relative flex items-center mt-2">
          <span className="absolute left-3 text-gray-500">
            <MdOutlineMail size={18} />
          </span>        
        <input 
          type="email" 
          placeholder= "example @gmail.com"
          {...register("email", { 
            required: "Email is required" 
          })}
          className={`form-input appearance-none border rounded w-full ps-8 py-2 bg-gray-100 placeholder-gray-500 text-xs  text-drakColor focus:outline-none focus:ring-1 focus:ring-primaryColor
             ${errors.email ? 'border-red-500' : ''}`}

        />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </label>
      </div>
      <div className='mb-4'>
        <label className=' block text-xs mb-2'>
        <span className="font-semibold">Password</span> 
        <div className='relative flex items-center mt-2'>
        <span className="absolute left-3 text-gray-500">
          <BiLockOpenAlt size={18} />
        </span>
        <input 
        type="password" 
        placeholder="Password" 
        {...register("password", {
          required: "Password is required", 
          minLength: {
            value: 6,  // Minimum password length
            message: "Password must be at least 6 characters long",
          }
        }

        )}
        className={`form-input appearance-none border rounded w-full ps-8 py-2 bg-gray-100 placeholder-gray-500 text-xs  text-drakColor focus:outline-none focus:ring-1 focus:ring-primaryColor 
          ${errors.password ? 'border-red-500' : ''}`}

        />
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </label>
      </div>
      <div className='flex flex-col md:flex-row space-y-2 md:items-center md:justify-between mb-4'>
        <label className='inline-flex items-center'>
          <input
           type="checkbox"
           className='form-checkbox h-3 w-3 text-purple-600'
           />
           <span className='ml-1 text-gray-700 text-xs font-semibold'>Remember me</span>
        </label>
        <a href="#" className='text-xs text-purple-600 hover:text-purple-800 font-semibold'>
          Forget Password
        </a>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primaryColor mt-2 py-2 px-4 rounded font-bold hover:bg-primaryColor_2"
        >
              Login
          </button>
      </form>
  )
}

export default LoginForm