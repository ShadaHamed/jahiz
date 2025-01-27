import React from 'react'
import { Product } from '@/utils/types';
import { UseFormRegister, FieldErrors, FieldValues, UseFormSetError , UseFormClearErrors  } from "react-hook-form";

type InventoryAndPricingType = Omit<Product, 'id' | 'name' | 'code' | 'description' | 'features' | 'barcode' | 'sales' | 'current_sold_items' | 'product_type_id' | 'currency_id' | 'store_id' | 'image'>;

interface InventoryAndPricingProps<T extends FieldValues> {
  formData: InventoryAndPricingType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<T>;  
  errors: FieldErrors<T>;        
  setError: UseFormSetError <T>;         
  clearErrors: UseFormClearErrors<T>;
}

const InventoryAndPricing: React.FC<InventoryAndPricingProps<Product>> = ({register,errors, setError, clearErrors, formData, handleChange}) => {
  return (
    <div className='flex flex-col space-y-4'>
      {/* Total Quantity */}
      <div>
        <label className="font-bold text-gray-700 text-sm mb-2">Total Quantity</label>
        <input
          type="number"
          {...register('total_quantity', { 
            required: 'Total quantity is required',
            pattern: {
              value: /^[0-9]+$/ ,
              message: "Total Quantity must contain only numbers"
            }
            })}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/^0+/, '');
            }}
          placeholder="Enter total quantity"
          className="w-full p-2 border rounded"
        />
        {errors.total_quantity && (
          <p className="text-red-500 text-sm">{errors.total_quantity?.message}</p>
        )}
      </div>

      <div className='flex flex-wrap gap-4 items-center justify-between'>
          {/* Sale Price */}
          <div className='w-full md:w-1/3'>
            <label className="font-bold text-gray-700 text-sm mb-2">Sale Price</label>
            <input
              type="number"
              step="any"
              {...register('sale_price', { 
                required: 'Sale price is required',
                pattern: {
                  value: /^\d+(\.\d+)?$/ ,
                  message: "sale_price must contain only numbers"
                } })}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/^0+/, '');
                }}
              placeholder="Enter sale price"
              className="w-full p-2 border rounded"
            />
            {errors.sale_price && (
              <p className="text-red-500 text-sm">{errors.sale_price?.message}</p>
            )}
          </div>

            {/* Shipping Fee */}
            <div className='w-full md:w-1/3'>
            <label className="font-bold text-gray-700 text-sm mb-2">Shipping Fee</label>
            <input
              type="number"
              step="any"
              {...register('shipping_fee', { 
                required: 'Shipping fee is required',
                pattern: {
                  value: /^\d+(\.\d+)?$/ ,
                  message: "Shipping fee must contain only numbers"
                } })}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/^0+/, '');
                }}
              placeholder="Enter shipping fee"
              className="w-full p-2 border rounded"
            />
            {errors.shipping_fee && (
              <p className="text-red-500 text-sm">{errors.shipping_fee?.message}</p>
            )}
          </div>
      </div>

          {/* Status */}
          <div>
            <label className="font-bold text-gray-700 text-sm mb-2">Status</label>
            <select
              {...register('status', { required: 'Status is required' })}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status?.message}</p>}
          </div>

      {/* Discount */}
      <div>
        <label className="font-bold text-gray-700 text-sm mb-2">Discount</label>
        <input
          type="number"
          {...register('discount', { 
            required: 'Discount is required',
            pattern: {
              value: /^[0-9]+$/ ,
              message: "discount must contain only numbers"
            } })}
          placeholder="Enter discount value"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/^0+/, '');
          }}          className="w-full p-2 border rounded"
        />
        {errors.discount && <p className="text-red-500 text-sm">{errors.discount?.message}</p>}
      </div>

      <div className='flex flex-wrap items-center justify-between'>
         {/* Discount Start */}
      <div className='w-full md:w-1/3'>
        <label className="font-bold text-gray-700 text-sm mb-2">Discount Start Date</label>
        <input
          type="date"
          {...register('discount_start', { required: 'Discount start date is required' })}
          className="w-full p-2 border rounded"
        />
        {errors.discount_start && (
          <p className="text-red-500 text-sm">{errors.discount_start?.message}</p>
        )}
      </div>

      {/* Discount End */}
      <div className='w-full md:w-1/3'>
        <label className="font-bold text-gray-700 text-sm mb-2">Discount End Date</label>
        <input
          type="date"
          {...register('discount_end', { required: 'Discount end date is required' })}
          className="w-full p-2 border rounded"
        />
        {errors.discount_end && (
          <p className="text-red-500 text-sm">{errors.discount_end?.message}</p>
        )}
      </div>
      </div>
     
    </div>
  )
}

export default InventoryAndPricing