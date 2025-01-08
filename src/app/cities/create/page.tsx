'use client'

import cityRepository from '@/apiCalls/cityRepository';
import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Field } from '@/utils/types'
import { toast } from 'react-toastify';
import { useCityGlobal } from '../cityContex';

const CityForm = () => {
  const router = useRouter();
  const { refrechCities} = useCityGlobal();
  const [localLoading, setLocalLoading] = useState(false);

 // Define form fields
  const cityFormFields: Field[] = [
  {
    name: 'english_city_Name',
    label: 'City Name (in English)',
    type: 'text',
    placeholder: 'Enter the name of city in English',
    validation: { 
      required: 'English the name for city is required', 
      pattern: {
        value: /^[a-zA-Z\s-]+$/,
        message: "Name in English must contain only English letters"
      } },
  },
  {
    name: 'arabic_city_Name',
    label: 'City Name (in Arabic)',
    type: 'text',
    placeholder: 'Enter the name of city in Arabic',
    validation: { 
      required: 'Arabic the name of city is required',
      pattern: {
        value: /^[\u0621-\u064A\u0617-\u061A\u064B-\u0652\s]+$/,
        message: "Name in Arabic must contain only Arabic letters"
      } },
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
const handleSubmit = async(data: {english_city_Name: string; arabic_city_Name: string; status: string }) => {
    setLocalLoading(true);
    try {

    const newCity = {
      id: generateId(),
      name: {
        en: data.english_city_Name,
        ar: data.arabic_city_Name,
      },
      status: data.status,
    };

    await cityRepository.createCity(newCity);
    toast.success('City created successfully!');
    await refrechCities();
    router.refresh();
    router.push('/cities'); // Redirect to branches page
    await refrechCities();

  } catch (error) {
    toast.error('Failed to create city. Please try again.');
  } finally {
    setLocalLoading(false)
  }
};

  return (
    <div className="p-8 h-[100vh] items-center justify-center max-h-lg mx-auto">
      <ReusableForm
        fields={cityFormFields}
        heading = "Add New City"
        initialValues={{ english_city_Name: '',arabic_city_Name:'',  status: 'active' }}
        onSubmit={handleSubmit}
        submitButtonLabel="ADD"
        backNavigation = "/cities"
        loading = {localLoading}
      />
    </div>
  )
}

export default CityForm