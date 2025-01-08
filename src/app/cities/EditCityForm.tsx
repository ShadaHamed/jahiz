'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '@/components/ReusableForm';
import { City, CityFormValues, Field } from '@/utils/types';
import cityRepository from '@/apiCalls/cityRepository';
import { toast } from 'react-toastify';

interface EditCityFormProps {
  id: string;
  initialValues: CityFormValues;
}

const EditCityForm: React.FC<EditCityFormProps> = ({id, initialValues}) => {
  const router = useRouter();
  const [localLoading, setLocalLoading] = useState(false);

  const handleEditSubmit = async (data: CityFormValues) => {
    setLocalLoading(true)
    try {
      const updatedCity: Omit<City, 'id'> = {
        ... data,
        name: {
          en: data.english_city_Name,
          ar: data.arabic_city_Name,
        },
        status: data.status
      }
      await cityRepository.updateCity(id, updatedCity);
      toast.success('City updated successfully!');
      router.push('/cities'); // Redirect to branches list
    } catch (error) {
      toast.error('Failed to update city. Please try again.');
    } finally {
      setLocalLoading(false)
    }
  };
  const cityFormFields: Field[] = [
    {
      name: 'english_city_Name',
      label: 'City Name (in English)',
      type: 'text',
      placeholder: 'Enter city name in English',
      validation: { 
        required: 'English city name is required', 
        pattern: {
          value: /^[a-zA-Z\s-]+$/,
          message: "Name in English must contain only English letters"
        } },
    },
    {
      name: 'arabic_city_Name',
      label: 'City Name (in Arabic)',
      type: 'text',
      placeholder: 'Enter city name in Arabic',
      validation: { 
        required: 'Arabic city name is required',
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
      validation: { required: 'Location is required' },
  
    },
  ]; 

  return (
    <ReusableForm<CityFormValues>
    fields={cityFormFields}
    heading = "Edit City"
    initialValues={initialValues}
    onSubmit={handleEditSubmit}
    submitButtonLabel="Save"
    backNavigation = "/cities"
    loading= {localLoading}
  />
  )
}

export default EditCityForm