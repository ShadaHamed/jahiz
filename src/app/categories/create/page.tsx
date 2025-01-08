'use client'

import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {  Field } from '@/utils/types'
import { toast } from 'react-toastify';
import categoryRepository from '@/apiCalls/categoriesRepository';
import { useCategoryContext } from '../categoryContext';

const CreateCategory = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const {loading, setLoading} = useCategoryContext();
  const [localLoading, setLocalLoading] = useState(false);
  const router = useRouter();

  
 // Define form fields
  const categoryFormFields: Field[] = [
  {
    name: 'category_Name',
    label: 'Category Name',
    type: 'text',
    placeholder: 'Enter category name',
    validation: { 
      required: 'Category name is required', 
      pattern: {
        value: /^[a-zA-Z\s-]+$/,
        message: "Name must contain only English letters"
      } },
  },
  {
    name: 'category_Image',
    label: 'Category Image',
    type: 'file', // Field for file upload
    placeholder: 'Upload category image',
    validation: {
      required: 'Category image is required',
    },
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    validation: { required: 'status is required' },

  },
  // {
  //   name: 'arabic_branch_Name',
  //   label: 'Branch Name (in Arabic)',
  //   type: 'text',
  //   placeholder: 'Enter branch name in Arabic',
  //   validation: { 
  //     required: 'Arabic Branch name is required',
  //     pattern: {
  //       value: /^[\u0621-\u064A\u0617-\u061A\u064B-\u0652\s]+$/,
  //       message: "Name in Arabic must contain only Arabic letters"
  //     } },
  // },
  
];
useEffect (() => {
  setLoading(false);
  setLocalLoading(false);
  console.log('loading: ', loading)
}, [])

// Handle form submission
  const handleSubmit = async (data: {category_Name: string; category_Image: File, status: string}) => {
    setLocalLoading(true)
    try {
      const formData = new FormData();
      formData.append('category_Name', data.category_Name);
      formData.append('status', data.status);

      // Ensure the image is appended correctly
      if (data.category_Image) {
        formData.append('category_Image', data.category_Image);
      } else {
        console.error('category_Image is missing');
      }

      
      // Call the API function to create the category
      const createdCategory = await categoryRepository.createCategory(formData);

      toast.success('Category created successfully');
      router.push('/categories'); // Adjust the redirect as needed
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create category.');
    }
    finally{
      setLocalLoading(false)
    }
  };


  return (
    <div className="p-8 h-[100vh] items-center justify-center max-h-lg mx-auto">
      <ReusableForm
        fields={categoryFormFields}
        heading = "Add New Category"
        initialValues={{category_Name: '', status: 'active', category_Image:undefined}}
        onSubmit={handleSubmit}
        submitButtonLabel="ADD"
        backNavigation = "/categories"
        imagePreview = {imageBase64}
        setImagePreview={setImageBase64}
        loading={localLoading}
      />
    </div>
  )
}

export default CreateCategory