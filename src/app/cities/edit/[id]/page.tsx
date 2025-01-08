import { CityFormValues } from '@/utils/types';
import EditCityForm from '../../EditCityForm'
import BackButton from '@/components/Buttons';
import cityRepository from '@/apiCalls/cityRepository';

const EditCityPage = async({ params }: any) => {
    const {id} =  params;

    const city = await cityRepository.getCityById(id);
    if(!city) {
      return <div>City not Found</div>
    }
    const initialValues: CityFormValues = {
      english_city_Name: city.name.en,
      arabic_city_Name: city.name.ar,
      status: city.status,
    };

  return (
    <div className="p-6">
      <EditCityForm id={id} initialValues={initialValues} />
    </div>
  )
}

export default EditCityPage