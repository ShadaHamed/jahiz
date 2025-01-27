'use client'

import DynamicTable from '@/components/table/Table'
import Pagination from '@/components/table/pagination';
import regionRepository from '@/apiCalls/regionRepository';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useRegionGlobal } from './regionContext';
import { number } from 'prop-types';



const RegionTable = () => {

  const {processedRegions, pages, pageNumber,refrechRegions, loading} = useRegionGlobal();
  const router = useRouter();

  const columns= ['english_name', 'arabic_name', 'cityName', 'status'];

  const deleteData: {
    type: string;
  } = {
    type: 'in-active',
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this region?');
    if (!confirmed) return;

    try {
        await regionRepository.deleteRegion(id); // Call the API to delete the region
        toast.success('Region deleted successfully!');
        const currentUrl = window.location.pathname;
        const params = new URLSearchParams(window.location.search);

        // Check if it's the last item on the last page
        if (pages === pageNumber && processedRegions.length === 1) {
          if (pageNumber > 1) {
            params.set('pageNumber', (pageNumber - 1).toString()); // Update to the previous page
          }
          // Update the URL without reloading the page
          router.push(`${currentUrl}?${params.toString()}`);
          await refrechRegions();
        } else {
          // Reload the page to reflect the changes
          window.location.reload();
        }
        
    } catch (error) {
        toast.error('Failed to delete region. Please try again.');
    }
};

  return (
    <div>
      <DynamicTable 
        columns={columns}
        data={processedRegions}
        editLink="/regions/edit"
        handleDelete={handleDelete} 
        isLoading={loading} />
        
      <Pagination
        pageNumber={pageNumber}
        pages={pages}
        route="/regions"

      />
    </div>
  )
}

export default RegionTable