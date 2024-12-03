'use client'
import branchRepository from '@/apiCalls/branchRepository';
import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import BackButton from '@/components/Buttons';

const BranchForm = () => {
  const router = useRouter();

 // Define form fields
 const fields = [
  {
    name: 'branch_Name',
    label: 'Branch Name',
    type: 'text',
    placeholder: 'Enter branch name',
    validation: { required: 'Branch name is required' },
  },
  {
    name: 'location',
    label: 'Location',
    type: 'text',
    placeholder: 'Enter location',
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
  },
];

// Handle form submission
const handleSubmit = (data: { branch_Name: string; location: string; status: string }) => {
  try {

    const newBranch = {  ...data };

    branchRepository.createBranch(newBranch);
    alert('Branch created successfully!');
    router.push('/branches'); // Redirect to branches page
  } catch (error) {
    console.error('Error creating branch:', error);
    alert('Failed to create branch. Please try again.');
  }
};

  return (
    <div className="p-6">
      <div className='flex items-center justify-start space-x-4 absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-2xl mx-auto md:left-auto md:transform-none'>
        <BackButton />
        <h1 className="text-2xl font-bold my-4">Add New Branch</h1>
      </div>
      <ReusableForm
        fields={fields}
        initialValues={{ branch_Name: '', location: '', status: 'active' }}
        onSubmit={handleSubmit}
        submitButtonLabel="ADD"
      />
    </div>
  )
}

export default BranchForm