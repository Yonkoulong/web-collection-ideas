import { createBrowserRouter } from 'react-router-dom';

import { SignIn } from '@/pages/Auth/SignIn';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />
    },
])