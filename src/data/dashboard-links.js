import { variables } from "./Variables";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor/dashboard",
    type: variables.instructor,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/instructor/my-courses",
    type: variables.instructor,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/instructor/add-courses",
    type: variables.instructor,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/student/enrolled-courses",
    type: variables.student,
    icon: "VscMortarBoard",
  },

  {
    id: 6,
    name: "Purchase History",
    path: "/dashboard/student/purchase-history",
    type: variables.student,
    icon: "VscHistory",
  },
  {
    id: 7,
    name: "My Cart",
    path: "/dashboard/student/my-cart",
    type: variables.student,
    icon: "VscArchive",
  },
  {
    id: 8,
    name: "Settings",
    path: "/dashboard/my-settings",
    icon: "VscGear",
  },
];
