import axios from 'axios';
import { User } from '@/utils/types';

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-netlify-deployment-url.netlify.app/.netlify/functions/users' 
  : 'http://localhost:8888/.netlify/functions/users';

  class UserRepository {
    // Fetch all branches
    async getAllUsers(): Promise<User[]> {
      const response = await axios.get(BASE_URL);
      return response.data;
    }
  
    // Get a branch by ID
    async getUserById(id: string): Promise<User> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    }
  
    // Create a new branch
    async createUser(user: User): Promise<User> {
      const response = await axios.post(BASE_URL, user);
      return response.data;
    }
  
    // Update an existing branch
    async updateUser(id: string, updatedData: Partial<User>): Promise<User> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      return response.data;
    }
  
    // Delete a branch
    async deleteUser(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const userRepository = new UserRepository();
  export default userRepository;
  