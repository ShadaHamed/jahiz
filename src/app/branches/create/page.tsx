'use client'
import branchRepository from '@/apiCalls/branchRepository';
import cityRepository from '@/apiCalls/cityRepository';
import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Branch, City } from '@/utils/types';
import { Field } from '@/utils/types'
import { toast } from 'react-toastify';
import { useGlobal } from '../Context';

const BranchForm = () => {
  const [cities, setCities] = useState<City[]>()
  const router = useRouter();
  const {refetchBranches, filteredBranches, setFilteredBranches} = useGlobal();
  const [localLoading, setLocalLoading] = useState(false);
   
 // Define form fields
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
    options: cities?.map((city) => ({ label: city.name.en, value: city.name.en })) || [],
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

// Handle form submission
const handleSubmit = async(data: {english_branch_Name: string; arabic_branch_Name: string; location: string; status: string }) => {
  setLocalLoading(true)
  try {

    const newBranch = {
      branch_Name: {
        en: data.english_branch_Name,
        ar: data.arabic_branch_Name,
      },
      location: data.location,
      status: data.status,
    };

    const createdBranch = await branchRepository.createBranch(newBranch);
    toast.success('Branch created successfully!');
    const updatedBranches = [...filteredBranches, createdBranch];
    setFilteredBranches(updatedBranches) 
    router.refresh();
    await refetchBranches();
    router.push('/branches'); // Redirect to branches page
  
  } catch (error) {
    toast.error('Failed to create branch. Please try again.');
  }
  finally{
    setLocalLoading(false)
  }
};

  return (
    <div className="p-8 h-[100vh] items-center justify-center max-h-lg mx-auto">
      <ReusableForm
        fields={branchFormFields}
        heading = "Add New Branch"
        initialValues={{ english_branch_Name: '',arabic_branch_Name:'', location: '', status: 'active' }}
        onSubmit={handleSubmit}
        submitButtonLabel="ADD"
        backNavigation = "/branches"
        loading= {localLoading}
      />
    </div>
  )
}

export default BranchForm