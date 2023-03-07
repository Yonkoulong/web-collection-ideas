import { SignIn } from "@/pages/Auth/SignIn";
import { AdminPage } from "@/pages/Admin";
import { UserManagement } from "@/pages/Admin/User-management";
import { CreateAndEditUser } from "@/pages/Admin/CreateAndEditUser";
import { Department } from "@/pages/Admin/Department";
import { Campaign } from "@/pages/Admin/Campaign";
import { Ideas } from "@/shared/components/Ideas";
import { QAMPage } from "@/pages/QAM";
import  ProtectedRoute  from "@/shared/HOC/AuthenticationRoute";

export const routes = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/user-management",
        element: <UserManagement />,
      },
      {
        path: "/admin/create-user",
        element: <CreateAndEditUser />,
      },
      {
        path: "admin/user/:id",
        element: <CreateAndEditUser />,
      },
      {
        path: "/admin/departments",
        element: <Department />,
      },
      {
        path: "/admin/campains",
        element: <Campaign />,
      },
    ],
  },
  {
    path: "/qam",
    element: <QAMPage />,
    children: [
      {
        path: "/qam/categories",
        element: <>categories</>,
      },
      {
        path: "/qam/dashboard",
        element: <>dashboard</>,
      },
    ],
  },
  {
    path: "/ideas",
    element: <Ideas />,
  },
  {
    path: "/management-ideas",
    element: <></>,
  },
];
