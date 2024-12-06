'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ReusableForm from '@/components/ReusableForm';
import { Branch } from '@/utils/types';
import branchRepository from '@/apiCalls/branchRepository';

type BranchFormValues = Omit<Branch, 'id'>;

interface EditBranchFormProps {
  id: string;
  initialValues: BranchFormValues;
}

const EditBranchForm: React.FC<EditBranchFormProps> = ({id, initialValues}) => {
  const router = useRouter();
  
  const handleEditSubmit = async (data: BranchFormValues) => {
    try {
      await branchRepository.updateBranch(id, data);
      alert('Branch updated successfully!');
      router.push('/branches'); // Redirect to branches list
    } catch (error) {
      console.error('Error updating branch:', error);
      alert('Failed to update branch. Please try again.');
    }
  };

  return (
    <ReusableForm<BranchFormValues>
    fields={[
      { name: 'branch_Name', label: 'Branch Name', type: 'text', validation: { required: 'Branch name is required' } },
      { name: 'location', label: 'Location', type: 'text', validation: { required: 'Location is required' } },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
        validation: { required: 'Status is required' },
      },
    ]}
    initialValues={initialValues}
    onSubmit={handleEditSubmit}
    submitButtonLabel="Save Changes"
  />
  )
}

export default EditBranchForm