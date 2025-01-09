
export default function SkeletonTable ({ columns }: { columns: any[] }) {
    return (
      <table className="min-w-full h-[30vh] divide-y divide-gray-200 text-left rtl:text-right rounded-lg">
        <thead>
          <tr className="bg-primaryColor">
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 sm:px-6 py-3 text-start text-xs sm:text-sm font-medium text-white uppercase"
              >
                {column}
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
          {[...Array(5)].map((_, rowIndex) => (
            <tr key={rowIndex} className="animate-pulse">
              {columns.map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-800"
                >
                  <div className="h-4 bg-gray-300 rounded-md"></div>
                </td>
              ))}
              <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-primaryColor">
                <div className="flex justify-between items-center space-x-4">
                  <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    );
  };
  