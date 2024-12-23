'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '@/components/ReusableForm';
import { Branch, City, Field } from '@/utils/types';
import branchRepository from '@/apiCalls/branchRepository';
import cityRepository from '@/apiCalls/cityRepository';
import { BranchFormValues } from '@/utils/types';
import { toast } from 'react-toastify';

interface EditBranchFormProps {
  id: string;
  initialValues: BranchFormValues;
}

const EditBranchForm: React.FC<EditBranchFormProps> = ({id, initialValues}) => {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>()
  console.log('initialValues', initialValues)
  
  const handleEditSubmit = async (data: BranchFormValues) => {
    console.log('data after update', data)
    try {
      const updatedBranch: Omit<Branch, 'id'> = {
        ... data,
        branch_Name: {
          en: data.english_branch_Name,
          ar: data.arabic_branch_Name,
        },
      }
      await branchRepository.updateBranch(id, updatedBranch);
      toast.success('Branch updated successfully!');
      router.push('/branches'); // Redirect to branches list
    } catch (error) {
      toast.error('Failed to update branch. Please try again.');
    }
  };
  const branchFormFields: Field[] = [
    {
      name: 'english_branch_Name',
      label: 'Branch Name (in English)',
      type: 'text',
      placeholder: 'Enter branch name in English',
      validation: { 
        required: 'English Branch name is required', 
        pattern: {
          value: /^[a-zA-Z\s-]+$/,
          message: "Name in English must contain only English letters"
        } },
    },
    {
      name: 'arabic_branch_Name',
      label: 'Branch Name (in Arabic)',
      type: 'text',
      placeholder: 'Enter branch name in Arabic',
      validation: { 
        required: 'Arabic Branch name is required',
        pattern: {
          value: /^[\u0621-\u064A\u0617-\u061A\u064B-\u0652\s]+$/,
          message: "Name in Arabic must contain only Arabic letters"
        } },
    },
    {
      name: 'location',
      label: 'Location',
      type: 'select',
      options: cities?.map((city) => ({ label: city.name, value: city.name })) || [],
      validation: { required: 'Location is required' },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      validation: { required: 'Location is required' },
  
    },
  ];
  
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const cityData = await cityRepository.getAllCities();
        setCities(cityData);
        
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } 
    };
  
    fetchCity();
  }, []); 

  return (
    <ReusableForm<BranchFormValues>
    fields={branchFormFields}
    heading = "Edit Branch"
    initialValues={initialValues}
    onSubmit={handleEditSubmit}
    submitButtonLabel="Save Changes"
    backNavigation = "/branches"
  />
  )
}

export default EditBranchForm