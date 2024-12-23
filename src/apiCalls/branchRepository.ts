import axios from 'axios';
import { Branch } from '@/utils/types';
 
const BASE_URL = "https://json-server-app-zwl3.onrender.com/branches";
  
  class BranchRepository {
    // Fetch all branches
    async getAllBranches(): Promise<Branch[]> {
      const response = await axios.get(BASE_URL);
      if (!response.data || response.data.length === 0) {
        throw new Error("No branches found");
      }
      return response.data;
    }

      // Fetch branches with pagination
  async getPaginatedBranches(page: number, limit: number): Promise<{ data: Branch[]; total: number }> {
    const response = await axios.get(`${BASE_URL}?_page=${page}&_limit=${limit}`);
    if (!response.data || response.data.length === 0) {
      throw new Error("No branches found");
    }
    const total = parseInt(response.headers['x-total-count'], 10); // Extract total count from headers
    return { data: response.data, total };
  }
  
    // Get a branch by ID
    async getBranchById(id: string): Promise<Branch> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (!response.data || response.data.length === 0) {
        throw new Error("branch not exist");
      }
      return response.data;
    }
  
    // Create a new branch
    async createBranch(branch: Omit<Branch, 'id'>): Promise<Branch> {
      const response = await axios.post(BASE_URL, branch);
      if (!response.data || response.data.length === 0) {
        throw new Error("error creating branch");
      }
      return response.data;
    }
  
    // Update an existing branch
    async updateBranch(id: string, updatedData: Partial<Branch>): Promise<Branch> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      if (!response.data || response.data.length === 0) {
        throw new Error("error updating branch");
      }
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
  