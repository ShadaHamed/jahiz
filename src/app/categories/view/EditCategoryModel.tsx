"use client";
import { useState, Dispatch, SetStateAction, FormEvent, useEffect } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import categoryRepository from '@/apiCalls/categoriesRepository';
import Image from 'next/image';
import { useCategoryContext } from '../categoryContext';

interface UpdateCategoryModalProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    text: string;
    image: string | null; // Base64 string or null
    categoryID: string;
    onCategoryUpdated: () => Promise<void>;
}

const UpdateCategoryModal = ({ setOpen, text, image, categoryID, onCategoryUpdated }: UpdateCategoryModalProps) => {
    const [updatedText, setUpdatedText] = useState(text);
    const [updatedImage, setUpdatedImage] = useState<string | null>(image);
    const [previewImage, setPreviewImage] = useState<string | null>(image);
    const [updatedStatus, setUpdatedStatus] = useState<string>(status);
    const {loading, setLoading} = useCategoryContext();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const base64String = reader.result as string;
              if (previewImage) setPreviewImage(base64String); // Update preview

              setPreviewImage(base64String); // Set preview as base64
              setUpdatedImage(base64String); // Store as base64
            };
            reader.readAsDataURL(file); // Convert file to base64
        }
    };

    const formSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (updatedText === "") return toast.info("Please write something");
        setLoading(true);
        try {
            await categoryRepository.updateCategory(categoryID, {
            category_Name: updatedText,
            category_Image: updatedImage, // Base64 string
            status: updatedStatus,
            });
            await onCategoryUpdated();
            setUpdatedText("");
            setUpdatedImage(null);
            toast.success("Category updated successfully")
            setOpen(false);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
        finally {
          setLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="w-11/12 lg:w-2/4 bg-white rounded-lg p-3">
                <div className="flex justify-end items-start mb-5">
                    <IoMdCloseCircleOutline onClick={() => setOpen(false)} className="text-red-500 cursor-pointer text-3xl" />
                </div>
                <form onSubmit={formSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Edit Category Name..."
                        className="text-lg rounded-lg p-2 w-full bg-white mb-2"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    />
                    {previewImage && (
                        <div className="mt-3">
                            <Image
                                src={previewImage}
                                alt="Preview"
                                width={80}
                                height={80}
                                className="rounded-full mb-2"
                            />
                        </div>
                    )}

                    <select
                        className="w-full rounded-lg p-2 bg-white mb-2"
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <button type="submit" className="flex items-center justify-center bg-primaryColor w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-primaryColor_2 transition">
                        {loading? 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-7 w-7 animate-spin">
                          <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stop-color="#FBFFFF"></stop><stop offset=".3" stop-color="#FBFFFF" stop-opacity=".9"></stop><stop offset=".6" stop-color="#FBFFFF" stop-opacity=".6"></stop><stop offset=".8" stop-color="#FBFFFF" stop-opacity=".3"></stop><stop offset="1" stop-color="#FBFFFF" stop-opacity="0"></stop></radialGradient>
                          <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
                          <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                          </circle>
                          <circle transform-origin="center" fill="none" opacity=".2" stroke="#FBFFFF" stroke-width="15" stroke-linecap="round" cx="100" cy="100" r="70"></circle>
                          </svg>
                         : 'Edit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateCategoryModal;
