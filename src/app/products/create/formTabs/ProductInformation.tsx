import React, { useEffect, useState } from "react";
import { Product, ProductType } from "@/utils/types";
import {
  Control,
  UseFormRegister,
  FieldErrors,
  FieldValues,
  UseFormSetError,
  UseFormClearErrors,
  UseFormSetValue,
  Path,
  useFieldArray
} from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

type ProductInfo = Omit<
  Product,
  | "id"
  | "total_quantity"
  | "sale_price"
  | "status"
  | "discount"
  | "shipping_fee"
  | "discount_start"
  | "discount_end"
  | "barcode"
  | "sales"
  | "current_sold_items"
  | "product_type_id"
  | "currency_id"
  | "store_id"
>;

interface ProductInformationProps<T extends FieldValues> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  setValue: UseFormSetValue<T>;
}

const ProductInformation: React.FC<ProductInformationProps<Product>> = ({
  control,
  register,
  errors,
  setError,
  clearErrors,
  handleChange,
  setValue,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loacalLoading, setLocalLoading] = useState(false);

  // UseFieldArray for managing features
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features", // This must match the field name in the form
  });

  const addFeature = () => {
    if (fields.length >= 10) {
      toast.error("You can only add up to 10 features.");
      return;
    }
    append({ value: "" }); // Append a new empty feature
  };

  const removeFeature = (index: number) => {
    remove(index);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result as string;

      const processedImage = await removeBackground(base64Image);
      if (processedImage) {
        setImagePreview(processedImage)
        setLocalLoading(false)
        // Store `processedImage` (base64) with form data
        setValue("image", processedImage);
      } else {
        console.error('Failed to process image');
      }
    };
    reader.readAsDataURL(file);
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

  const removeImage = () => {
    setImagePreview(null);
    setValue("image", null);
  };

  return (
    <div className="w-full flex gap-4">

      {/* Product Details Section */}
      <div className="w-full md:w-2/3 space-y-4">
        <div className="flex gap-4">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Product name is required" })}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
            )}
          </div>

          {/* Product Code */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Code
            </label>
            <input
              type="text"
              {...register("code", { required: "Product code is required" })}
              placeholder="Enter product code"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1">{errors.code?.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 resize-none"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description?.message}
            </p>
          )}
        </div>

        {/* Features Section */}
        <div className="w-full">
          <div className="font-bold text-gray-700 text-sm mb-2">Features</div>
          <div className="bg-white p-3 border border-gray-200 rounded max-h-40 overflow-y-auto">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  {...register(`features.${index}.value`, {
                    validate: (value) =>
                      value.length > 0 || "Feature cannot be empty",
                  })}
                  placeholder={`Feature ${index + 1}`}
                  className={`w-full border rounded px-2 py-1 text-gray-700 text-sm`}
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeFeature(index)}
                  disabled={fields.length === 1}
                >
                  <FaMinus />
                </button>
              </div>
            ))}
            {fields.length < 10 && (
              <button
                type="button"
                className="mt-2 bg-primaryColor text-white px-3 py-1 rounded text-sm"
                onClick={addFeature}
              >
                <FaPlus className="inline mr-1" />
                Add Feature
              </button>
            )}
          </div>
          {errors.features && (
            <p className="text-red-500 text-sm mt-1">
              {errors.features?.message}
            </p>
          )}
        </div>
      </div>


      {/* Image Upload Section */}
      <div className="w-full md:w-1/3">
        <div className="flex flex-col items-center">
          {loacalLoading ? (
            <div className="text-gray-500 bg-gray-50 flex items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg">
              <span className="">Uploading...</span>
            </div>
          ) : (
            imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="text-center">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 800x400px)</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )
          )}

        </div>
        {errors.image && (
          <p className="text-red-500 text-sm mt-2">{errors.image?.message}</p>
        )}
      </div>
    </div>
  );
};

export default ProductInformation;
