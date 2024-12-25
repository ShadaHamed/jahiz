"use client";
import { useState, Dispatch, SetStateAction, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import categoryRepository from '@/apiCalls/categoriesRepository';
import { Category } from '@/utils/types';

interface UpdateCategoryModalProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    text: string;
    categoryID: string;
    onCategoryUpdated: () => Promise<void>;
}

const UpdateCategoryModal = ({ setOpen, text, categoryID, onCategoryUpdated } : UpdateCategoryModalProps) => {
    const [updatedText, setUpdatedText] = useState(text);
    const router = useRouter();
    
    const formSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if(updatedText === "") return toast.info("Please write something");

        try {
            await categoryRepository.updateCategory(categoryID, { name: updatedText });
            await onCategoryUpdated();
            setUpdatedText("");
            setOpen(false);
        } catch (error:any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }
  
    return (
    <div className='fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center'>
      <div className='w-11/12 lg:w-2/4 bg-white rounded-lg p-3'>
        <div className='flex justify-end items-start mb-5'>
           <IoMdCloseCircleOutline onClick={() => setOpen(false)} className='text-red-500 cursor-pointer text-3xl' />
        </div>
        <form onSubmit={formSubmitHandler}>
            <input 
             type="text" 
             placeholder='Edit Category Name...'
             className='text-xl rounded-lg p-2 w-full bg-white mb-2' 
             value={updatedText}
             onChange={(e) => setUpdatedText(e.target.value)}
            />
            <button type="submit" className='bg-primaryColor w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-primaryColor_2 transition'>
                Edit
            </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateCategoryModal