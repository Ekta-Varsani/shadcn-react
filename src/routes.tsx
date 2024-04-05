import { createBrowserRouter } from "react-router-dom";
import {lazy} from "react";
import AuthRoute from "@/guard/AuthGuard";

export const router = createBrowserRouter([
    {
        path: '',
        element: <AuthRoute children={lazy(() => import('./App') )} />,
        children: [
            {
                path: '',
                Component: lazy(() => import('./components/Dashboard') ),
            },
            {
                path: 'teams',
                Component: lazy(() => import('./components/Teams') ),
            },
            {
                path: 'projects',
                Component: lazy(() => import('./components/Dashboard') ),
            },
            {
                path: 'calendar',
                Component: lazy(() => import('./components/Dashboard') ),
            },
            {
                path: 'documents',
                Component: lazy(() => import('./components/Dashboard') ),
            },
            {
                path: 'reports',
                Component: lazy(() => import('./components/Dashboard') ),
            }
        ],
    },
    {
        path: 'login',
        Component: lazy(() => import('./components/authentication/page'))
    }
]);
