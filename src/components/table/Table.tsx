'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons
import { Repository } from '@/utils/types';

//@ts-nocheck
type DynamicTableProps<T extends Record<string, any>> = {
  columns: (keyof T)[];
  data: T[];
  editLink: string;
  deleteData?: {
    link: string
    type: string;
    repository: Repository
  }
};

//@ts-nocheck
function DynamicTable<T extends Record<string, any>>({
  columns,
  data,
  editLink,
  deleteData
}: DynamicTableProps<T>) {
console.log('data from D-tyble', data)
  const [filteredData, setFilteredData] = useState(data);
  const [deleting, setDeleting] = useState<string | null>(null); // Track deleting user
  console.log('Filtered Data:', filteredData); // Check if rows are being passed
  console.log('Columns:', columns); // Check if columns are defined
  
  useEffect(() => {
    console.log('Data changed:', data); // Log updates to `data`
    setFilteredData(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    const deletedItem = deleteData?.type;
    const confirmed = confirm(`Are you sure you want to delete this ${deletedItem}?`);
    if (!confirmed) return;

    try {
      setDeleting(id); // Show loading state for the specific row
      await deleteData?.repository.deleteUser(id); // Replace with your delete API call
      alert(`${deletedItem} deleted successfully!`);
      setFilteredData((prevData) =>
        prevData.filter((item) => item.id !== id)
      ); // Remove user from the table
    } catch (error) {
      console.error(`Error deleting ${deletedItem}:`, error);
      alert(`Failed to delete ${deletedItem}. Please try again.`);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="overflow-x-auto w-full">
        <div className="min-w-full inline-block align-middle p-4">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 text-left rtl:text-right">
              <thead>
                <tr className="bg-gray-100">
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      {column.toString()}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-700"
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200`}
                      >
                        {(() => {
                          console.log('message from console')
    // const value = row[column];
    // console.log(`Value for column ${String(column)}:`, value); // Log the value
    // return value !== undefined && value !== null ? value.toString() : 'N/A';
  })()}
                        {row[column] !== undefined && row[column] !== null
                          ? row[column].toString()
                          : 'N/A'}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primaryColor dark:text-neutral-200">
                      <div className="flex justify-between items-center space-x-4">
                        <Link
                          href={`${editLink}/${row.id}`}
                          className="text-primaryColor hover:text-blue-500"
                        >
                          <FaEdit size={16} />
                        </Link>
                        {deleteData ? (
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="text-red-600 hover:text-red-800"
                            disabled={deleting === row.id} // Disable button while deleting
                          >
                            {deleting === row.id ? (
                              <span>Deleting...</span>
                            ) : (
                              <FaTrashAlt size={16} />
                            )}
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;
