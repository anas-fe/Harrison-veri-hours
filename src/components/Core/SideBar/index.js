import { cn } from "@/helper/HelperFunction";
import { routes } from "@/routes";
import { cloneElement, useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./SideBar.module.css";
import logo from '@/assets/images/logo.png'
import { FaArrowLeft } from "react-icons/fa6";



// const SideBar = ({ setIsOpen }) => {
const SideBar = () => {

  const navigate = useNavigate();

  const Links = routes;

  return (
    <div className={cn(classes.isMobileContainer)}>
      <div className={classes?.logoContainer} onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={[classes.itemsContainer, classes.isMobile].join(" ")}>
        <div className={[classes.items].join(" ")}>
          <span>
            {Links?.filter((e) => e.showInSidebar)?.map((item, index) => {
              return (
                <RenderItem
                  icon={item?.icon}
                  title={item?.title}
                  path={item?.path}
                  // setIsOpen={setIsOpen}
                  subMenu={item?.subMenu}
                  key={index}
                />
              );
            })}
          </span>
        </div>
        <div className={cn(classes.logoutContainer)}>
          <RenderItem
            title="Logout"
            path="#"
            icon={<FaArrowLeft />}
            // setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

const RenderItem = ({ icon, title, subMenu = [], path, setIsOpen }) => {
  const pathname = useLocation()?.pathname;
  const active = pathname === path ? true : false;
  const [subnav, setSubnav] = useState(false);
  const subActive = subMenu.find((item) => item?.path == pathname);
  const navigate = useNavigate();
  const showSubnav = () => setSubnav(!subnav);
  useEffect(() => {
    const allPaths = subMenu.map((item) => item?.path);
    if (allPaths.includes(pathname)) {
      setSubnav(true);
    }
  }, []);

  return (
    <>
      <span
        className={[
          classes?.listItemContainer,
          (active || subnav) && classes?.active,
          subActive && classes?.subActive,
          subnav && [classes.subnav].join(" "),
        ].join(" ")}
        onClick={() => {
          if (subMenu?.length > 0) {
            showSubnav(!subnav);
          } else {
            if (path != "#") {
              // setIsOpen(false);
              navigate(path);
            }
          }
        }}
      >
        {icon &&
          cloneElement(icon, {
            color: "var(--text-color-dark)",
            fontSize: "18px",
            className: classes.icon,
          })}
        <span>{title}</span>
        {subMenu?.length > 0 && (
          <FiChevronUp size={20} className={classes?.dropDownIcon} />
        )}
      </span>

      {subnav && (
        <div className={[classes?.subMenu].join(" ")}>
          {subMenu.map((item, index) => {
            return (
              <span
                onClick={() => {
                  if (item?.path != "#") {
                    navigate(item?.path);
                  }
                }}
                className={[
                  classes?.innerItemContainer,
                  classes?.notCollapsedInnercontainer,
                  subActive?.path === item?.path && classes?.innerItemSubActive,
                ].join(" ")}
                key={index}
              >
                {item?.icon &&
                  cloneElement(item?.icon, {
                    size: 20,
                    color: "var(--text-color-dark)",
                    className: classes.innerIcon,
                  })}
                <span>{item?.title}</span>
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};
