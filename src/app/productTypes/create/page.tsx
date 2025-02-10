'use client'

import categoryRepository from '@/apiCalls/categoriesRepository';
import productTypeRepository from '@/apiCalls/productTypesRepository';
import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Category, ProductType} from '@/utils/types';
import { Field } from '@/utils/types'
import { toast } from 'react-toastify';
import { useProductTypeGlobal } from '../productTypeContext';

const CreateProductTypeForm = () => {
  const [categories, setCategories] = useState<Category[]>()
  const [localLoading, setLocalLoading] = useState(false)
  const router = useRouter();
  const { refrechProductTypes} = useProductTypeGlobal();

  //fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await categoryRepository.getAllCategories();
        setCategories(categoryData);
        
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } 
    };
  
    fetchCategory();
  }, []);

 // Define form fields
  const productTypeFormFields: Field[] = [
  {
    name: 'name',
    label: 'Product Type Name',
    type: 'text',
    placeholder: 'Enter the name of product type',
    validation: { 
      required: 'The name for product type is required', 
      pattern: {
        value: /^[a-zA-Z\s-]+$/,
        message: "Name must contain only English letters"
      } },
  },
  {
    name: 'categoryID',
    label: 'Category Name',
    type: 'select',
    options: categories?.map((category) => ({ label: category.category_Name, value: category.id })) || [],
    validation: { required: 'Category is required' },
  },
  
];


const generateId = () => Math.floor(Math.random() * 10_000_000);

// Handle form submission
const handleSubmit = async(data: {name: string; categoryID: string}) => {
    setLocalLoading(true)
    try {

    const newProductType = {
      id: generateId(),
      name: data.name,
      categoryID: data.categoryID
    };

    await productTypeRepository.createProductType(newProductType);
    toast.success('Product Type created successfully!');
    await refrechProductTypes();
    router.refresh();
    router.push('/productTypes');
    await refrechProductTypes();

  } catch (error) {
    toast.error('Failed to create product type. Please try again.');
  }
  finally {
    setLocalLoading(false)
  }
};

  return (
    <div className="p-8 h-[100vh] items-center justify-center max-h-lg mx-auto">
      <ReusableForm
        fields={productTypeFormFields}
        heading = "Add New Product Type"
        initialValues={{ name: '', categoryID: ''}}
        onSubmit={handleSubmit}
        submitButtonLabel="ADD"
        backNavigation = "/productTypes"
        loading={localLoading}
      />
    </div>
  )
}

export default CreateProductTypeForm