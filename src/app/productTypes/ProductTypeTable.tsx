'use client'

import DynamicTable from '@/components/table/Table'
import { useProductTypeGlobal } from '@/app/productTypes/productTypeContext'
import Pagination from '@/components/table/pagination';
import productTypeRepository from '@/apiCalls/productTypesRepository';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ProductTypeTable = () => {
    const {processedProductTypes, refrechProductTypes, pages, pageNumber, loading, setLoading} = useProductTypeGlobal();
    const columns= ['name', 'category_Name'];
    const router = useRouter();

    const handleDelete = async (id: string) => {
      const confirmed = confirm('Are you sure you want to delete this product type?');
      if (!confirmed) return;
      try {
          await productTypeRepository.deleteProductType(id) 
          toast.success('Product type deleted successfully!');
          const currentUrl = window.location.pathname;
          const params = new URLSearchParams(window.location.search);
           // Check if it's the last item on the last page
        if (pages === pageNumber && processedProductTypes.length === 1) {
          if (pageNumber > 1) {
            params.set('pageNumber', (pageNumber - 1).toString()); // Update to the previous page
          }
          // Update the URL without reloading the page
          router.push(`${currentUrl}?${params.toString()}`);
          await refrechProductTypes();
        } else {
          // Reload the page to reflect the changes
          window.location.reload();
        }
          
      } catch (error) {
          toast.error('Failed to delete product type. Please try again.');
      } 
  };
  return (
    <div>
        <DynamicTable 
        columns={columns}
        data={processedProductTypes}
        editLink="/productTypes/edit"
        handleDelete={handleDelete} 
        isLoading={loading} />
        
      {!loading && <Pagination
        pageNumber={pageNumber}
        pages={pages}
        route="/productTypes"

      />}
    </div>
  )
}

export default ProductTypeTable