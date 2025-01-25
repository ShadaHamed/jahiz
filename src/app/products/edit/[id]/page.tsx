import productRepository from '@/apiCalls/productsRepository';
import ProductEditForm from '../ProductEditForm';
import { Product} from '@/utils/types';

type ProductFormValues = Omit<Product, 'id'>;

const EditProductPage = async({params}: any) => {
    const {id} = await params;

    const product = await productRepository.getProductById(id);
    if(!product) {
      return <div>product not Found</div>
    }

    const initialValues: ProductFormValues = {
        name: product.name,
        code: product.code,
        description: product.description,
        features: Array.isArray(product.features)
        ? product.features.map((feature) => 
            typeof feature === 'string' ? { value: feature } : feature
          )
        : [],      
        total_quantity: product.total_quantity,
        sale_price: product.sale_price,
        status: product.status,
        discount:product.discount,
        shipping_fee: product.shipping_fee,
        discount_start: product.discount_start,
        discount_end: product.discount_end,
        barcode: product.barcode,
        sales: product.sales,
        current_sold_items: product.current_sold_items,
        product_type_id: product.product_type_id,
        currency_id: product.currency_id,
        store_id: product.store_id,
        image: product.image,
    }


  return (
    <div className="p-6">
    <ProductEditForm 
        id={id} 
        initialValues={initialValues}  
       />
  </div>
  )
}

export default EditProductPage