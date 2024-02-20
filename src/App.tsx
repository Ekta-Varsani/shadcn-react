import {useEffect, useState} from "react"
import "./App.scss"
import { Button } from "./components/ui/button"

export default function App() {
    const [isSidebarOpen, sibeBarToggle] = useState<boolean>(false);
    const [showToggleMenu, setShowToggleMenu] = useState<boolean>(false);
    // const [windowSize, setWindowSize] = useState<{width: number, height: number}>({
    //     width: null,
    //     height: null,
    // });
    const handleResize = () => {
        // setWindowSize({
        //     width: window.innerWidth,
        //     height: window.innerHeight,
        // });
        if (window.innerWidth < 640) {
            // setBreakPoint(breakpoints[0]);
            console.log("FIRST")
            setShowToggleMenu(true);
        }
        else if (window.innerWidth < 768) {
            // setBreakPoint(breakpoints[600]);
            console.log("SECOND")
            setShowToggleMenu(true);
        }
        else if (window.innerWidth < 1024) {
            console.log("here 1024")
            setShowToggleMenu(false);
        }
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerWidth]);
  const toggleSidebar = () => {
    console.log("toggle state", isSidebarOpen)
    sibeBarToggle(!isSidebarOpen);
  }

  return (
    <>
        <div className="h-full w-full">
            <div className={`sidebar absolute h-full top-0 ${isSidebarOpen ? 'open_sidebar' : ''}`}>
            </div>
            {isSidebarOpen ? <div className={`backdrop absolute h-full w-full`} onClick={toggleSidebar}>
            </div> : ''}
            <div className={`content`}>
                {showToggleMenu}
                {showToggleMenu ? <Button onClick={toggleSidebar}>Button</Button> : ''}
            </div>
        </div>
    </>
  )
}
