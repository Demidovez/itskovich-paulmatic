import UserHeader from "components/UserHeader/UserHeader.jsx";
import Tariffs from "components/Tariffs/Tariffs";
import ProfileForm from "components/ProfileForm/ProfileForm";
import PaymentForm from "components/PaymentForm/PaymentForm";

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
