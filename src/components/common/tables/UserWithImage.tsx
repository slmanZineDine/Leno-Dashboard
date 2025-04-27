// Third-Party ====> React-Router
import { Link } from "react-router-dom";
// Img
import userAvatar from "@assets/images/user_avatar.png";

type TProps = {
  username: string;
  link?: string;
  userRole?: string;
  imageURL?: string | null;
  containerStyle?: { [key: string]: string };
};

const UserWithImage = ({
  username,
  link,
  userRole,
  imageURL = null,
  containerStyle = {},
}: TProps) => {
  // ################### SETTINGS ###################
  const imgSrc = imageURL ? imageURL : userAvatar;
  if (link) {
    return (
      <Link
        to={link}
        className="group flex items-center gap-2"
        style={containerStyle}
      >
        <div className="size-10 shrink-0 rounded-full bg-[#999999]">
          <img
            src={imgSrc}
            alt="user-image"
            loading="lazy"
            className="size-full rounded-full object-cover"
          />
        </div>
        <div className="text-start font-bold">
          <h3 className="group-hover:text-secondary group-hover:underline">
            {username}
          </h3>
          {userRole && <span className="text-secondary">{userRole}</span>}
        </div>
      </Link>
    );
  } else {
    return (
      <div className="group flex items-center gap-2" style={containerStyle}>
        <div className="size-10 shrink-0 rounded-full bg-[#999999]">
          <img
            src={imgSrc}
            alt="user-image"
            loading="lazy"
            className="size-full rounded-full object-cover"
          />
        </div>
        <div className="text-start font-bold">
          <h3 className="group-hover:text-secondary group-hover:underline">
            {username}
          </h3>
          {userRole && <span className="text-secondary">{userRole}</span>}
        </div>
      </div>
    );
  }
};

export default UserWithImage;
