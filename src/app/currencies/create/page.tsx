'use client'

import CurrencyRepository from '@/apiCalls/CurrencyRepository';
import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Field } from '@/utils/types'
import { toast } from 'react-toastify';
import { useCurrencyGlobal } from '../currencyContext';
import { symbol } from 'prop-types';

const CurrencyForm = () => {
  const router = useRouter();
  const { refrechCurrencies} = useCurrencyGlobal();
  const [localLoading, setLocalLoading] = useState(false);

 // Define form fields
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
        value: /^[A-Za-z]{3}$|^[\u0024\u00A3\u00A5\u20AC]$/,
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

const generateId = () => Math.floor(Math.random() * 10_000_000);

// Handle form submission
const handleSubmit = async(data: {name: string; symbol: string; iso_code: string }) => {
    setLocalLoading(true);
    try {

    const newCurrency = {
      id: generateId(),
      name: data.name,
      symbol:data.symbol,
      iso_code: data.iso_code,
    };

    await CurrencyRepository.createCurrency(newCurrency);
    toast.success('Currency created successfully!');
    await refrechCurrencies();
    router.refresh();
    router.push('/currencies'); // Redirect to branches page
    await refrechCurrencies();

  } catch (error) {
    toast.error('Failed to create Currency. Please try again.');
  } finally {
    setLocalLoading(false)
  }
};

  return (
    <div className="p-8 h-[100vh] items-center justify-center max-h-lg mx-auto">
      <ReusableForm
        fields={CurrencyFormFields}
        heading = "Add New Currency"
        initialValues={{ name:'', symbol:'',  iso_code: '' }}
        onSubmit={handleSubmit}
        submitButtonLabel="ADD"
        backNavigation = "/currencies"
        loading = {localLoading}
      />
    </div>
  )
}

export default CurrencyForm