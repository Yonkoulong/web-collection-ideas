import { SignIn } from "@/pages/Auth/SignIn";
import { AdminPage } from "@/pages/Admin";
import { UserManagement } from "@/pages/Admin/User-Management";
import { CreateAndEditUser } from "@/pages/Admin/CreateAndEditUser";
import { DepartmentManagement } from "@/pages/Admin/Department";
import { CampaignManagement } from "@/pages/Admin/Campaign";
import { Campaigns } from "@/shared/components/Campaigns"
import { CampaignList } from "@/shared/components/Campaigns/CampaignList"
import { Ideas } from "@/shared/components/Ideas";
import { IdeaDetail } from "@/shared/components/Ideas/components/IdeaDetail";
import { QAMPage } from "@/pages/QAM";
import { Dashboard } from "@/pages/QAM/Dashboard";
import { CategoryManagement } from "@/pages/QAM/Categories";
import { enumRoles } from "@/shared/utils/constant.utils";
import { PageNotFound } from "@/pages/404";
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
        path: "/admin/departments-management",
        element: <DepartmentManagement />,
      },
      {
        path: "/admin/campains-management",
        element: <CampaignManagement />,
      },
    ],
  },
  {
    path: "/qam",
    element: (
      <ProtectedRoute>
        <AuthorizationRoute allowRoles={[enumRoles.QAM]}>
          <QAMPage />
        </AuthorizationRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/qam/categories-management",
        element: <CategoryManagement />,
      },
      {
        path: "/qam/dashboard",
        element: <Dashboard/>,
      },
    ],
  },
  {
    path: "/campaigns",
    element: (
      <ProtectedRoute>
        <Campaigns />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/campaigns",
        element: (
          <CampaignList />
        )
      },
      {
        path: "/campaigns/:idCampaign/ideas",
        element: (
          <Ideas />
        )
      },
      {
        path: "/campaigns/:idCampaign/ideas/:idIdea",
        element: (
          <IdeaDetail />
        )
      },
    ]
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
