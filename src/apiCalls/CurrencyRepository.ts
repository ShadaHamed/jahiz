import axios from 'axios';
import { Currency } from '@/utils/types';

const BASE_URL = "https://json-server-app-zwl3.onrender.com/currency"

  class CurrencyRepository {
    async getAllCurrencies(): Promise<Currency[]> {
      const response = await axios.get(BASE_URL);
      if (!response.data || response.data.length === 0) {
        throw new Error("no currency found");
      }
      return response.data;
    }
  
    // Get a Currency by ID
    async getCurrencyById(id: string): Promise<Currency> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (!response.data || response.data.length === 0) {
        throw new Error("no stores found");
      }
      return response.data;
    }
  
    // Create a new Currency
    async createCurrency(Currency: Currency): Promise<Currency> {
      const response = await axios.post(BASE_URL, Currency);
      if (!response.data || response.data.length === 0) {
        throw new Error("error creating Currency");
      }
      return response.data;
    }
  
    // Update an existing Currency
    async updateCurrency(id: string, updatedData: Partial<Currency>): Promise<Currency> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      if (!response.data || response.data.length === 0) {
        throw new Error("error updating Currency");
      }
      return response.data;
    }
  
    // Delete a Currency
    async deleteCurrency(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const currencyRepository = new CurrencyRepository();
  export default currencyRepository;
  