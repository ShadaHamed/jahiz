import { ProductTypeFormValues } from '@/utils/types';
import productTypeRepository from '@/apiCalls/productTypesRepository';
import EditProductTypeForm from '../EditProductTypeForm';

const EditProductTypePage = async({ params }: any) => {
    const {id} =  await params;

    const productType = await productTypeRepository.getProductTypeById(id);
    if(!productType) {
      return <div>Porduct Type not Found</div>
    }
    const initialValues: ProductTypeFormValues = {
      name: productType.name,
      categoryID: productType.categoryID
    };

  return (
    <div className="p-6">
      <EditProductTypeForm id={id} initialValues={initialValues} />
    </div>
  )
}

export default EditProductTypePage