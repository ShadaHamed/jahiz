'use client'
import DynamicTable from '@/components/table/Table'
import { Branch } from '@/utils/types'
import { useGlobal } from './Context'
import Pagination from '@/components/table/pagination'
import { useEffect, useState } from 'react'
import TableSkeleton from '../users/views/TableSkeleton'

const BranchTable = () => {
    const { processedBranches, pages, pageNumber, loading} = useGlobal();
    // const [loading, setLoading] = useState(false)
    const columns: (keyof Branch)[] = ['branch_Name', 'location', 'status'];


  return (
    <div>
      <DynamicTable
        columns={columns}
        data={processedBranches}
        editLink="/branches/edit"
        isLoading={loading} />
        
      {!loading && <Pagination
      pageNumber={pageNumber}
      pages={pages}
      route="/branches"
    />}

    </div>
  )
}

export default BranchTable