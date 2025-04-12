import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpdateEmailForm from "@/components/profile/UpdateEmailForm";
import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import UpdateUserForm from "@/components/profile/UpdateUserForm";
import { getServerSession } from "@/lib/action";
import AccountDelete from "@/components/profile/AccountDeleteEmail";
import AccountDeleteEmail from "@/components/profile/AccountDeleteEmail";

const EditProfile = async () => {
  const session = await getServerSession();
  const { user } = session;

  return (
    <div className="p-4 pt-6 md:p-8">
      <Tabs defaultValue="profile" className="w-full space-y-4">
        <TabsList className="grid w-full md:grid-cols-2 lg:grid-cols-4 cursor-pointer">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <UpdateUserForm user={user} />
        </TabsContent>

        <TabsContent value="email">
          <UpdateEmailForm user={user} />
        </TabsContent>

        <TabsContent value="password">
          <UpdatePasswordForm user={user} />
        </TabsContent>
        <TabsContent value="delete">
          <AccountDeleteEmail />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditProfile;
