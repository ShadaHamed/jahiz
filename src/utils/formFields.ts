export const userFormFields = [
    { name: 'name.en', label: 'Name in English', type: 'text', validation: {
         required: 'name in english is required',
         pattern: {
          value: /^[A-Za-z\s]+$/, 
          message: 'Must contain only English letters',
        }}},
    { name: 'name.ar', label: 'Name in Arabic', type: 'text', validation: { 
      required: 'name in arabic is required',
      pattern: {
        value: /^[\u0600-\u06FF\s]+$/, 
        message: 'Must contain only Arabic letters',
      } }},
    { name: 'phone_number', label: 'Phone Number', type: 'text', validation: {
       required: 'phone_number is required', 
       pattern: {
        value: /^[0-9]{10,15}$/, 
        message: 'Phone number must be 10-15 digits',
      } } },
    { name: 'address', label: 'Address', type: 'text', validation: { required: 'address is required' } },
    { name: 'email', label: 'Email', type: 'email', validation: { 
      required: 'email is required' , 
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation pattern
        message: 'Invalid email address',
      },} },
    { name: 'password', label: 'Password', type: 'password', validation: { 
      required: 'password is required' , 
      minLength: { value: 6, message: 'Password must be at least 6 characters' },
    } },
    { name: 'password_confirmation', label: 'Password Confirmation', type: 'password', validation: { required: 'password_confirmation is required' } },
    { name: 'role', label: 'Role', type: 'number', validation: { 
      required: 'role is required',
      min: { value: 1, message: 'Role must be 1 or higher' },
    } },
  ]

  