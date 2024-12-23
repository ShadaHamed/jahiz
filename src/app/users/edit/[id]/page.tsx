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
      <EditCustomerForm id={id} initialValues={initialValues} />
    </div>
  )
}

export default EditUserInfo