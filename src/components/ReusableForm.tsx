import { useForm, Controller, DefaultValues, Path } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { Field } from '@/utils/types';
import { toast } from 'react-toastify';

interface ReusableFormProps<T> {
  fields: Field[];
  heading: string;
  onSubmit: (data: T) => void;
  initialValues?: DefaultValues<T>; // Ensure the type is compatible with useForm
  submitButtonLabel: string;
  backNavigation: string;
  imagePreview?: string | null
  setImagePreview?: (preview: string | null) => void;
  loading: boolean;
}
//@ts-ignore
const ReusableForm = <T extends Record<string, any>>({
  fields,
  heading, 
  onSubmit,
  initialValues = {} as DefaultValues<T>, // Explicitly cast to DefaultValues<T>
  submitButtonLabel = 'Submit',
  backNavigation,
  imagePreview,
  setImagePreview,
  loading = false
  
}: ReusableFormProps<T>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<T>({ defaultValues: initialValues });
  
  const handleImageChange = (file: File | null, fieldName: Path<T>) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string; // Base64 string
        if (setImagePreview) setImagePreview(fileData); // Update preview
        setValue(fieldName, fileData as any); // Update form value with base64
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('No file selected or file is null.');
    }
  };

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
        ) : field.type === 'file' ? (
          <Controller
            name={field.name as Path<T>}
            control={control}
            rules={field.validation}
            render={({ field: controllerField }) => (
              <>
                <input
                  type="file"
                  id={field.name}
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-xs md:text-sm text-gray-700 focus:outline-none"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    controllerField.onChange(file); // Update the form value
                    if (file) {
                      handleImageChange(file, field.name as Path<T>); // Update the preview
                    }
                  }}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-full h-40 object-cover rounded-lg"
                  />
                )}
              </>
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
  <div className='flex flex-col-reverse gap-2 md:flex-row items-center justify-between mx-8'>
    <button 
      type='button'
      onClick={() => redirect(backNavigation)}
      className='py-2 px-3 w-full md:w-[90px] bg-white text-gray-600 text-xs uppercase rounded-xl font-medium cursor-pointer border-2 border-slate-300 hover:bg-gray-200 hover:text-gray-500 transition duration-200 ease-in-out'>
      Cancel
    </button>

    <button
      type="submit"
      className="flex items-center justify-center py-3 px-3 w-full md:w-[90px] bg-primaryColor text-white text-xs uppercase rounded-xl font-medium cursor-pointer shadow-lg hover:bg-primaryColor_2 focus:ring-2 focus:ring-primaryColor focus:outline-none transition">
      {loading? 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-4 w-4 animate-spin">
          <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FBFFFF"></stop><stop offset=".3" stop-color="#FBFFFF" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FBFFFF" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FBFFFF" stop-opacity=".3"></stop><stop offset="1" stop-color="#FBFFFF" stop-opacity="0"></stop></radialGradient>
          <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
          <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
          </circle>
          <circle transform-origin="center" fill="none" opacity=".2" stroke="#FBFFFF" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle>
          </svg>
          : submitButtonLabel}
    </button>

  </div>
  
</form>

  );
};

export default ReusableForm;
