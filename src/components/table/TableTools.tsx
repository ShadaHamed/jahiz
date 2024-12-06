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
    <div className="flex w-full md:w-auto flex-row gap-4 md:justify-between items-center my-8">
      {/* Search Box */}
      <div className=''>
        <SearchBox />
      </div>

      {/* Filter Box */}
      <div className=''>
        <FilterBox data={data} />
      </div>

      {/* Export PDF */}
      <div className="w-full md:w-40 flex items-center md:justify-center md:bg-gray-100 md:px-4 md:rounded-md">
          <ExportPDF contentRef={contentRef} />
      </div>
    </div>
  );
}

export default TableTools