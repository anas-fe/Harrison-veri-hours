import { LuUsers } from "react-icons/lu";
import { TbBooks } from "react-icons/tb";
import UserManagement from "@/pages/UserManagement";
import ShadowRecords from '@/pages/ShadowRecords/index'
import { lazy } from "react";
import {
    MdOutlineDashboard, MdOutlineSettings
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import UserDetail from "@/pages/UserDetails";
import ShadowingDetails from "@/pages/ShadowingDetails";


const Dashboard = lazy(() => import("../pages/Dashboard"));

export const routes = [
  {
    path: "/dashboard",
    exact: true,
    protected: true,
    showInSidebar: true,
    title: "Dashboard",
    element: <Dashboard />,
    icon: <RxDashboard />,
  },
  {
    path: "/user-management",
    exact: true,
    protected: true,
    showInSidebar: true,
    title: "User Management",
    element: <UserManagement />,
    icon: <LuUsers />,
  },
  {
    path: "/user-details/:id",
    exact: true,
    protected: true,
    showInSidebar: false,
    title: "User Management",
    element: <UserDetail />,
    // icon: <LuUsers />,
  },
    {
    path: "/shadow-records",
    exact: true,
    protected: true,
    showInSidebar: true,
    title: "Shadow Records",
    element: <ShadowRecords />,
    icon: <TbBooks />,
  },
  {
    path: "/shadowing-details/:id",
    exact: true,
    protected: true,
    showInSidebar: false,
    title: "Shadowing Details",
    element: <ShadowingDetails />,
    icon: <TbBooks />,
  },
];
