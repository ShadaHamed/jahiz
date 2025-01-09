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
import { useGlobal } from '../userContext';

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
  const {loading, setLoading} = useGlobal();
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, trigger, watch } = useForm<User>({mode: 'onTouched'});
  const[localLoading, setLocalLoading] = useState(false);

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
  setLoading(true)
  setLocalLoading(true)
  try {
    clearErrors();

    const id = generateId();
    const newUser = {  ...data, id };
    await userRepository.createUser(newUser);
    toast.success('New user created successfully!');
    router.push('/users'); 
  } catch (error) {
    toast.error('Failed to create user. Please try again.');
  } finally {
    setLoading(false)
    setLocalLoading(false)
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
    <div className="p-4 items-center justify-center mx-auto max-w-full">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="mx-auto shadow-xl rounded-2xl bg-white mt-4 max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 md:p-8">
    <h1 className="bg-primaryColor text-white text-lg sm:text-xl md:text-2xl font-bold p-4 rounded-t-2xl uppercase text-center">
      Add New User
    </h1>

    {/* Stepper */}
    <div className="container horizontal mt-3">
      <Stepper steps={steps} currentStep={currentStep} />
    </div>

    {/* Display Components */}
    <div className="container my-4 p-4 sm:p-6 max-w-full max-h-full overflow-hidden">
      {displaySteps(currentStep)}
    </div>

    {/* Navigation Controls */}
    <div className="container flex flex-col md:flex-row justify-around gap-4 mb-4">
  {/* Cancel Button */}
  <button
    type="button"
    onClick={() => router.push('/users')}
    className="bg-white text-primaryColor text-xs uppercase py-1 px-2 rounded-lg font-semibold cursor-pointer border border-primaryColor hover:text-white hover:bg-primaryColor transition duration-200 ease-in-out">
    Cancel
  </button>

  {/* Back Button */}
  <button
    type="button"
    onClick={() => handleClick("back")}
    className={`bg-white text-primaryColor text-xs uppercase py-1 px-4 rounded-lg font-semibold cursor-pointer border border-primaryColor transition duration-200 ease-in-out ${
      currentStep === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-primaryColor hover:text-white"
    }`}
    disabled={currentStep === 1}>
    Back
  </button>

  {/* Next or Submit Button */}
  {currentStep < steps.length ? (
    <button
      type="button"
      onClick={() => handleClick("next")}
      className="bg-primaryColor text-white text-xs uppercase py-2 px-5 rounded-lg font-semibold cursor-pointer hover:bg-primaryColor_2 transition duration-200 ease-in-out">
      Next
    </button>
  ) : (
    <button
      type="button"
      onClick={handleSubmit(onSubmit)}
      className="flex justify-center items-center bg-primaryColor text-white w-auto md:w-[90px] text-xs uppercase py-2 px-4 rounded-lg font-semibold cursor-pointer hover:bg-primaryColor_2 transition duration-200 ease-in-out">
      {localLoading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="h-4 w-4 animate-spin">
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)">
            <stop offset="0" stopColor="#FBFFFF"></stop>
            <stop offset=".3" stopColor="#FBFFFF" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#FBFFFF" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#FBFFFF" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#FBFFFF" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            fill="none"
            stroke="url(#a12)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70">
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"></animateTransform>
          </circle>
          <circle
            fill="none"
            opacity=".2"
            stroke="#FBFFFF"
            strokeWidth="15"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"></circle>
        </svg>
      ) : (
        "Submit"
      )}
    </button>
  )}
</div>

  </form>
</div>

    // </div>

  )
}

export default UserForm