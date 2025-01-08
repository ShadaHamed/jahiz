import axios from 'axios';
import { Region } from '@/utils/types';

const BASE_URL = "https://json-server-app-zwl3.onrender.com/regions"

  class RegionRepository {
    async getAllRegions(): Promise<Region[]> {
      const response = await axios.get(BASE_URL);
      if (!response.data || response.data.length === 0) {
        throw new Error("no region found");
      }
      return response.data;
    }
  
    // Get a region by ID
    async getRegionById(id: string): Promise<Region> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (!response.data || response.data.length === 0) {
        throw new Error("no regions found");
      }
      return response.data;
    }
  
    // Create a new region
    async createRegion(city: Region): Promise<Region> {
      const response = await axios.post(BASE_URL, city);
      if (!response.data || response.data.length === 0) {
        throw new Error("error creating region");
      }
      return response.data;
    }
  
    // Update an existing region
    async updateRegion(id: string, updatedData: Partial<Region>): Promise<Region> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      if (!response.data || response.data.length === 0) {
        throw new Error("error updating region");
      }
      return response.data;
    }
  
    // Delete a region
    async deleteRegion(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const regionRepository = new RegionRepository();
  export default regionRepository;
  