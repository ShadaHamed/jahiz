import axios from 'axios';
import { ProductType } from '@/utils/types';

const BASE_URL = "https://json-server-app-zwl3.onrender.com/product-type"

  class ProductTypeRepository {
    async getAllProductTypes(): Promise<ProductType[]> {
      const response = await axios.get(BASE_URL);
      if (!response.data || response.data.length === 0) {
        throw new Error("no Product types found");
      }
      return response.data;
    }
  
    // Get a ProductType by ID
    async getProductTypeById(id: string): Promise<ProductType> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (!response.data || response.data.length === 0) {
        throw new Error("no Product types found");
      }
      return response.data;
    }
  
    // Create a new ProductType
    async createProductType(ProductType: ProductType): Promise<ProductType> {
      const response = await axios.post(BASE_URL, ProductType);
      if (!response.data || response.data.length === 0) {
        throw new Error("error creating Product type");
      }
      return response.data;
    }
  
    // Update an existing ProductType
    async updateProductType(id: string, updatedData: Partial<ProductType>): Promise<ProductType> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      if (!response.data || response.data.length === 0) {
        throw new Error("error updating Product type");
      }
      return response.data;
    }
  
    // Delete a ProductType
    async deleteProductType(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const productTypeRepository = new ProductTypeRepository();
  export default productTypeRepository;
  