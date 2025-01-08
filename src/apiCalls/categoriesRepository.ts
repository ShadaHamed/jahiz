import axios from 'axios';
import { Category } from '@/utils/types';
 
const BASE_URL = "https://json-server-app-zwl3.onrender.com/categories"

  class categoriesRepository {
    // Fetch all categories
    async getAllCategories(): Promise<Category[]> {
      const response = await axios.get(BASE_URL);
      if (!response.data || response.data.length === 0) {
        throw new Error("No categories found");
      }
      return response.data;
    }
  
    // Get a category by ID
    async getCategoryById(id: string): Promise<Category> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (!response.data || response.data.length === 0) {
        throw new Error("categorie not exist");
      }
      return response.data;
    }
  
    // // Create a new category
    // async createCategory(category: FormData): Promise<Category> {
    //   const response = await axios.post(BASE_URL, category);
    //   if (!response.data || response.data.length === 0) {
    //     throw new Error("error creating category");
    //   }
    //   return response.data;
    // }
    // Create a new category
    async createCategory(category: FormData): Promise<Category> {
      try {
        const response = await axios.post(BASE_URL, category, {
          headers: { 'Content-Type': 'application/json' },
        })
    
        if (!response.data) {
          throw new Error('Error creating category');
        }
    
        return response.data;
      } catch (error) {
        console.error('Error creating category:', error);
        throw new Error('Failed to create category');
      }
    }
    

  
    // Update an existing category
    async updateCategory(id: string, updatedData: Partial<Category>): Promise<Category> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      if (!response.data || response.data.length === 0) {
        throw new Error("error updating category");
      }
      return response.data;
    }
  
    async deleteCategory(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const categoryRepository = new categoriesRepository();
  export default categoryRepository;
  