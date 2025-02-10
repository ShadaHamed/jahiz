'use client'

import DynamicTable from '@/components/table/Table'
import { useProductTypeGlobal } from '@/app/productTypes/productTypeContext'
import Pagination from '@/components/table/pagination';
import productTypeRepository from '@/apiCalls/productTypesRepository';
import { toast } from 'react-toastify';

const ProductTypeTable = () => {
    const {processedProductTypes, pages, pageNumber, loading, setLoading} = useProductTypeGlobal();
    const columns= ['name', 'category_Name'];
  console.log('processed pro tyoe', processedProductTypes)
    const handleDelete = async (id: string) => {
      const confirmed = confirm('Are you sure you want to delete this product type?');
      if (!confirmed) return;
      try {
          await productTypeRepository.deleteProductType(id) 
          toast.success('Product type deleted successfully!');
          window.location.reload(); 
          
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