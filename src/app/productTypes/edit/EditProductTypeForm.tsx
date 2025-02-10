'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '@/components/ReusableForm';
import { Category, ProductTypeFormValues, Field, ProductType } from '@/utils/types';
import categoryRepository from '@/apiCalls/categoriesRepository';
import { toast } from 'react-toastify';
import productTypeRepository from '@/apiCalls/productTypesRepository';

interface EditProductTypeFormProps {
  id: string;
  initialValues: ProductTypeFormValues;
}

const EditProductTypeForm: React.FC<EditProductTypeFormProps> = ({id, initialValues}) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>()
  const [localLoading, setLocalLoading] =useState(false)

    // Fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const categories = await categoryRepository.getAllCategories(); 
            setCategories(categories);
    
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();  
      }, []); 

  const handleEditSubmit = async (data: ProductTypeFormValues) => {
    setLocalLoading(true)
    try {
      const updatedProductTypes: Omit<ProductType, 'id'> = {
        ... data,
        name: data.name,
        categoryID: data.categoryID,
      }
      await productTypeRepository.updateProductType(id, updatedProductTypes);
      toast.success('Product type updated successfully!');
      router.push('/productTypes'); // Redirect to branches list
    } catch (error) {
      toast.error('Failed to update product type. Please try again.');
    } finally {
      setLocalLoading(false)
    }
  };
  const productTypeFormFields: Field[] = [
    {
      name: 'name',
      label: 'Product Type Name',
      type: 'text',
      placeholder: 'Enter product type  name in English',
      validation: { 
        required: 'Product type  name is required', 
        pattern: {
          value: /^[a-zA-Z\s-]+$/,
          message: "Product type  name must contain only English letters"
        } },
    },
    {
      name: 'categoryID',
      label: 'Category',
      type: 'select',
      options: categories?.map((category) => ({ label: category.category_Name, value: category.id})) || [],
      validation: { required: 'Category is required' },
    },
  ]; 

  return (
    <ReusableForm<ProductTypeFormValues>
    fields={productTypeFormFields}
    heading = "Edit Product Type"
    initialValues={initialValues}
    onSubmit={handleEditSubmit}
    submitButtonLabel="Save"
    backNavigation = "/productTypes"
    loading = {localLoading}
  />
  )
}

export default EditProductTypeForm