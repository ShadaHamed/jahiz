import branchRepository from '@/apiCalls/branchRepository';
import { Branch } from '@/utils/types';
import EditBranchForm from '../EditBranchForm';
import BackButton from '@/components/Buttons';

type BranchFormValues = Omit<Branch, 'id'>;

const EditBranchPage = async({ params }: any) => {
    const {id} =  params;

    const branch = await branchRepository.getBranchById(id);
    if(!branch) {
      return <div>Branch not Found</div>
    }
    const initialValues: BranchFormValues = {
      branch_Name: branch.branch_Name,
      location: branch.location,
      status: branch.status,
    };

  return (
    <div className="p-6">
      <div className='flex items-center justify-start space-x-4 absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-2xl mx-auto md:left-auto md:transform-none'>
        <BackButton />
        <h2 className=" text-2xl font-bold my-4">Edit Branch</h2>
      </div>
      <EditBranchForm id={id} initialValues={initialValues} />
    </div>
  )
}

export default EditBranchPage