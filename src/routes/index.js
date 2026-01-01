import { LuUsers } from "react-icons/lu";
import UserManagement from "@/pages/UserManagement";
import { lazy } from "react";
import {
    MdOutlineDashboard, MdOutlineSettings
} from "react-icons/md";

const Dashboard = lazy(() => import("../pages/Dashboard"));

export const routes = [
  {
    path: "/",
    exact: true,
    protected: true,
    showInSidebar: true,
    title: "Dashboard",
    element: <Dashboard />,
    icon: <MdOutlineDashboard />,
  },
  {
    path: "/UserManagement",
    exact: true,
    protected: true,
    showInSidebar: true,
    title: "User Management",
    element: <UserManagement />,
    icon: <LuUsers />,
  },
];
