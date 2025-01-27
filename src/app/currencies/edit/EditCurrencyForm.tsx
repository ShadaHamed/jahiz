'use client';

import React, {  useState } from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '@/components/ReusableForm';
import { Currency, CityFormValues, Field, CurrencyFormValues } from '@/utils/types';
import currencyRepository from '@/apiCalls/CurrencyRepository';
import { toast } from 'react-toastify';

interface EditCurrencyFormProps {
  id: string;
  initialValues: CurrencyFormValues;
}

const EditCurrencyForm: React.FC<EditCurrencyFormProps> = ({id, initialValues}) => {
  const router = useRouter();
  const [localLoading, setLocalLoading] = useState(false);

  const handleEditSubmit = async (data: CurrencyFormValues) => {
    setLocalLoading(true)
    try {
      const updatedCurrency: Omit<Currency, 'id'> = {
        ... data,
        name: data.name,
        symbol: data.symbol,
        iso_code: data.iso_code
      }
      await currencyRepository.updateCurrency(id, updatedCurrency);
      toast.success('Currency updated successfully!');
      router.push('/currencies'); // Redirect to branches list
    } catch (error) {
      toast.error('Failed to update currency. Please try again.');
    } finally {
      setLocalLoading(false)
    }
  };
  const CurrencyFormFields: Field[] = [
    {
      name: 'name',
      label: 'Currency Name',
      type: 'text',
      placeholder: 'Enter the name of Currency',
      validation: { 
        required: 'Name for Currency is required', 
        pattern: {
          value: /^[a-zA-Z\s-]+$/,
          message: "Name must contain only English letters"
        } },
    },
    {
      name: 'symbol',
      label: 'Currency Symbol',
      type: 'text',
      placeholder: 'Enter the symbol of Currency',
      validation: { 
        required: 'symbol of Currency is required',
        pattern: {
            value: /^[A-Za-z\u0600-\u06FF]+$|^[\u0024\u00A3\u00A5\u20AC]$/,
            message: "invalid currency symbol"
        } },
    },
    {
      name: 'iso_code',
      label: 'ISO_Code',
      type: 'text',
      placeholder: 'Enter the iso_code of Currency',
      validation: { 
        required: 'iso_code for Currency is required', 
        pattern: {
          value: /^[a-zA-Z\s-]+$/,
          message: "ison_code must contain only English letters"
        } },
    },
  ];

  return (
    <ReusableForm<CurrencyFormValues>
    fields={CurrencyFormFields}
    heading = "Edit Currency"
    initialValues={initialValues}
    onSubmit={handleEditSubmit}
    submitButtonLabel="Save"
    backNavigation = "/currencies"
    loading= {localLoading}
  />
  )
}

export default EditCurrencyForm