// My-Components
import Loading from "@components/common/Loading/Loading";
import Profile from "@components/dashboard/profile/Profile";
// API
import { useGetSupervisorProfileQuery } from "@redux/services/users/usersApiSlice";
// Data
import { paths } from "@routes/paths";

const SupervisorProfile = () => {
  // ################### RTK QUERY ###################
  const { data: profile, isLoading, error } = useGetSupervisorProfileQuery();

  return (
    <Loading isLoading={isLoading} error={error}>
      <section className="container">
        {profile && (
          <Profile
            isOwn={true}
            editingPagePath={paths.supervisorProfile.editProfile}
            {...profile}
          />
        )}
      </section>
    </Loading>
  );
};

export default SupervisorProfile;
