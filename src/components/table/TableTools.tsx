import FilterBox from './FilterBox';
import SearchBox from './SearchBox';
import ExportPDF from './ExportPDF';

interface TableToolsProps {
//@ts-nocheck
data: any;
contentRef: React.RefObject<HTMLDivElement>;
}

const TableTools = ({data, contentRef}: TableToolsProps) => {
  return (
    <div className="flex w-full md:w-auto flex-row justify-start xl:justify-between items-center my-8">
      {/* Search Box */}
      <div className='mr-4'>
        <SearchBox />
      </div>

      {/* Filter Box */}
      <div className=''>
        <FilterBox data={data} />
      </div>

      {/* Export PDF */}
      <div className="flex items-start xl:w-40 xl:items-center justify-center xl:justify-center xl:bg-gray-100 xl:px-4 xl:rounded-md focus:shadow-md  active:bg-primaryColor active:text-white">
          <ExportPDF contentRef={contentRef} />
      </div>
    </div>
  );
}

export default TableTools