import {users} from "@/utils/data"
import Image from "next/image";
import profile from '../../public/profile.png';

const Navbar = () => {
  const user = users.find(user => user.user_id === 1);
  
  return (
    <>
      <nav className="absolute hidden top-0 right-0 z-10 overflow-hidden bg-white border-0 p-4">
        <div className=" text-xs  p-2">
          <div className="flex items-center gap-3 font-bold">
            <Image src= {user?.photo || profile} alt="User Profile" width={35} height={35}/>
            {user?.user_name}
          </div>
          <p className="text-secondaryColor ps-8">{user?.role}</p>
        </div>
      </nav>
    </>
  )
}

export default Navbar