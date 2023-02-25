import { SignIn } from '@/pages/Auth/SignIn';
import { AdminPage } from '@/pages/Admin';

export const routes = [
    {
        path: "/",
        element: <SignIn />
    },
    {
        path: "/admin",
        element: <AdminPage />,
        children: [
            {
                path: "/admin/users",
                element: <></>
            }
        ]

    },
    {
        path: "/ideas"
    }
];