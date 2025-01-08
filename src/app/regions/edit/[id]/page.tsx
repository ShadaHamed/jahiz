import { RegionFormValues } from '@/utils/types';
import regionRepository from '@/apiCalls/regionRepository';
import EditRegionForm from '../../EditRegionForm';

const EditRegionPage = async({ params }: any) => {
    const {id} =  await params;

    const region = await regionRepository.getRegionById(id);
    if(!region) {
      return <div>Region not Found</div>
    }
    const initialValues: RegionFormValues = {
      english_region_Name: region.name.en,
      arabic_region_Name: region.name.ar,
      cityID: region.cityID,
      status: region.status,
    };

  return (
    <div className="p-6">
      <EditRegionForm id={id} initialValues={initialValues} />
    </div>
  )
}

export default EditRegionPage