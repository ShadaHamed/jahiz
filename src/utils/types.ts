export type Branch = { 
    id: string;
    branch_Name: {
      en: string;
      ar: string;
    };
    location: string;
    status: string;
}
export type BranchFormValues = { 
  english_branch_Name: string;
  arabic_branch_Name: string;
  location: string;
  status: string;
}

export type User = {
    id: string
    name: {
        en: string;
        ar: string;
      };
    phone_number: string;
    address: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
    
}
export type Category = {
  id: string;
  name: string;
  image:string;
}
export type Role = {
  id: string;
  name: string;
}
export type City = {
  id: string;
  name: string;
}
export type Region = {
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
  
  export type Field = {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    options?: { label: string; value: string | number }[] | string[] | undefined;
    validation: {
      required: string;
      pattern?: {
        value: RegExp;
        message: string;
      };}
  }