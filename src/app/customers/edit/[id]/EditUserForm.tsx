'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '@/components/ReusableForm';
import { User } from '@/utils/types';
import userRepository from '@/apiCalls/userRepository';
import { userFormFields } from '@/utils/formFields';

type UserFormValues = Omit<User, 'id'>;

interface EditCustomerFormProps {
  id: string;
  initialValues: UserFormValues;
}

const EditCustomerForm: React.FC<EditCustomerFormProps> = ({id, initialValues}) => {
  const router = useRouter();
  
  const handleEditSubmit = async (data: User) => {
    try {
      await userRepository.updateUser(id, data);
      alert('Customer Information updated successfully!');
      router.push('/customers'); 
    } catch (error) {
      console.error('Error updating customer information:', error);
      alert('Failed to update data. Please try again.');
    }
  };

  return (
    <ReusableForm<User>
    fields= {userFormFields}
    initialValues={initialValues}
    onSubmit={handleEditSubmit}
    submitButtonLabel="Save Changes"
  />
  )
}

export default EditCustomerForm