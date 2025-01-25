import React from 'react'
import { Currency, Product, ProductType, Store } from '@/utils/types';
import { UseFormRegister, FieldErrors, FieldValues, UseFormSetError , UseFormClearErrors  } from "react-hook-form";

type details = Omit<Product, 'id' | 'name' | 'code' | 'description' | 'features' | 'total_quantity' | 'sale_price' | 'status' | 'discount' | 'shipping_fee' | 'discount_start' | 'discount_end' | 'barcode' | 'sales' | 'current_sold_items' | 'product_type_id' | 'currency_id' | 'store_id' | 'image' >;

interface AdditionalDetailsProps<T extends FieldValues> {
  formData: details;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<T>;  
  errors: FieldErrors<T>;        
  setError: UseFormSetError <T>;         
  clearErrors: UseFormClearErrors<T>;
  productTypeOptions: ProductType[]; 
  currencyOptions: Currency[]; 
  storeOptions: Store[];
}

const AdditionalDetails:React.FC<AdditionalDetailsProps<Product>> = ({register,errors, setError, clearErrors, 
  formData,
  handleChange,  
  productTypeOptions,
  currencyOptions,
  storeOptions,}) => {

  return (
    <div className='flex flex-col space-y-4'>
      {/* Barcode */}
      <div>
        <label className="font-bold text-xs text-gray-500">Barcode</label>
        <input
          type="text"
          {...register('barcode',
            { required: 'Barcode is required',
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Barcode must contain only letters and numbers"
              }
             }
          )}
          placeholder="Enter barcode"
          className="w-full p-2 border rounded"
        />
        {errors.barcode && <p className="text-red-500 text-sm">{errors.barcode?.message}</p>}
      </div>

      {/* Sales */}
      <div>
        <label className="font-bold text-xs text-gray-500">Sales</label>
        <input
          type="number"
          {...register('sales', { 
            required: 'Sales value is required',
            pattern: {
              value: /^[0-9]+$/ ,
              message: "Sales must contain only numbers"
            }
           })}
          placeholder="Enter sales value"
          className="w-full p-2 border rounded"
        />
        {errors.sales && <p className="text-red-500 text-sm">{errors.sales?.message}</p>}
      </div>

      {/* Current Sold Items */}
      <div>
        <label className="font-bold text-xs text-gray-500">Current Sold Items</label>
        <input
          type="number"
          {...register('current_sold_items', { 
            required: 'Current sold items are required',
            pattern: {
              value: /^[0-9]+$/ ,
              message: "Current Sold Items must contain only numbers"
            } })}
          placeholder="Enter current sold items"
          className="w-full p-2 border rounded"
        />
        {errors.current_sold_items && (
          <p className="text-red-500 text-sm">{errors.current_sold_items?.message}</p>
        )}
      </div>

      {/* Product Type */}
      <div>
        <label className="font-bold text-xs text-gray-500">Product Type</label>
        <select
          {...register('product_type_id', { required: 'Product type is required' })}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Select product type</option>
          {productTypeOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {errors.product_type_id && (
          <p className="text-red-500 text-sm">{errors.product_type_id?.message}</p>
        )}
      </div>

      {/* Currency */}
      <div>
        <label className="font-bold text-xs text-gray-500">Currency</label>
        <select
          {...register('currency_id', { required: 'Currency is required' })}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Select currency</option>
          {currencyOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {errors.currency_id && (
          <p className="text-red-500 text-sm">{errors.currency_id?.message}</p>
        )}
      </div>

      {/* Store */}
      <div>
        <label className="font-bold text-xs text-gray-500">Store</label>
        <select
          {...register('store_id', { required: 'Store is required' })}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>Select store</option>
          {storeOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {errors.store_id && (
          <p className="text-red-500 text-sm">{errors.store_id?.message}</p>
        )}
      </div>
    </div>
  )
}

export default AdditionalDetails