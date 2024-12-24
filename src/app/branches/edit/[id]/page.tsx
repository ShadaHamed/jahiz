import branchRepository from '@/apiCalls/branchRepository';
import { BranchFormValues } from '@/utils/types';
import EditBranchForm from '../EditBranchForm';
import BackButton from '@/components/Buttons';

const EditBranchPage = async({ params }: any) => {
    const {id} =  params;

    const branch = await branchRepository.getBranchById(id);
    if(!branch) {
      return <div>Branch not Found</div>
    }
    const initialValues: BranchFormValues = {
      english_branch_Name: branch.branch_Name.en,
      arabic_branch_Name: branch.branch_Name.ar,
      location: branch.location,
      status: branch.status,
    };

  return (
    <div className="p-6">
      <EditBranchForm id={id} initialValues={initialValues} />
    </div>
  )
}

export default EditBranchPage