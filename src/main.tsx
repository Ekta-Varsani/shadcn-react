import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Suspense } from "react";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Suspense>
        <RouterProvider router={router} />
    </Suspense>
);
