import axios from 'axios';
import { Product } from '@/utils/types';
 
const BASE_URL = "https://json-server-app-zwl3.onrender.com/products"

  class productsRepository {
    // Fetch all products
    async getAllProducts(): Promise<Product[]> {
      const response = await axios.get(BASE_URL);
      if (!response.data || response.data.length === 0) {
        throw new Error("No products found");
      }
      return response.data;
    }
  
    // Get a product by ID
    async getProductById(id: number): Promise<Product> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (!response.data || response.data.length === 0) {
        throw new Error("categorie not exist");
      }
      return response.data;
    }
  
    // // Create a new product
    async createProduct(product: FormData): Promise<Product> {
      try {
        const response = await axios.post(BASE_URL, product, {
          headers: { 'Content-Type': 'application/json' },
        })
    
        if (!response.data) {
          throw new Error('Error creating product');
        }
    
        return response.data;
      } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
      }
    }
    

  
    // Update an existing product
    async updateProduct(id: string, updatedData: Partial<Product>): Promise<Product> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      if (!response.data || response.data.length === 0) {
        throw new Error("error updating product");
      }
      return response.data;
    }
  
    async deleteProduct(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const productRepository = new productsRepository();
  export default productRepository;
  