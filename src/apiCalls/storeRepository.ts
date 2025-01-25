import axios from 'axios';
import { Store } from '@/utils/types';

const BASE_URL = "https://json-server-app-zwl3.onrender.com/store"

  class StoreRepository {
    async getAllStores(): Promise<Store[]> {
      const response = await axios.get(BASE_URL);
      if (!response.data || response.data.length === 0) {
        throw new Error("no store found");
      }
      return response.data;
    }
  
    // Get a Store by ID
    async getStoreById(id: string): Promise<Store> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (!response.data || response.data.length === 0) {
        throw new Error("no stores found");
      }
      return response.data;
    }
  
    // Create a new Store
    async createStore(Store: Store): Promise<Store> {
      const response = await axios.post(BASE_URL, Store);
      if (!response.data || response.data.length === 0) {
        throw new Error("error creating Store");
      }
      return response.data;
    }
  
    // Update an existing Store
    async updateStore(id: string, updatedData: Partial<Store>): Promise<Store> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      if (!response.data || response.data.length === 0) {
        throw new Error("error updating Store");
      }
      return response.data;
    }
  
    // Delete a Store
    async deleteStore(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const storeRepository = new StoreRepository();
  export default storeRepository;
  