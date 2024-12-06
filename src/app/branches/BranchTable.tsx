
import DynamicTable from '@/components/table/Table'
import { Branch } from '@/utils/types'
import { useGlobal } from './Context'

const BranchTable = () => {
    const {filterdBranches} = useGlobal();
    const columns: (keyof Branch)[] = ['branch_Name', 'location', 'status'];
 
  return (
    <DynamicTable columns={columns} data={filterdBranches} editLink="/branches/edit"  />
  )
}

export default BranchTable