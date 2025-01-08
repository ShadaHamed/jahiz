import axios from 'axios';
import { City } from '@/utils/types';

const BASE_URL = "https://json-server-app-zwl3.onrender.com/cities"

  class CityRepository {
    async getAllCities(): Promise<City[]> {
      const response = await axios.get(BASE_URL);
      if (!response.data || response.data.length === 0) {
        throw new Error("no cities found");
      }
      return response.data;
    }
  
    // Get a city by ID
    async getCityById(id: string): Promise<City> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (!response.data || response.data.length === 0) {
        throw new Error("no cities found");
      }
      return response.data;
    }
  
    // Create a new city
    async createCity(city: City): Promise<City> {
      const response = await axios.post(BASE_URL, city);
      if (!response.data || response.data.length === 0) {
        throw new Error("error creating city");
      }
      return response.data;
    }
  
    // Update an existing city
    async updateCity(id: string, updatedData: Partial<City>): Promise<City> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      if (!response.data || response.data.length === 0) {
        throw new Error("error updating city");
      }
      return response.data;
    }
  
    // Delete a city
    async deleteCity(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const cityRepository = new CityRepository();
  export default cityRepository;
  