import { useLocation } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Classes from "./AfterLoginHeader.module.css";
import SearchInput from "../Core/SearchInput";

export const AfterLoginHeader = ({ header, drawerBtn, search, setSearch }) => {

  const location = useLocation();
  let pathName = location.pathname;
  
  if (pathName === "/") {
    pathName = "Welcome Back! William";
  }

  const getPageTitle = (path) => {
    const segment = path.split('/').pop() || '';
    const withSpaces = segment
      .replace(/[-_]+/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .trim();
    return withSpaces
      .split(' ')
      .filter(Boolean)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
  };
  
  const title = getPageTitle(pathName);
  
  const { user } = useSelector((state) => state?.authReducer);
  const { unreadNotification } = useSelector((state) => state.commonReducer);
  const navigate = useNavigate();

  return (
    <div className={Classes.loginHeader}>
      <div className={Classes.navbarContainer}>
        {drawerBtn && drawerBtn}
        <div className={Classes.mainHeader}>
          <h1 className={Classes.heading}>{title}</h1>
        </div>

        {search !== undefined && setSearch !== undefined && (
          <div className={Classes.searchContainer}>
            <SearchInput setter={setSearch} value={search} />
          </div>
        )}

        <div
          className={Classes.notification_header}
          onClick={() => navigate("/notifications")}
        >
          {unreadNotification > 0 && (
            <p>{unreadNotification > 9 ? "9+" : unreadNotification}</p>
          )}

          <IoNotificationsOutline size={20} color="var(--text-color-light)" />
        </div>
      </div>
    </div>
  );
};
