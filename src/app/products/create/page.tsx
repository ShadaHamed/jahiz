'use client';

import productRepository from '@/apiCalls/productsRepository';
import { useRouter } from 'next/navigation';
import { Product, ProductType, Store, Currency } from '@/utils/types';
import Stepper from '@/app/users/create/Stepper';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useProductsContext } from '../productcontext';
import productTypeRepository from '@/apiCalls/productTypesRepository';
import storeRepository from '@/apiCalls/storeRepository';
import currancyRepository from '@/apiCalls/currancyRepository';
import ProductInformation from './formTabs/ProductInformation';
import InventoryAndPricing from './formTabs/InventoryAndPricing';
import AdditionalDetails from './formTabs/AdditionalDetails';

export type ProductWithoutId = Omit<Product, 'id'>;

const UserForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Product>({
    id:'',
    name: '',
    code:'',
    description:'',
    features: [{value: ""}],
    total_quantity: 0,
    sale_price:0,
    status: "active",
    discount: 0,
    shipping_fee: 0,
    discount_start:'',
    discount_end:'',
    barcode:'',
    sales:0,
    current_sold_items:0,
    product_type_id: 0,
    currency_id: 1,
    store_id: 0,
    image:''
  });

  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const {loading, setLoading} = useProductsContext();
  const { control, register, handleSubmit, formState: { errors }, setError, clearErrors, trigger, setValue } = useForm<Product>(
    {mode: 'onTouched', 
    defaultValues: formData},);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features" 
  })
  

  const[localLoading, setLocalLoading] = useState(false);

  //fetch data required for dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productTypesData = await productTypeRepository.getAllProductTypes();
        const storesData = await storeRepository.getAllStores();
        const currenciesData = await currancyRepository.getAllCurrencies();
        
        setProductTypes(productTypesData); 
        setStores(storesData);
        setCurrencies(currenciesData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  const steps = [
    "Product Information", 
    "Inventory & Pricing",
    "Additional Details"
  ]

  const generateId = () => Math.floor(Math.random() * 10_000_000);

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <ProductInformation
                  control={control}
                  register={register}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  handleChange={handleChange}
                  setValue = {setValue} />
      case 2:
        return <InventoryAndPricing 
                  register={register}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  formData={formData}
                  handleChange={handleChange} />
      case 3:
        return <AdditionalDetails 
                  register={register}
                  errors={errors}
                  setError={setError}
                  clearErrors={clearErrors}
                  productTypeOptions={productTypes}
                  currencyOptions={currencies}
                  storeOptions={stores}
                  formData={formData}
                  handleChange={handleChange} 
                 />
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
const onSubmit = async (data: Product) => {
  setLoading(true)
  setLocalLoading(true)
  try {
    clearErrors();

    const id = generateId();
    const newProduct = {  ...data, id };

    // Convert `newProduct` to FormData
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (key === "features" && Array.isArray(value)) {
        value.forEach((feature, index) => {
          formData.append(`features[${index}].value`, feature.value);
        });
      } else if (key === "image" && value instanceof File) {
        formData.append(key, value); // Only append if the value is a file
      } else {
        formData.append(key, value as string); // Convert other values to strings
      }
    });

    await productRepository.createProduct(formData);
    toast.success('New product created successfully!');
    router.push('/products'); 
  } catch (error) {
    toast.error('Failed to create product. Please try again.');
  } finally {
    setLoading(false)
    setLocalLoading(false)
  }
};

const handleClick = async (direction: 'next' | 'back') => {

  // Clear all errors before navigating
  clearErrors();

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
    <div className="p-4 items-center justify-center mx-auto w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto shadow-xl rounded-2xl bg-white mt-4 max-w-4xl w-full p-4 sm:p-6 md:p-8">
        <h1 className="bg-primaryColor text-white text-lg sm:text-xl md:text-2xl font-bold p-4 rounded-t-2xl uppercase text-center">
          Add New Product
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
        onClick={() => router.push('/products')}
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

  )
}

export default UserForm