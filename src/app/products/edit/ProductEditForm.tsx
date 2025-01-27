'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductType, Currency, Store } from '@/utils/types';
import productRepository from '@/apiCalls/productsRepository';
import { toast } from 'react-toastify';
import { useFieldArray, useForm } from 'react-hook-form';
import { useProductsContext } from '../productcontext';
import productTypeRepository from '@/apiCalls/productTypesRepository';
import currencyRepository from '@/apiCalls/currancyRepository';
import storeRepository from '@/apiCalls/storeRepository';

type ProductFormValues = Omit<Product, 'id'> & {
  features: { value: string }[];
};

interface ProductEditFormProps {
  id: string;
  initialValues: ProductFormValues;
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({
  id,
  initialValues,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialValues.image);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const { setLoading } = useProductsContext();
  const [localLoading, setLocalLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRefPreview = useRef<HTMLInputElement | null>(null);
  const fileInputRefUpload = useRef<HTMLInputElement | null>(null);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormValues>({
    defaultValues: initialValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features',
  });

  //fetch data required for dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productTypesData = await productTypeRepository.getAllProductTypes();
        const storesData = await storeRepository.getAllStores();
        const currenciesData = await currencyRepository.getAllCurrencies();

        setProductTypes(productTypesData);
        setStores(storesData);
        setCurrencies(currenciesData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  const handleEditSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    setLocalLoading(true);
    try {
      await productRepository.updateProduct(id, data);
      toast.success('Product updated successfully!');
      router.push('/products');
    } catch (error) {
      console.error('Error updating product', error);
      toast.error('Failed to update data. Please try again.');
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  };
  const handleReplaceClick = () => {
    setImagePreview(null);
    if (fileInputRefPreview.current) {
      fileInputRefPreview.current.value = ""; // Reset the file input value
      fileInputRefPreview.current.click(); // Trigger the click event
    }

    if (fileInputRefUpload.current) {
      fileInputRefUpload.current.click(); // Triggers the file input dialog
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // console.log("Selected file:", file.name, file.type, file.size);
  
      const reader = new FileReader();
      reader.onload = async() => {
        const fileData = reader.result as string;
        //remove background
        const processedImage = await removeBackground(fileData);
        setImagePreview(processedImage); // Update image preview
        setValue("image", processedImage as any); // Set form value
      };
      reader.readAsDataURL(file); // Read file as data URL
    } else {
      console.error("No file selected or file is null.");
    }
  };
  const removeBackground = async (base64Image: string): Promise<string | null> => {
    const apiKey = 'Ag1YhrBnNdZXZDpDmMSVzkBu'; // Replace with your API key
    const formData = new FormData();
    const rawBase64 = base64Image.split(',')[1]; // Remove the data prefix
  
    formData.append('image_file_b64', rawBase64); // Send the base64 string directly
    formData.append('size', 'auto');
  
    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      });
  
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorDetails = await response.text();
        console.error('Error Details:', errorDetails);
        return null;
      }
  
      // Read the response as a blob (binary data)
      const blob = await response.blob();
      // console.log('Blob received:', blob);
  
      // Convert the blob to a base64 string
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
  
      return base64; // Return the base64 string of the image
    } catch (error) {
      console.error('Error removing background:', error);
      return null;
    }
  };
  

  // const handleImageChange = (file: File | null) => {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const fileData = reader.result as string;
  //       setImagePreview(fileData);
  //       setValue('image', fileData as any);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     toast.error('No file selected.');
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-primaryColor">Edit Product</h1>
        <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className='flex items-center justify-between'>
            <div className='flex flex-col w-1/2'>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="block font-bold text-gray-700 text-xs mb-2">Product Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Product name is required' })}
                    className="w-full text-gray-700 text-sm p-3 border rounded-md focus:ring focus:ring-blue-200"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                {/* Code */}
                <div>
                  <label className="block font-bold text-gray-700 text-xs mb-2">Product Code</label>
                  <input
                    type="text"
                    {...register('code', { required: 'Product code is required' })}
                    className="w-full text-gray-700 text-sm p-3 border rounded-md focus:ring focus:ring-blue-200"
                  />
                  {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
                </div>
              </div>
              {/* Description */}
              <div className='mt-2'>
                <label className="block font-bold text-gray-700 text-xs mb-2">
                  Description
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  placeholder="Enter product description"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm resize-none "
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description?.message}
                  </p>
                )}
              </div>
            </div>

           {/* Image Upload */}
          <div className="md:col-span-2 mt-4 w-1/3">
            <div className="flex items-center space-x-4">
              {imagePreview ? (
                <div className="relative group w-40 h-40">
                  {/* Image Preview */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full p-4 object-cover rounded-md border"
                  />
                  {/* Hidden File Input for Replace */}
                  <input
                    type="file"
                    ref={fileInputRefPreview}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden" // Hidden from the UI
                  />
                  {/* Overlay with Replace/Remove Buttons */}
                  <div className="absolute flex flex-col gap-2 inset-0 items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      className="text-white bg-blue-500 text-xs px-3 py-1 rounded"
                      onClick={handleReplaceClick}
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-600 text-xs px-3 py-1 rounded"
                      onClick={() => setImagePreview(null)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <span className="text-gray-500">Click to upload</span>
                  {/* Unified File Input for Upload */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRefUpload}
                    className="cursor-pointer hidden" // Ensure it's hidden by default
                    onChange={handleImageChange}
                    onClick={handleReplaceClick}
                  />
                  <button
                    type="button"
                    className="mt-2 text-white bg-blue-500 text-xs px-3 py-1 rounded"
                    onClick={handleReplaceClick} // Trigger the file input click
                  >
                    Choose image
                  </button>
                </div>
              )}
            </div>
          </div>
          </div>

          {/* Pricing and Inventory */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Pricing & Inventory</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Sale Price */}
              <div>
                <label className="font-bold text-gray-700 text-xs mb-2">Sale Price</label>
                <input
                  type="number"
                  step="any"
                  {...register('sale_price', { 
                    required: 'Sale price is required',
                    pattern: {
                      value: /^\d+(\.\d+)?$/ ,
                      message: "Sale price must contain only numbers"
                    } })}
                  className="w-full p-3 border rounded-md text-gray-700 text-sm"
                />
              </div>

              {/* Total Quantity */}
              <div>
                <label className="font-bold text-gray-700 text-xs mb-2">Total Quantity</label>
                <input
                  type="number"
                  {...register('total_quantity', {
                    required: 'Total quantity is required',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Code must contain only letters and numbers"
                    }
                  })}
                  placeholder="Enter total quantity"
                  className="w-full p-2 border rounded text-gray-700 text-sm"
                />
                {errors.total_quantity && (
                  <p className="text-red-500 text-xs">{errors.total_quantity?.message}</p>
                )}
              </div>

              <div className='flex flex-wrap gap-4 items-center justify-between'>

                {/* Discount */}
                <div className='w-full md:w-1/3'>
                  <label className="font-bold text-gray-700 text-xs mb-2">Discount</label>
                  <input
                    type="number"
                    {...register('discount', {
                      required: 'Discount is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Code must contain only letters and numbers"
                      }
                    })}
                    placeholder="Enter discount value"
                    className="w-full p-2 border rounded text-gray-700 text-sm"
                  />
                  {errors.discount && <p className="text-red-500 text-xs">{errors.discount?.message}</p>}
                </div>

                {/* Shipping Fee */}
                <div className='w-full md:w-1/3'>
                  <label className="font-bold text-gray-700 text-xs mb-2">Shipping Fee</label>
                  <input
                    type="number"
                    step="any"
                    {...register('shipping_fee', {
                      required: 'Shipping fee is required',
                      pattern: {
                        value: /^\d+(\.\d+)?$/ ,
                        message: "Shipping Fee must contain only numbers"
                      }
                    })}
                    placeholder="Enter shipping fee"
                    className="w-full p-2 border rounded text-gray-700 text-sm"
                  />
                  {errors.shipping_fee && (
                    <p className="text-red-500 text-xs">{errors.shipping_fee?.message}</p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="font-bold text-gray-700 text-xs mb-2">Status</label>
                <select
                  {...register('status', { required: 'Status is required' })}
                  className="w-full p-2 border rounded text-gray-700 text-sm"
                >
                  <option value="" disabled>Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && <p className="text-red-500 text-xs">{errors.status?.message}</p>}
              </div>

              <div className='flex items-center justify-between w-full'>
                {/* Discount Start */}
                <div className='w-full md:w-1/3'>
                  <label className="font-bold text-gray-700 text-xs mb-2">Discount Start Date</label>
                  <input
                    type="date"
                    {...register('discount_start', { required: 'Discount start date is required' })}
                    className="w-full p-2 border rounded text-gray-700 text-sm"
                  />
                  {errors.discount_start && (
                    <p className="text-red-500 text-xs">{errors.discount_start?.message}</p>
                  )}
                </div>

                {/* Discount End */}
                <div className='w-full md:w-1/3'>
                  <label className="font-bold text-gray-700 text-xs mb-2">Discount End Date</label>
                  <input
                    type="date"
                    {...register('discount_end', { required: 'Discount end date is required' })}
                    className="w-full p-2 border rounded text-gray-700 text-sm"
                  />
                  {errors.discount_end && (
                    <p className="text-red-500 text-xs">{errors.discount_end?.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="block">
            <div className="flex items-center gap-x-10">
              {/* Label and Toggle Icon */}
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Features</h2>
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)} // Toggle visibility
                className="text-gray-500 hover:text-gray-700"
              >
                {isOpen ? (
                  <span>&#9650; {/* Up arrow */}</span>
                ) : (
                  <span>&#9660; {/* Down arrow */}</span>
                )}
              </button>
            </div>
            {/* Collapsible Content */}
            {isOpen && (
              <div className="space-y-2 mt-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <input
                      {...register(`features.${index}.value`, { required: true })}
                      className="w-full p-2 border rounded-md text-gray-700 text-sm"
                      defaultValue={field.value}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ value: "" })}
                  className="text-primaryColor mt-2 bg-primaryColor text-white px-3 py-1 rounded"
                >
                  Add Feature
                </button>
              </div>
            )}
          </div>

          {/* Additions */}
          <div className='grid md:grid-cols-3 gap-3'>
            {/* Barcode */}
            <div>
              <label className="font-bold text-xs text-gray-700">Barcode</label>
              <input
                type="text"
                {...register('barcode',
                  {
                    required: 'Barcode is required',
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "Code must contain only letters and numbers"
                    }
                  }
                )}
                placeholder="Enter barcode"
                className="w-full p-2 border rounded text-gray-700 text-sm"
              />
              {errors.barcode && <p className="text-red-500 text-xs">{errors.barcode?.message}</p>}
            </div>

            {/* Sales */}
            <div>
              <label className="font-bold text-xs text-gray-700">Sales</label>
              <input
                type="number"
                {...register('sales', { required: 'Sales value is required' })}
                placeholder="Enter sales value"
                className="w-full p-2 border rounded text-gray-700 text-sm"
              />
              {errors.sales && <p className="text-red-500 text-xs">{errors.sales?.message}</p>}
            </div>

            {/* Current Sold Items */}
            <div>
              <label className="font-bold text-xs text-gray-700">Current Sold Items</label>
              <input
                type="number"
                {...register('current_sold_items', { required: 'Current sold items are required' })}
                placeholder="Enter current sold items"
                className="w-full p-2 border rounded text-gray-700 text-sm"
              />
              {errors.current_sold_items && (
                <p className="text-red-500 text-xs">{errors.current_sold_items?.message}</p>
              )}
            </div>

            {/* Product Type */}
            <div>
              <label className="font-bold text-xs text-gray-700">Product Type</label>
              <select
                {...register('product_type_id', { required: 'Product type is required' })}
                className="w-full p-2 border rounded text-gray-700 text-sm"
              >
                <option value="" disabled>Select product type</option>
                {productTypes.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.product_type_id && (
                <p className="text-red-500 text-xs">{errors.product_type_id?.message}</p>
              )}
            </div>

            {/* Currency */}
            <div>
              <label className="font-bold text-xs text-gray-700">Currency</label>
              <select
                {...register('currency_id', { required: 'Currency is required' })}
                className="w-full p-2 border rounded text-gray-700 text-sm"
              >
                <option value="" disabled>Select currency</option>
                {currencies.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.currency_id && (
                <p className="text-red-500 text-xs">{errors.currency_id?.message}</p>
              )}
            </div>

            {/* Store */}
            <div>
              <label className="font-bold text-xs text-gray-700">Store</label>
              <select
                {...register('store_id', { required: 'Store is required' })}
                className="w-full p-2 border rounded text-gray-700 text-sm"
              >
                <option value="" disabled>Select store</option>
                {stores.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.store_id && (
                <p className="text-red-500 text-xs">{errors.store_id?.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/products')}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primaryColor text-white px-4 py-2 rounded-md w-auto md:w-[90px] items-center"
              disabled={localLoading}
            >
              {localLoading ? 
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
            </svg> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditForm;
