'use client'

import cityRepository from '@/apiCalls/cityRepository';
import regionRepository from '@/apiCalls/regionRepository';
import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {  City, Region } from '@/utils/types';
import { Field } from '@/utils/types'
import { toast } from 'react-toastify';
import { useRegionGlobal } from '../regionContext';

const RegionForm = () => {
  const [cities, setCities] = useState<City[]>()
  const [localLoading, setLocalLoading] = useState(false)
  const router = useRouter();
  const { refrechRegions} = useRegionGlobal();

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const cityData = await cityRepository.getAllCities();
        setCities(cityData);
        
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } 
    };
  
    fetchCity();
  }, []);

 // Define form fields
  const regionFormFields: Field[] = [
  {
    name: 'english_region_Name',
    label: 'Region Name (in English)',
    type: 'text',
    placeholder: 'Enter the name of region in English',
    validation: { 
      required: 'English the name for region is required', 
      pattern: {
        value: /^[a-zA-Z\s-]+$/,
        message: "Name in English must contain only English letters"
      } },
  },
  {
    name: 'arabic_region_Name',
    label: 'Region Name (in Arabic)',
    type: 'text',
    placeholder: 'Enter the name of region in Arabic',
    validation: { 
      required: 'Arabic the name of region is required',
      pattern: {
        value: /^[\u0621-\u064A\u0617-\u061A\u064B-\u0652\s]+$/,
        message: "Name in Arabic must contain only Arabic letters"
      } },
  },
  {
    name: 'cityID',
    label: 'City',
    type: 'select',
    options: cities?.map((city) => ({ label: city.name.en, value: city.id })) || [],
    validation: { required: 'City is required' },
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
];


const generateId = () => Math.random().toString(36).substr(2, 9);

// Handle form submission
const handleSubmit = async(data: {english_region_Name: string; arabic_region_Name: string; cityID: string,  status: string }) => {
    setLocalLoading(true)
    try {

    const newRegion = {
      id: generateId(),
      name: {
        en: data.english_region_Name,
        ar: data.arabic_region_Name,
      },
      cityID: data.cityID,
      status: data.status,
    };

    await regionRepository.createRegion(newRegion);
    toast.success('Region created successfully!');
    await refrechRegions();
    router.refresh();
    router.push('/regions');
    await refrechRegions();

  } catch (error) {
    toast.error('Failed to create region. Please try again.');
  }
  finally {
    setLocalLoading(false)
  }
};

  return (
    <div className="p-8 h-[100vh] items-center justify-center max-h-lg mx-auto">
      <ReusableForm
        fields={regionFormFields}
        heading = "Add New Region"
        initialValues={{ english_region_Name: '',arabic_region_Name:'', cityID: '',  status: 'active' }}
        onSubmit={handleSubmit}
        submitButtonLabel="ADD"
        backNavigation = "/regions"
        loading={localLoading}
      />
    </div>
  )
}

export default RegionForm