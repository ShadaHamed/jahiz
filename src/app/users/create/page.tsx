'use client'
import userRepository from '@/apiCalls/userRepository';
import ReusableForm from '@/components/ReusableForm'
import { useRouter } from 'next/navigation';
import { Role, User } from '@/utils/types';
import { userFormFields } from '@/utils/formFields';
import BackButton from '@/components/Buttons';
import Stepper from './Stepper';
import StepperController from './StepperController';
import AccountInfo from './formTabs/AccountInfo';
import PersonalDetails from './formTabs/PersonalDetails';
import Final from './formTabs/Final';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import roleRepository from '@/apiCalls/roleRepository';

export type UserWithoutId = Omit<User, 'id'>;
 
const UserForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1)
  const [roles, setRoles] = useState<Role[]>([]); 
  const [formData, setFormData] = useState<User>({
    id:'',
    name: { en: '', ar: '' },
    address: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    role: '',
  });
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, trigger, watch } = useForm<User>({mode: 'onTouched'});
  
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await roleRepository.getAllRoles();
        setRoles(data); // Update roles state with the fetched data
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();

  }, []);

  const steps = [
    "Personal Information", 
    "Account Information",
    // "Complete"
  ]

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <PersonalDetails
                  register={register}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  formData={formData}
                  handleChange={handleChange} />
      case 2:
        return <AccountInfo register={register}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  watch={watch}
                  formData={formData}
                  roles = {roles}
                  handleChange={handleChange} />
      // case 3:
      //   return <Final formData={formData} handleSubmit={handleSubmit}/>
      default:
    }
  }

   // Handle input change
 const handleChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// Handle form submission
const onSubmit = async (data: User) => {
  try {
    clearErrors();

    const id = generateId();
    const newUser = {  ...data, id };
    console.log('new user', newUser)
    await userRepository.createUser(newUser);
    toast.success('New user created successfully!');
    router.push('/users'); 
  } catch (error) {
    toast.error('Failed to create user. Please try again.');
  }
};

const handleClick = async (direction: 'next' | 'back') => {

  // Clear all errors before navigating
  clearErrors();

  // const fieldsToValidate: Record<number, ('name.ar'| 'name.en'| 'email' | 'address'| 'phone_number' | 'password' | 'password_confirmation'| 'role')[]> = {
  //   1: ['name.ar', 'name.en', 'email', 'address', 'phone_number'], // Fields for step 1
  //   2: ['password', 'password_confirmation', 'role'], // Fields for step 2
  // };

  if (direction === "next") {
    const isValid = await trigger();
    if (!isValid) return; // Stop navigation if validation fails
  }
  // Determine the new step
  const newStep =
    direction === "next"
      ? Math.min(currentStep + 1, steps.length)
      : Math.max(currentStep - 1, 1);


  // Set the new step
  setCurrentStep(newStep);
};



  return (
    <div className=" p-2 items-center justify-center max-h-lg mx-auto  ">
      {/* <div className='flex flex-row md:h-[100%] md:w-[50%] left-[40%]'> */}
     
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto shadow-xl rounded-2xl pb-2 bg-white mt-4 w-[600px]'>
        <h1 className="bg-primaryColor text-white text-2xl font-bold p-4 rounded-t-2xl uppercase text-center">Add New User</h1>
        {/* stepper */}
        <div className='container horizontal mt-3'>
          <Stepper steps={steps} currentStep={currentStep}/>
        {/* Display Components */}
        <div className='container my-2 p-5 max-w-full max-h-full overflow-hide'>
          {displaySteps(currentStep)}
        </div>
        
        </div>
        
        {/* navigation control */}
        {/* {currentStep <= steps.length && 
          <StepperController
          handleClick={handleClick} 
          currentStep={currentStep}
          steps={steps}/>
        } */}
        <div className="container flex justify-around mb-4">
        {/* Cancel Button */}
      <button
        type="button"
        onClick={() => router.push('/users')}
        className={`bg-white text-primaryColor text-xs uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-primaryColor  hover:text-white hover:bg-primaryColor transition duration-200 ease-in-out        }`}
      >
        Cancel
      </button>
      {/* Back Button */}
      <button
        type="button"
        onClick={() => handleClick("back")}
        className={`bg-white text-primaryColor text-xs uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-primaryColor transition duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed  pointer-events-none" : " hover:bg-primaryColor hover:text-white "
        }`}
        disabled={currentStep === 1}
      >
        Back
      </button>

      {/* Next or Submit Button */}
      {currentStep < steps.length ? (
        <button
          type="button"
          onClick={() => handleClick("next")}
          className="bg-primaryColor text-white text-xs uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-primaryColor_2 transition duration-200 ease-in-out"
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-primaryColor text-white text-xs uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-primaryColor_2 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      )}
    </div>
      
      </form>
      </div>
    // </div>

  )
}

export default UserForm