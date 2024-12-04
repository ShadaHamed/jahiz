import axios from 'axios';
import { Category } from '@/utils/types';
 
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-netlify-deployment-url.netlify.app/.netlify/functions/categories' 
  : 'http://localhost:8888/.netlify/functions/categories';

  class BranchRepository {
    // Fetch all branches
    async getAllCategories(): Promise<Category[]> {
      const response = await axios.get(BASE_URL);
      return response.data;
    }
  
    // Get a branch by ID
    async getCategoryById(id: string): Promise<Category> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    }
  
    // Create a new branch
    async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
      const response = await axios.post(BASE_URL, category);
      return response.data;
    }
  
    // Update an existing branch
    async updateCategory(id: string, updatedData: Partial<Category>): Promise<Category> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      return response.data;
    }
  
    async deleteCategory(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const branchRepository = new BranchRepository();
  export default branchRepository;
  