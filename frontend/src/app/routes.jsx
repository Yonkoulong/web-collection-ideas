import { SignIn } from "@/pages/Auth/SignIn";
import { AdminPage } from "@/pages/Admin";
import { UserManagement } from "@/pages/Admin/User-Management";
import { CreateAndEditUser } from "@/pages/Admin/CreateAndEditUser";
import { Department } from "@/pages/Admin/Department";
import { Campaign } from "@/pages/Admin/Campaign";
import { Ideas } from "@/shared/components/Ideas";
import { IdeaDetail } from "@/shared/components/Ideas/components/IdeaDetail";
import { QAMPage } from "@/pages/QAM";
import { Category } from "@/pages/QAM/Categories";
import { enumRoles } from "@/shared/utils/constant.utils";
import ProtectedRoute from "@/shared/HOC/AuthenticationRoute";
import AuthorizationRoute from "@/shared/HOC/AuthorizationRoute";

export const routes = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AuthorizationRoute allowRoles={[enumRoles.ADMIN]}>
          <AdminPage />
        </AuthorizationRoute>
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
    element: (
      <ProtectedRoute>
        <QAMPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/qam/categories",
        element: <Category />,
      },
      {
        path: "/qam/dashboard",
        element: <>dashboard</>,
      },
    ],
  },
  {
    path: "/ideas",
    element: (
      <ProtectedRoute>
        <Ideas />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ideas/:id",
    element: (
      <ProtectedRoute>
        <IdeaDetail />
      </ProtectedRoute>
    ),
  },
];
