'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '@/components/ReusableForm';
import { City, Region, RegionFormValues, Field } from '@/utils/types';
import regionRepository from '@/apiCalls/regionRepository';
import cityRepository from '@/apiCalls/cityRepository';
import { toast } from 'react-toastify';

interface EditRegionFormProps {
  id: string;
  initialValues: RegionFormValues;
}

const EditRegionForm: React.FC<EditRegionFormProps> = ({id, initialValues}) => {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>()
  const [localLoading, setLocalLoading] =useState(false)

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
  
  const handleEditSubmit = async (data: RegionFormValues) => {
    setLocalLoading(true)
    try {
      const updatedRegion: Omit<Region, 'id'> = {
        ... data,
        name: {
          en: data.english_region_Name,
          ar: data.arabic_region_Name,
        },
        cityID: data.cityID,
        status: data.status
      }
      await regionRepository.updateRegion(id, updatedRegion);
      toast.success('Region updated successfully!');
      router.push('/regions'); // Redirect to branches list
    } catch (error) {
      toast.error('Failed to update region. Please try again.');
    } finally {
      setLocalLoading(false)
    }
  };
  const regionFormFields: Field[] = [
    {
      name: 'english_region_Name',
      label: 'Region Name (in English)',
      type: 'text',
      placeholder: 'Enter region name in English',
      validation: { 
        required: 'English region name is required', 
        pattern: {
          value: /^[a-zA-Z\s-]+$/,
          message: "Name in English must contain only English letters"
        } },
    },
    {
      name: 'arabic_region_Name',
      label: 'Region Name (in Arabic)',
      type: 'text',
      placeholder: 'Enter region name in Arabic',
      validation: { 
        required: 'Arabic region name is required',
        pattern: {
          value: /^[\u0621-\u064A\u0617-\u061A\u064B-\u0652\s]+$/,
          message: "Name in Arabic must contain only Arabic letters"
        } },
    },
    {
      name: 'cityID',
      label: 'City',
      type: 'select',
      options: cities?.map((city) => ({ label: city.name.en, value: city.id})) || [],
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

  return (
    <ReusableForm<RegionFormValues>
    fields={regionFormFields}
    heading = "Edit City"
    initialValues={initialValues}
    onSubmit={handleEditSubmit}
    submitButtonLabel="Save"
    backNavigation = "/regions"
    loading = {localLoading}
  />
  )
}

export default EditRegionForm