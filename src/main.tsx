import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider } from "react-router";
import { router } from "./routes.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
