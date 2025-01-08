import SkeletonTable from '@/components/table/SkeletonTable'
import { count } from 'console';
import React from 'react'

function TableSkeleton() {
    const columns= ['name', 'phone_number', 'address', 'email','role'];

  return (
    <div className="w-full flex justify-center items-center">
    <div className="overflow-x-auto w-full">
      <div className="min-w-full inline-block align-middle p-4">
        <div className="overflow-hidden rounded-lg">
            <SkeletonTable columns={columns}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TableSkeleton