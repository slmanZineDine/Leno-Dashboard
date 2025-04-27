// My-Components
import Loading from "@components/common/Loading/Loading";
import Profile from "@components/dashboard/profile/Profile";
// API
import { useGetAdminProfileQuery } from "@redux/services/users/usersApiSlice";
// Data
import { paths } from "@routes/paths";

const AdminProfile = () => {
  // ################### RTK QUERY ###################
  const { data: profile, isLoading, error } = useGetAdminProfileQuery();

  return (
    <Loading isLoading={isLoading} error={error}>
      <section className="container">
        {profile && (
          <Profile
            isOwn={true}
            editingPagePath={paths.adminProfile.editProfile}
            {...profile}
          />
        )}
      </section>
    </Loading>
  );
};

export default AdminProfile;
