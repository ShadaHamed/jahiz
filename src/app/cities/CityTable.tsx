'use client'

import DynamicTable from '@/components/table/Table'
import { useCityGlobal } from './cityContex';
import Pagination from '@/components/table/pagination';
import cityRepository from '@/apiCalls/cityRepository';
import { toast } from 'react-toastify';



const CityTable = () => {

  const {processedCities, pages, pageNumber, loading, setLoading} = useCityGlobal();
  const columns= ['english_name', 'arabic_name', 'status'];

  const deleteData: {
    type: string;
  } = {
    type: 'in-active',
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this city?');
    if (!confirmed) return;
    try {
        await cityRepository.deleteCity(id); // Call the API to delete the user
        toast.success('City deleted successfully!');
        window.location.reload(); // Refresh the page
        
    } catch (error) {
        toast.error('Failed to delete city. Please try again.');
    } 
};

  return (
    <div>
      <DynamicTable 
        columns={columns}
        data={processedCities}
        editLink="/cities/edit"
        handleDelete={handleDelete} 
        isLoading={loading} />
        
      <Pagination
        pageNumber={pageNumber}
        pages={pages}
        route="/cities"

      />
    </div>
  )
}

export default CityTable