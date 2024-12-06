export type Branch = { 
    id: number;
    branch_Name: string;
    location: string;
    status: string;
}
export type User = {
    id: string
    name: {
        en: string;
        ar: string;
      };
    phone_number: number;
    address: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: number;
    
}
export type Category = {
  id: string;
  name: string;
}
export type LoginUser = Pick<User, 'email' | 'password'>;

export type Repository = {
    getAllUsers: () => Promise<User[]>; // Fetch all users
    getUserById: (id: string) => Promise<User>; // Fetch user by ID
    createUser: (user: User) => Promise<User>; // Create a new user
    updateUser: (id: string, updatedData: Partial<User>) => Promise<User>; // Update user
    deleteUser: (id: string) => Promise<void>; // Delete user
  };
  