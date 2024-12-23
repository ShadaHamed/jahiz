// import FilterBox from './FilterBox';
import SearchBox from './SearchBox';
import ExportPDF from './ExportPDF';

interface TableToolsProps {
//@ts-nocheck
data: any;
contentRef: React.RefObject<HTMLDivElement>;
}

const TableTools = ({data, contentRef}: TableToolsProps) => {
  return (
    <div className="flex w-full md:w-auto flex-row md:justify-between items-center my-8">
      {/* Search Box */}
      <div className='mr-4'>
        <SearchBox />
      </div>

      {/* Filter Box */}
      <div className=''>
        {/* <FilterBox data={data} /> */}
      </div>

      {/* Export PDF */}
      <div className="w-full lg:w-40 flex items-center lg:justify-center lg:bg-gray-100 lg:px-4 lg:rounded-md">
          <ExportPDF contentRef={contentRef} />
      </div>
    </div>
  );
}

export default TableTools