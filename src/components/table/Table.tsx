'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons

import SkeletonTable from './SkeletonTable';

//@ts-nocheck
type DynamicTableProps<T extends Record<string, any>> = {
  columns: (keyof T)[];
  data: T[];
  editLink: string;
  handleDelete?: (id :string) => void;
  isLoading?: boolean;
};

function DynamicTable<T extends Record<string, any>>({
  columns,
  data,
  editLink,
  handleDelete,
  isLoading = false,
}: DynamicTableProps<T>) {
  const [filteredData, setFilteredData] = useState(data);
  const [deleting, setDeleting] = useState<string | null>(null); // Track deleting user
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="overflow-x-auto w-full">
        <div className="min-w-full inline-block align-middle p-4">
          <div className="overflow-hidden rounded-lg">
          {isLoading ? (
              // Show loading spinner or message
              
              <SkeletonTable columns={columns}/>
            ): (
            <table className="min-w-full divide-y divide-gray-200 text-left rtl:text-right rounded-lg">
              <thead>
                <tr className="bg-primaryColor">
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-start text-xs sm:text-sm font-medium text-white uppercase"
                    >
                      {column.toString()}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50"
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={`px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800`}
                      >
                      
                        {row[column] !== undefined && row[column] !== null
                          ? row[column].toString()
                          : 'N/A'}
                      </td>
                    ))}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-primaryColor">
                      <div className="flex justify-between items-center space-x-4">
                        <Link
                          href={`${editLink}/${row.id}`}
                          className="text-primaryColor hover:text-purple-950"
                        >
                          <FaEdit size={16} />
                        </Link>
                        {/* {deleteData?.type === "hard" ? ( */}
                          <button
                            onClick={() => handleDelete && handleDelete(row.id)}
                            className="text-red-600 hover:text-red-800"
                            disabled={deleting === row.id} // Disable button while deleting
                          >
                            {deleting === row.id ? (
                              <span>Deleting...</span>
                            ) : (
                              <FaTrashAlt size={16} />
                            )}
                          </button>
                        {/* ) : (
                          (<button
                            className="text-red-600 hover:text-red-800"
                            disabled={deleting === row.id} // Disable button while deleting
                          >
                            {deleting === row.id ? (
                              <span>Deleting...</span>
                            ) : (
                              <FaTrashAlt size={16} />
                            )}
                          </button>)
                        )} */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;
