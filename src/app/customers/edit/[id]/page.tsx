import userRepository from '@/apiCalls/userRepository';
import { User } from '@/utils/types';
import EditCustomerForm from './EditUserForm';
import BackButton from '@/components/Buttons';

type UserFormValues = Omit<User, 'id'>;

const EditUserInfo = async({ params }: any) => {
    const {id} = await params;

    const user = await userRepository.getUserById(id);
    if(!user) {
      return <div>User not Found</div>
    }
    const initialValues: UserFormValues = {
      name: {
        en:user.name.en,
        ar:user.name.ar,
      },
     phone_number:user.phone_number,
     address: user.address,
     email: user.email,
     password: user.password,
     password_confirmation: user.password_confirmation,
     role: user.role
    };

  return (
    <div className="p-6">
      <div className='flex items-center justify-start space-x-4 absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-2xl mx-auto md:left-auto md:transform-none'>
        <BackButton />
        <h2 className="text-2xl font-bold my-4">Edit Customer Information</h2>
      </div>
      <EditCustomerForm id={id} initialValues={initialValues} />
      
    </div>
  )
}

export default EditUserInfo