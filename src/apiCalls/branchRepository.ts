import axios from 'axios';
import { Branch } from '@/utils/types';
 
const BASE_URL = "https://json-server-app-zwl3.onrender.com/branches";
  
  class BranchRepository {
    // Fetch all branches
    async getAllBranches(): Promise<Branch[]> {
      const response = await axios.get(BASE_URL);
      return response.data;
    }
  
    // Get a branch by ID
    async getBranchById(id: string): Promise<Branch> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    }
  
    // Create a new branch
    async createBranch(branch: Omit<Branch, 'id'>): Promise<Branch> {
      const response = await axios.post(BASE_URL, branch);
      return response.data;
    }
  
    // Update an existing branch
    async updateBranch(id: string, updatedData: Partial<Branch>): Promise<Branch> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      return response.data;
    }
  
    // Delete a branch
    async deleteBranch(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const branchRepository = new BranchRepository();
  export default branchRepository;
  