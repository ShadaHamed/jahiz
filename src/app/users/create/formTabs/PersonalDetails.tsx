import React from 'react'
// import { UserWithoutId } from '../page';
import { User } from '@/utils/types';
import { UseFormRegister, FieldErrors, FieldValues, UseFormSetError , UseFormClearErrors  } from "react-hook-form";

type userPersonalDetails = Omit<User, 'id' | 'password' | 'password_confirmation' | 'role'>;

interface PersonalDetailsProps<T extends FieldValues> {
  formData: userPersonalDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<T>;  
  errors: FieldErrors<T>;        
  setError: UseFormSetError <T>;         
  clearErrors: UseFormClearErrors<T>;
}

const PersonalDetails: React.FC<PersonalDetailsProps<User>>= ({ register,errors, setError, clearErrors, formData, handleChange }) => {
  
  return (
    <div className='flex flex-col'>
       <div className='w-full mx-2 flex-1'>
         <div className='font-bold h-6 mt-1 text-gray-500 text-xs leading-8'>
          Name in English
         </div>
         <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            type='text'
            {...register("name.en", { 
              required: "Name in English is required" ,
              pattern: {
                value: /^[a-zA-Z\s-]+$/,
                message: "Name in English must contain only English letters"
              }
            })}
            placeholder='Your Name in English'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-xs'
            onChange={(e) => 
              {handleChange(e);
              clearErrors("name.en");}
            } 
            />
         </div>
         {errors.name?.en && <p className="text-red-500 text-sm">{errors.name.en?.message}</p>}
       </div>

       <div className='w-full mx-2 flex-1'>
         <div className='font-bold h-6 mt-1 text-gray-500 text-xs leading-8'>
          Name in Arabic
         </div>
         <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
          type='text'
             {...register("name.ar", { 
              required: "Name in Arabic is required" ,
              pattern: {
                value: /^[\u0621-\u064A\u0617-\u061A\u064B-\u0652\s]+$/,
                message: "Name in Arabic must contain only Arabic letters"
              }
            })}
            placeholder='Your Name in Arabic'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-xs'
            onChange={(e) => 
              {handleChange(e);
              clearErrors("name.ar");}
            }  
            />
         </div>
         {errors.name?.ar && <p className="text-red-500 text-sm">{errors.name.ar?.message}</p>}
       </div>

       <div className='w-full mx-2 flex-1'>
         <div className='font-bold h-6 mt-1 text-gray-500 text-xs leading-8 '>
          Email
         </div>
         <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            type='email'
            {...register("email", { 
              required: "Email is required", 
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
                message: "Email should contain an '@' symbol and a domain name (e.g., example@domain.com)", 
              }
            })}
            placeholder='example @gmail.com'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-xs'
            onChange={(e) => 
              {handleChange(e);
              clearErrors("email");}
            }  
            />
         </div>
         {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
       </div>
      
       <div className='w-full mx-2 flex-1'>
         <div className='font-bold h-6 mt-1 text-gray-500 text-xs leading-8 '>
          Phone Number
         </div>
         <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            type='text'
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
            placeholder='Phone Number'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-xs'
            onChange={(e) => 
              {handleChange(e);
              clearErrors("phone_number");}
            }  

            />
         </div>
         {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number?.message}</p>}
       </div>

       <div className='w-full mx-2 flex-1'>
         <div className='font-bold h-6 mt-1 text-gray-500 text-xs leading-8 '>
          Address
         </div>
         <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            type='text'
            {...register ("address", {required: "Address is requied"})}
            placeholder='Address'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-xs'
            onChange={(e) => 
              {handleChange(e);
              clearErrors("address");}
            }  
            />
         </div>
         {errors.address && <p className="text-red-500 text-sm">{errors.address?.message}</p>}
       </div>
      </div>
   
  )
}

export default PersonalDetails