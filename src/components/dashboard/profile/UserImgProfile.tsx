// Images
import userAvatar from "@assets/images/user_avatar.png";

const UserImgProfile = ({ imageURL }: { imageURL?: string | null }) => {
  // ################### SETTINGS ###################
  const imgSrc = imageURL ? imageURL : userAvatar;

  return (
    <div className="h-32 w-32 rounded-full bg-[#f7f7f7]">
      <img
        src={imgSrc}
        alt="user-image"
        className="size-full rounded-full object-cover"
      />
    </div>
  );
};

export default UserImgProfile;
