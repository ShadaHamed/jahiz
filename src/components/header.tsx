'use client';

import { useAuth } from '@/app/(user)/AuthContext';
import {useRouter} from 'next/navigation';

const Header = () => {
  const { isAuthenticated, isLoginvisiable, setIsLoginVisiable } = useAuth();

  const router = useRouter();
  
  const handleClick = () => {
    router.push('/login')
    setIsLoginVisiable(false) 
  }

  return (
    <>
    { isLoginvisiable && (
      <div className="bg-white mt-4 p-4 flex justify-center md:justify-between items-center z-10">
      {!isAuthenticated && (<button
        onClick={handleClick}
        className="absolute right-4 px-6 py-2 me-4 bg-primaryColor text-white rounded-full text-sm font-semibold shadow-md hover:bg-primaryColor_2 hover:shadow-lg transition duration-200"
      >
        Login
      </button>)}
    </div>) }
    </>
  );
};

export default Header;
