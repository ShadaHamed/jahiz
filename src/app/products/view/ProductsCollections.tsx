import React, { useEffect, useState } from 'react';
import { useProductsContext } from '../productcontext';
import Image from 'next/image';
import SkeletonLoadingProducts from '../SkeletonLoadingProducts';
import Pagination from '@/components/table/pagination';
import { useRouter } from 'next/navigation';
import productRepository from '@/apiCalls/productsRepository';
import { toast } from 'react-toastify';
import { ProductType } from '@/utils/types';
import productTypeRepository from '@/apiCalls/productTypesRepository';

function ProductsCollections() {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const { currentPageProducts, loading, pageNumber, pages, refetchProducts } = useProductsContext();
  const router = useRouter();

  const toggleDropdown = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      setDropdownOpen(null);
      await productRepository.deleteProduct(id);
      toast.success('Product deleted successfully!');
      await refetchProducts();
    } catch {
      toast.error('Failed to delete product. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productTypesData = await productTypeRepository.getAllProductTypes();
        setProductTypes(productTypesData); 
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col items-center justify-between'>
      <section
        id="Projects"
        className="rounded-lg px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-4 2xl:grid-cols-6 justify-items-center gap-y-8 gap-x-6 md:gap-y-10 md:gap-x-8 mb-5"
        >
        {loading ? (
          <SkeletonLoadingProducts count={8} />
        ) : currentPageProducts.length > 0 ? (
          currentPageProducts.map((product, index) => {
            const productTypeName = productTypes?.find(
              (type) => type.id === product.product_type_id
            )?.name || 'Unknown';

            return (
              <div
                key={product.id}
                className="relative w-60 bg-white shadow-md rounded-lg duration-300 hover:scale-105 hover:shadow-lg"
              >
                <button
                  id={`dropdownButton-${index}`}
                  onClick={() => toggleDropdown(index)}
                  className="absolute top-2 right-2 text-slate-300 hover:bg-secondaryColor/50 rounded-lg p-1.5"
                  aria-expanded={dropdownOpen === index}
                  aria-controls={`dropdown-${index}`}
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 3 16"
                  >
                    <path d="M0 2a1.5 1.5 0 1 1 3 0A1.5 1.5 0 0 1 0 2Zm0 6.041a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM0 14a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>
                </button>
                <div
                  id={`dropdown-${index}`}
                  className={`absolute right-2 top-10 z-10 ${
                    dropdownOpen === index ? 'block' : 'hidden'
                  } bg-white border rounded-lg shadow-md`}
                >
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => router.push(`/products/edit/${product.id}`)}
                        className="block px-4 py-2 text-primaryColor hover:bg-light"
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="block px-4 py-2 text-red-600 hover:bg-light"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
                <Image
                  src={product.image || '/product_placeholder.png'}
                  alt="Product"
                  width={240}
                  height={192}
                  className="h-48 w-60 bg-slate-400 object-cover rounded-t-lg p-2"
                />
                <div className="px-3 py-2">
                  <span className="text-gray-400 uppercase text-xs">{productTypeName}</span>
                  <p className="text-sm font-bold truncate">{product.name}</p>
                  <div className="flex items-center mt-2">
                    <p className="text-sm font-semibold">{`$${(
                      product.sale_price -
                      (product.sale_price * product.discount) / 100
                    ).toFixed(2)}`}</p>
                    <del className="text-xs text-gray-600 ml-2">{`$${product.sale_price}`}</del>
                    <button
                      onClick={() => router.push(`/products/details/${product.id}`)}
                      className="ml-auto bg-primaryColor text-white text-xs px-4 py-2 rounded-md"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </section>
      <div className="w-full flex justify-center mt-10">
        <Pagination pageNumber={pageNumber} pages={pages} route="/products" />
      </div>
    </div>
  );
}

export default ProductsCollections;
