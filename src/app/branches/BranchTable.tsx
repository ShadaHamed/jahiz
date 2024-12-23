
import DynamicTable from '@/components/table/Table'
import { Branch } from '@/utils/types'
import { useGlobal } from './Context'
import Pagination from '@/components/table/pagination'

const BranchTable = () => {
    const { processedBranches, pages, pageNumber} = useGlobal();
    const columns: (keyof Branch)[] = ['branch_Name', 'location', 'status'];

  return (
    <div>
      <DynamicTable columns={columns} data={processedBranches} editLink="/branches/edit"  />
      <Pagination
      pageNumber={pageNumber}
      pages={pages}
      route="/branches"
    />
    </div>
  )
}

export default BranchTable