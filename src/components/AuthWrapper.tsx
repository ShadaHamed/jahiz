// 'use client'

// // components/AuthWrapper.tsx
// import { useAuth } from '../app/(user)/AuthContext';
// import { usePathname, redirect  } from 'next/navigation';
// import {PublicLayout} from '../app/layout';
// import {PrivateLayout} from '../app/layout'

// const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const pathname = usePathname();

//   if (!isAuthenticated && pathname !== '/login') {
//     redirect('/login'); // Redirect unauthorized users to login
//     return null;
//   }

//   // Use PublicLayout for login, PrivateLayout for other pages
//   return isAuthenticated ? (
//     <PrivateLayout>{children}</PrivateLayout>
//   ) : (
//     <PublicLayout>{children}</PublicLayout>
//   );
// };

// export default AuthWrapper;
