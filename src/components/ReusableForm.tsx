import React from 'react';
import { useForm, Controller, DefaultValues, Path } from 'react-hook-form';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  //@ts-ignore
  validation?: Record<string, any>;
}

interface ReusableFormProps<T> {
  fields: Field[];
  onSubmit: (data: T) => void;
  initialValues?: DefaultValues<T>; // Ensure the type is compatible with useForm
  submitButtonLabel: string;
}
//@ts-ignore
const ReusableForm = <T extends Record<string, any>>({
  fields,
  onSubmit,
  initialValues = {} as DefaultValues<T>, // Explicitly cast to DefaultValues<T>
  submitButtonLabel = 'Submit',
}: ReusableFormProps<T>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T>({ defaultValues: initialValues });

  
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white border shadow-md rounded-md space-y-4">
  {fields.map((field) => (
    <div key={field.name} className="flex flex-col space-y-2">
      <div className="flex items-center gap-x-4">
        <label
          htmlFor={field.name}
          className="text-xs font-medium text-gray-700 w-1/4" // Optional fixed width for alignment
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
                className="flex-1 p-3 rounded-md border border-gray-300 text-sm bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-primaryColor "
              >
                <option value="" >Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}
                          className='hover:bg-primaryColor hover:text-white appearance-none'>
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
                className="flex-1 form-input appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
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

  <button
    type="submit"
    className="w-full py-3 px-4 bg-primaryColor text-white rounded-md font-medium text-sm shadow-md hover:bg-primaryColor_2 focus:ring-2 focus:ring-primaryColor focus:outline-none"
  >
    {submitButtonLabel}
  </button>
</form>

  );
};

export default ReusableForm;
