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
export type CityFormValues = {
  english_city_Name: string;
  arabic_city_Name: string;
  status:string;
}

export type RegionFormValues = {
  english_region_Name: string;
  arabic_region_Name: string;
  cityID: string;
  status:string;
}
export type ProductTypeFormValues = {
  name: string;
  categoryID: string;
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
  category_Name: string;
  category_Image: string | null;
  status: string;

}
export type Product = {
  "id":string,
  "name": string,
  "code": string,
  "description": string,
  "features": {value: string} [],
  "total_quantity": number,
  "sale_price": number,
  "status": "active" | "inactive",
  "discount": number,
  "shipping_fee": number,
  "discount_start": string,
  "discount_end": string,
  "barcode": string,
  "sales": number,
  "current_sold_items": number,
  "product_type_id": number,
  "currency_id": number,
  "store_id": number,
  "image": string | null
}
export type Role = {
  id: string;
  name: string;
}
export type City = {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  status: string;
}
export type Region = {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  cityID: string;
  status: string;

}
export type ProductType = {
  id: number;
  name: string;
  categoryID: string;
}
export type Store = {
  id: number;
  name: string
}
export type Currency = {
  id: number;
  name: string;
  symbol: string;
  iso_code: string;
}
export type CurrencyFormValues = Omit<Currency, 'id'>

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