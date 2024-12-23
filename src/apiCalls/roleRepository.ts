import axios from 'axios';
import { Role } from '@/utils/types';

const BASE_URL = "https://json-server-app-zwl3.onrender.com/roles"

  class RoleRepository {
    // Fetch all roles
    async getAllRoles(): Promise<Role[]> {
      const response = await axios.get(BASE_URL);
      return response.data;
    }
  
    // Get a role by ID
    async getRoleById(id: string): Promise<Role> {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    }
  
    // Create a new role
    async createRole(role: Role): Promise<Role> {
      const response = await axios.post(BASE_URL, role);
      return response.data;
    }
  
    // Update an existing role
    async updateRole(id: string, updatedData: Partial<Role>): Promise<Role> {
      const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
      return response.data;
    }
  
    // Delete a role
    async deleteRole(id: string): Promise<void> {
      await axios.delete(`${BASE_URL}/${id}`);
    }
  }
  
  // Export an instance of the repository
  const roleRepository = new RoleRepository();
  export default roleRepository;
  