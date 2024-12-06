import { useTranslation } from "next-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className=' m-4 flex items-center justify-center md:justify-between'>
      <h1 className='absolute top-4 text-2xl font-bold mx-auto'>Home Page</h1>
    </div>
  )
}

export default Home;
