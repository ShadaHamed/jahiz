'use client'
import userRepository from '@/apiCalls/userRepository';
import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import { User } from '@/utils/types';
import { userFormFields } from '@/utils/formFields';
import BackButton from '@/components/Buttons';

const UserForm = () => {
  const router = useRouter();

// Handle form submission
const handleSubmit = async (data: User) => {
  try {

    const newUser = {  ...data };

    await userRepository.createUser(newUser);
    alert('New user created successfully!');
    router.push('/customers'); // Redirect to branches page
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Failed to create user. Please try again.');
  }
};

  return (
    <div className="p-6">
      <div className='flex items-center justify-start space-x-4 absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-2xl mx-auto md:left-auto md:transform-none'>
        <BackButton />      
        <h1 className="text-2xl font-bold my-4">Add New Customer</h1>
      </div>
      <ReusableForm
        fields={userFormFields}
        initialValues={{ name:{en: '', ar: ''} , address: '', email:'', password:'', password_confirmation:'', role:2 }}
        onSubmit={handleSubmit}
        submitButtonLabel="ADD"
      />
    </div>
  )
}

export default UserForm