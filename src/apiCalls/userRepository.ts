import axios from 'axios';
import { User } from '@/utils/types';

const BASE_URL = "https://json-server-app-zwl3.onrender.com/users"

  class UserRepository {
    // Fetch all users
    async getAllUsers(): Promise<User[]> {
      const response = await axios.get(BASE_URL);
      return response.data;
    }
  
    // Get a user by ID
    async getUserById(id: string): Promise<User> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    }
  
    // Create a new user
    async createUser(user: User): Promise<User> {
      const response = await axios.post(BASE_URL, user);
      return response.data;
    }
  
    // Update an existing user
    async updateUser(id: string, updatedData: Partial<User>): Promise<User> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      return response.data;
    }
  
    // Delete a user
    async deleteUser(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const userRepository = new UserRepository();
  export default userRepository;
  