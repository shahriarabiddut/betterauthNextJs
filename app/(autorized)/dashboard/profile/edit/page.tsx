import UpdateEmailForm from "@/components/profile/UpdateEmailForm";
import UpdateUserForm from "@/components/profile/UpdateUserForm";
import { getServerSession } from "@/lib/action";

const EditProfile = async () => {
  const session = await getServerSession();
  const { user } = session;
  // console.log(user);
  return (
    <div className="space-y-4 p-4 pt-6 md:p-8">
      <UpdateUserForm user={user} />
      <UpdateEmailForm user={user} />
    </div>
  );
};

export default EditProfile;
