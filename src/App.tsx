/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Suspense, useState } from 'react'
import { Outlet} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";


export default function Example() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpenFn={setSidebarOpen} />
            <div className="lg:pl-20">
                <Header sidebarOpen={sidebarOpen} setSidebarOpenFn={setSidebarOpen} />
                <main>
                    <div className="h-full py-10 sm:px-6 lg:px-8 lg:py-6">
                            <Suspense>
                            <Outlet />
                            </Suspense>
                    </div>
                </main>
            </div>
        </>
    )
}