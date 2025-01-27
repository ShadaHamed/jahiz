import { CurrencyFormValues } from '@/utils/types';
import EditCurrencyForm from '../EditCurrencyForm';
import currencyRepository from '@/apiCalls/CurrencyRepository';

const EditCurrencyPage = async({ params }: any) => {
    const {id} =  params;

    const currency = await currencyRepository.getCurrencyById(id);
    if(!currency) {
      return <div>Currency not Found</div>
    }
    const initialValues: CurrencyFormValues = {
      name: currency.name,
      symbol: currency.symbol,
      iso_code: currency.iso_code,
    };

  return (
    <div className="p-6">
      <EditCurrencyForm id={id} initialValues={initialValues} />
    </div>
  )
}

export default EditCurrencyPage