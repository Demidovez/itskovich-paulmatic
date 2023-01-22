import PaymentForm from '~src/components/PaymentForm/PaymentForm';
import ProfileForm from '~src/components/ProfileForm/ProfileForm';
import Tariffs from '~src/components/Tariffs/Tariffs';
import UserHeader from '~src/components/UserHeader/UserHeader.jsx';

const Profile = () => {
  return (
    <>
      <UserHeader />
      <ProfileForm />
      <PaymentForm />
      <Tariffs />
    </>
  );
};

export default Profile;
