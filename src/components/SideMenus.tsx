import { Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const SideMenus = (props: any) => {
    const [navigationMenus, setnavigationMenus] = useState([...props.navigationMenus]);

    const toggleMenu = (index: number) => {
        const newNavs = [...navigationMenus];
        newNavs[index].current = !newNavs[index].current;
        updateNavigationState(newNavs);
    }

    const updateNavigationState = (navs: any) => {
        props.updateNavigationState(navs)
    }

    return <ul role="list" className="flex-col items-center space-y-1">
            {navigationMenus.map((item: any, index: number) => (
                <li key={item.name}>
                    {
                        item.type === "link" ?
                        <NavLink
                            to={item.href}
                            className={({ isActive }) =>
                                classNames(isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800", 'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold')
                            }
                        >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            <span className={props.showLabel ? 'text-nowrap' : 'sr-only'}>{item.name}</span>
                        </NavLink> :
                        <>
                            <div className={
                                    classNames("text-gray-400 hover:text-white hover:bg-gray-800", 'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold')
                                }
                                onClick={() => {toggleMenu(index)}}>
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                <div className={props.showLabel ? 'w-full flex justify-between text-nowrap ' : 'sr-only'}>
                                    <span>{item.name}</span>
                                    <ChevronRightIcon className={`h-6 w-6 shrink-0 duration-300 ${item.current ? 'rotate-90' : ''}`} />
                                </div>
                            </div>

                            <Transition.Root show={item.current} as={Fragment}>
                                <Transition
                                appear={true}
                                as={Fragment}
                                    enter="transition-[max-height] ease-in-out duration-300"
                                    enterFrom="opacity-0 max-h-0"
                                    enterTo="opacity-100 max-h-[500px]"
                                    leave="transition-[max-height] ease-in-out duration-300"
                                    leaveFrom="opacity-100 max-h-[500px]"
                                    leaveTo="opacity-0 max-h-0"
                                >
                                    <div className={`overflow-hidden ${props.showLabel ? 'ps-4' : ''}`}>
                                        <SideMenus 
                                            navigationMenus={item.subMenus} 
                                            showLabel={props.showLabel}
                                            updateNavigationState={updateNavigationState}
                                        />
                                    </div>
                                </Transition>
                            </Transition.Root>
                        </>
                    }
                
                </li>
            ))}
        </ul>;
};

export default SideMenus;
