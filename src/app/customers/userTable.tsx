'use client'

import DynamicTable from '@/components/table/Table'
import { User } from '@/utils/types'
import userRepository from '@/apiCalls/userRepository';
import { Repository } from '@/utils/types';

type UserTableProps = {
    users: User[];
  };

const UserTable: React.FC<UserTableProps>  = ({users}) => {
      // Preprocess users to include a combined name
  const processedUsers = (users || []).map(user => ({
    ...user,
    name: user.name && user.name.en && user.name.ar?
       `${user.name.en} (${user.name.ar})`: 'N/A' // Combine English and Arabic
  }));
    const columns: Array<keyof typeof processedUsers[0]> = ['name', 'phone_number', 'address', 'email','role'];

    const deleteData: {
      link: string;
      type: string;
      repository: Repository;
    } = {
      link: '/customers/delete',
      type: 'customer',
      repository: userRepository, 
    };
    console.log('processedUsers', processedUsers)
  return (
    <DynamicTable columns={columns} data={processedUsers} editLink="/customers/edit" deleteData={deleteData} />
  )
}

export default UserTable