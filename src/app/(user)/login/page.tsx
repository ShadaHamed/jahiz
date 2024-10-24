import Image from "next/image"
import LoginForm from "./LoginForm"
import loginImage from "../../../../public/loginImage.png"
import A from "../../../../public/A.png"
import BackButton from "./backButton"

const LoginPage = () => {

  return (
    <div className="min-h-screen flex items-center justify-center rounded-md bg-gradient-to-r from-primaryColor_2 to-secondaryColor p-6">
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-4/5 max-w-4xl h-auto  md:h-[500px] ">
        
        {/* left side */}
          <div className="md:w-1/2 p-8 relative flex flex-col items-center text-sm">
            <div className="absolute top-4 left-4">
              <BackButton />
            </div>
            <div className="py-5">
            <div className="mb-6 rounded flex justify-center items-center">
              <Image src={A} alt="logo" height={50} width={50}/>
            </div>
              <h2 className="text-2xl text-center font-bold mb-4">Welcom Back!</h2>
              <p className="mb-6 text-center text-xs">Please Sign in to continue</p>
              <div className="">
              <LoginForm />
              </div>
              <p className="mt-4 text-center text-gray-700">
                Not a member? {" "}
                <a href="/register" className="text-purple-600 hover:text-purple-800 underline">
                  Register Now
                </a>
              </p>

            </div>
          </div>

           {/* Right side */}
          <div className="hidden md:flex w-2/3 bg-[#f5f4f7] items-center justify-center">
          <Image
              src={loginImage}
              alt="Login Illustration"
              width={400}
              height={300}
              className="border-0 appearance-none outline-none" 
            />
        </div>
        </div>
    </div>
  )
}

export default LoginPage