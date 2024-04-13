import { Transition, Dialog } from "@headlessui/react";
import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import SideMenus from "./SideMenus";
import { useMatches } from "react-router-dom";

let navigations = [
    { name: 'Dashboard', href: '', icon: HomeIcon, current: false, type: "link" },
    { name: 'Team', href: '/teams', icon: UsersIcon, current: false, type: "link" },
    { name: 'Projects', href: '/projects', icon: FolderIcon, current: false, type: "link" },
    { 
        name: 'Reports',
        href: '/reports',
        icon: ChartPieIcon,
        current: false,
        type: "dropdown",
        subMenus: [
            { name: 'Item 1', href: '/reports/404', icon: HomeIcon, current: false, type: "link" },
            { name: 'Item 2', href: '/reports/404', icon: UsersIcon, current: false, type: "link" },
            { name: 'Item 3', href: '/reports/404', icon: FolderIcon, current: false, type: "link" },
            { name: 'Item 4', href: '/reports/documents', icon: DocumentDuplicateIcon, current: false, type: "dropdown",
                 subMenus: [
                    { name: 'Item 1', href: '/reports/1', icon: HomeIcon, current: false, type: "link" },
                    { name: 'Item 2', href: '/reports/2', icon: UsersIcon, current: false, type: "link" },
                    { name: 'Item 3', href: '/reports/3', icon: FolderIcon, current: false, type: "link" },
                    { name: 'Item 4', href: '/reports/documents/1', icon: DocumentDuplicateIcon, current: false, type: "link" },
                ]
             },
        ]
    },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon, current: false, type: "link" },
    { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon, current: false, type: "link" },
]


const Sidebar = (props: any) => {
    const [showLabel, setShowLabel] = useState(false)
    const [navigation, setNavigation] = useState([...navigations])
    const matches = useMatches();

    const handleHover = (val: boolean) => {
        setShowLabel(val);
    }

    const updateNavigationState = (navs: any) => {
        setNavigation([...navs])
    }

    const navHelper = (navs: any) => {
        const paths = matches.map((path: any) => path.pathname)
        for(let i=0; i<navs.length; i++) {
            if (paths.includes(navs[i].href) &&
                navs[i].type === "dropdown") {
                navs[i].current = !navs[i].current;
                if(navs[i]?.subMenus?.length) {
                    navs[i].subMenus = navHelper(navs[i].subMenus);
                }
                break;
            }
        }
        return navs;
    }

    useEffect(() => {
        updateNavigationState(navHelper(navigation));
    }, [matches])

  return <>
    <Transition.Root show={props.sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={() => {props.setSidebarOpenFn(false)}}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                <button type="button" className="-m-2.5 p-2.5" onClick={() => props.setSidebarOpenFn(false)}>
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </Transition.Child>

                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col px-4">
                                <SideMenus 
                                    navigationMenus={navigation}
                                    showLabel={props.sidebarOpen ? true : showLabel}
                                    updateNavigationState={updateNavigationState}
                                />
                            </nav>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>

    {/* Static sidebar for desktop */}
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex flex-col lg:w-20 hover:w-72 lg:bg-gray-900 lg:pb-4 transition-[width] duration-300"
            onMouseEnter={ () => {handleHover(true)}}
            onMouseLeave={ () => {handleHover(false)}}
    >
        <div className="flex h-16 shrink-0 items-center justify-center">
            <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
            />
        </div>
        <nav className="mt-8 px-4 flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <SideMenus 
                navigationMenus={navigation}
                showLabel={showLabel}
                updateNavigationState={updateNavigationState}
            />
        </nav>
    </div>
  </>;
};

export default Sidebar;
