'use client'

import DynamicTable from '@/components/table/Table'
import { Role, User } from '@/utils/types'
import { useGlobal } from '../userContext';
import Pagination from '@/components/table/pagination';
import userRepository from '@/apiCalls/userRepository';
import { toast } from 'react-toastify';



const UserTable = () => {

  const {processedUsers, pages, pageNumber} = useGlobal();
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
        window.location.reload(); // Refresh the page
        
    } catch (error) {
        toast.error('Failed to delete user. Please try again.');
    }
};

  return (
    <div>
      <DynamicTable columns={columns} data={processedUsers} editLink="/users/edit" handleDelete={handleDelete} />
      <Pagination
        pageNumber={pageNumber}
        pages={pages}
        route="/users"
      />
    </div>
  )
}

export default UserTable