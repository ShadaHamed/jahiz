import { User } from '@/utils/types';
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

interface AccountInfoProps {
  formData: User;
  // handleSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Final = ({formData}) => {
  const router = useRouter();

  return (
    <div className='container md:mt-10'>
      <div className='flex flex-col items-center'>
        <div className='text-primaryColor'>

        </div>
        <div className='mt-3 text-xl font-semibold uppercase text-primaryColor border border-primaryColor  rounded-full'>
          Done
        </div>
        <div className='text-lg font-semibold text-gray-500'>
          User Account has been created.
        </div>
        <button
          onClick={() => router.push('/')}>
          Back
        </button>
      </div>
    </div>
  )
}

export default Final