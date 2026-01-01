import { MdOutlineDashboard, MdOutlineSettings } from "react-icons/md";

export const sidebarLinks = [
  {
    path: "/",
    exact: true,
    protected: true,
    showInSidebar: true,
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
  },
];
