import { imageUrl } from "@/config/apiUrl";
import { cn } from "@/helper/HelperFunction";
import { Link } from "react-router-dom";
import { BiChevronDown, BiUser } from "react-icons/bi";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import PopperComponent from "../PopperComponent";
import classes from "./UserPopover.module.css";

export default function UserPopover({ user }) {
  const handleLogout = () => {
    // handleSignOut(dispatch, navigate);
  };

  return (
    <PopperComponent
      sideOffset={10}
      popperInsideElement={
        <div className={classes.list}>
          <Link className={classes.link} to="/dashboard">
            <MdOutlineDashboard />
            Dashboard
          </Link>
          <Link className={classes.link} to="/profile-setting">
            <BiUser /> Profile Setting
          </Link>
          <span
            className={cn(classes.link, classes.logout)}
            onClick={() => handleLogout()}
          >
            <MdLogout color={"var(--danger-color)"} /> Logout
          </span>
        </div>
      }
    >
      <div className={classes.userPopover}>
        <div className={classes.userPhoto}>
          <img
            src={user?.photo ? imageUrl(user?.photo) : "/images/profile.png"}
            alt="profile"
            width={45}
            height={45}
          />
        </div>
        <div className={classes.userInfo}>
          <p className={cn(classes.userName)}>{user?.name || "John Doe"}</p>
          <p className={cn(classes.userEmail)}>
            {user?.email || "johndoe@gmail.com"}
          </p>
        </div>
        <div>
          <BiChevronDown color={"var(--primary-text-color)"} />
        </div>
      </div>
    </PopperComponent>
  );
}
