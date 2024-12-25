'use client'
import branchRepository from '@/apiCalls/branchRepository';
import cityRepository from '@/apiCalls/cityRepository';
import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Category, Field } from '@/utils/types'
import { toast } from 'react-toastify';
import categoryRepository from '@/apiCalls/categoriesRepository';

const CreateCategory = () => {
  const [categories, setCategories] = useState<Category[]>()
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


// Handle form submission
const handleSubmit = (data: {category_Name: string; category_Image: File}) => {
  console.log('data will be added')
  // try {

  //   const formData = new FormData();
  //   formData.append('category_Name', data.category_Name);
  //   formData.append('category_Image', data.category_Image);

  //   categoryRepository.createCategory(formData);
  //   console.log(formData.values)
  //   toast.success('Category created successfully!');
  //   router.refresh();
  //   router.push('/categories'); // Redirect to branches page
  // } catch (error) {
  //   toast.error('Failed to create category. Please try again.');
  // }
};

  return (
    <div className="p-8 h-[100vh] items-center justify-center max-h-lg mx-auto">
      <ReusableForm
        fields={categoryFormFields}
        heading = "Add New Category"
        initialValues={{ category_Name: ''}}
        onSubmit={handleSubmit}
        submitButtonLabel="ADD"
        backNavigation = "/categories"
      />
    </div>
  )
}

export default CreateCategory