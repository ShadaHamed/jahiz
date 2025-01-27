'use client'

import DynamicTable from '@/components/table/Table'
import { useCurrencyGlobal } from '@/app/currencies/currencyContext'
import Pagination from '@/components/table/pagination';
import currencyRepository from '@/apiCalls/CurrencyRepository';
import { toast } from 'react-toastify';

const CurrencyTable = () => {
  const {filteredCurrencies, pages, pageNumber, loading, setLoading} = useCurrencyGlobal();
  const columns= ['name', 'symbol', 'iso_code'];

  const deleteData: {
    type: string;
  } = {
    type: 'in-active',
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this currency?');
    if (!confirmed) return;
    try {
        await currencyRepository.deleteCurrency(id) 
        toast.success('Currency eleted successfully!');
        window.location.reload(); 
        
    } catch (error) {
        toast.error('Failed to delete currency. Please try again.');
    } 
};
  return (
<div>
      <DynamicTable 
        columns={columns}
        data={filteredCurrencies}
        editLink="/currencies/edit"
        handleDelete={handleDelete} 
        isLoading={loading} />
        
      {!loading && <Pagination
        pageNumber={pageNumber}
        pages={pages}
        route="/currencies"

      />}
    </div>  )
}

export default CurrencyTable