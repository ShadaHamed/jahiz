'use client'

import DynamicTable from '@/components/table/Table'
import { User } from '@/utils/types'
import { useGlobal } from '../userContext';
import Pagination from '@/components/table/pagination';
import userRepository from '@/apiCalls/userRepository';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import TableSkeleton from './TableSkeleton';

const UserTable = () => {

  const {processedUsers, pages, pageNumber,refrechUsers, loading} = useGlobal();
  const router = useRouter();
  const columns: Array<keyof User>= ['name', 'phone_number', 'address', 'email','role'];
  const deleteData: {
    type: string;
  } = {
    type: 'in-active',
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
        await userRepository.deleteUser(id); // Call the API to delete the user
        toast.success('User deleted successfully!');

        const currentUrl = window.location.pathname;
        const params = new URLSearchParams(window.location.search);

        // Check if it's the last item on the last page
        if (pages === pageNumber && processedUsers.length === 1) {
          if (pageNumber > 1) {
            params.set('pageNumber', (pageNumber - 1).toString()); // Update to the previous page
          }
          // Update the URL without reloading the page
          router.push(`${currentUrl}?${params.toString()}`);
          await refrechUsers();
        } else {
          // Reload the page to reflect the changes
          window.location.reload();
        }
        
    } catch (error) {
        toast.error('Failed to delete user. Please try again.');
    }
};

  return (
    <div>
      { loading? <TableSkeleton />
      : <DynamicTable 
        columns={columns}
        data={processedUsers}
        editLink="/users/edit"
        handleDelete={handleDelete} 
         />
      }
        
      {!loading && <Pagination
        pageNumber={pageNumber}
        pages={pages}
        route="/users"
      />}

    </div>
  )
}

export default UserTable