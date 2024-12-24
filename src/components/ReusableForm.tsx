import React from 'react';
import { useForm, Controller, DefaultValues, Path } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { Field } from '@/utils/types';

interface ReusableFormProps<T> {
  fields: Field[];
  heading: string;
  onSubmit: (data: T) => void;
  initialValues?: DefaultValues<T>; // Ensure the type is compatible with useForm
  submitButtonLabel: string;
  backNavigation: string;
}
//@ts-ignore
const ReusableForm = <T extends Record<string, any>>({
  fields,
  heading, 
  onSubmit,
  initialValues = {} as DefaultValues<T>, // Explicitly cast to DefaultValues<T>
  submitButtonLabel = 'Submit',
  backNavigation,
}: ReusableFormProps<T>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T>({ defaultValues: initialValues });

  
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto pb-6  border shadow-lg rounded-lg space-y-6"
    >
    {/* heading */}
    <h1 className="bg-primaryColor text-white text-2xl font-bold p-6 rounded-t-lg text-center">
      {heading}
    </h1>
  {fields.map((field) => (
    <div key={field.name} className="space-y-1 mx-8">
      <div className="flex flex-col gap-y-1 w-full mt-2">
        <label
          htmlFor={field.name}
          className="text-xs font-semibold text-gray-700" 
        >
          {field.label}
        </label>

        {field.type === 'select' && field.options ? (
          <Controller
            name={field.name as Path<T>}
            control={control}
            rules={field.validation}
            render={({ field: controllerField }) => (
              <select
                {...controllerField}
                id={field.name}
                className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 text-gray-700 text-xs md:text-sm focus:outline-none  transition"
              >
                <option value="" disabled>Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}
                          className='hover:bg-primaryColor hover:text-white text-xs'>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
        ) : (
          <Controller
            name={field.name as Path<T>}
            control={control}
            rules={field.validation}
            render={({ field: controllerField }) => (
              <input
                {...controllerField}
                type={field.type}
                id={field.name}
                placeholder={field.placeholder}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-xs md:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primaryColor focus:border-primaryColor transition"
              />
            )}
          />
        )}
      </div>

      {errors[field.name as keyof T] && (
        <span className="text-red-500 text-xs italic">
          {errors[field.name as keyof T]?.message as string}
          
        </span>
      )}
    </div>
  ))}
  <div className='flex flex-col-reverse md:flex-row items-center justify-between mx-8'>
    <button 
      type='button'
      onClick={() => redirect(backNavigation)}
      className='py-3 px-3 w-full md:w-[90px] bg-white text-gray-600 text-xs uppercase rounded-xl font-medium cursor-pointer border-2 border-slate-300 hover:bg-gray-200 hover:text-gray-500 transition duration-200 ease-in-out'>
      Cancel
    </button>

    <button
      type="submit"
      className="py-3 px-6 w-full md:w-auto bg-primaryColor text-white text-xs uppercase rounded-xl font-medium cursor-pointer shadow-lg hover:bg-primaryColor_2 focus:ring-2 focus:ring-primaryColor focus:outline-none transition">
      {submitButtonLabel}
    </button>

  </div>
  
</form>

  );
};

export default ReusableForm;
