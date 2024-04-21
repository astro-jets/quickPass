"use client"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { BsDoorOpen, BsPersonCircle } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";

type notificationProps = {
    id: string,
    title: string,
    description: string
}


const NavComponent = ({ notifications }: { notifications: notificationProps }) => {
    const { data: session, status } = useSession()
    const [profileState, setProfileState] = useState(false)
    const [open, setOpen] = useState(false);

    return (
        <header className={`absolute left-0 top-0 z-20 flex w-full items-center`}>
            <div className="container">
                <div className="relative -mx-4 flex items-center justify-between">
                    <div className="w-50 max-w-full px-4">
                        <a href="/#" className="block w-full py-5">
                            <h1 className="text-primaryk">Quick Pass</h1>
                        </a>
                    </div>
                    <div className="flex w-full items-center justify-between px-4">
                        <div>
                            <button
                                onClick={() => setOpen(!open)}
                                id="navbarToggler"
                                className={` ${open && "navbarTogglerActive"
                                    } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                            >
                                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                            </button>
                            <nav
                                id="navbarCollapse"
                                className={`absolute right-0 top-full w-full lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${!open && "hidden"
                                    } `}
                            >
                                <ul className="block lg:flex">
                                    <ListItem NavLink="/">Home</ListItem>
                                    <ListItem NavLink="/courses">Courses</ListItem>
                                    <ListItem NavLink="/about">About</ListItem>
                                    <ListItem NavLink="/contacts">Cotnact Us</ListItem>
                                </ul>
                            </nav>
                        </div>


                        {/* Profile */}
                        {status === "authenticated" ?
                            (
                                <>
                                    <div className="absolute inset-y-0 -right-20 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                                        {/* Profile dropdown */}
                                        <div className="relative ml-3">
                                            <div>
                                                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                                    onClick={() => { setProfileState(!profileState) }}
                                                >
                                                    <span className="absolute -inset-1.5"></span>
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-13 w-13 border-primary border-2 rounded-full" src="/images/user/user-01.png" alt="" />
                                                </button>
                                            </div>
                                            {
                                                profileState ?
                                                    <div className="space-y-3 flex flex-col items-center absolute -right-20  z-10 mt-2 w-[15rem] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" >

                                                        <div className="text-sm w-11/12 overflow-hidden bg-primary-600 text-primary rounded-md px-4 py-2">
                                                            <div className="flex space-x-4">
                                                                <div>
                                                                    <BsPersonCircle color={"blue"} size={25} />
                                                                </div>
                                                                <p className="text-lg">{session.user?.name}</p>
                                                            </div>
                                                        </div>

                                                        <Link href="/dashboard/" className="px-4 py-2 text-sm text-gray-700 flex items-center justify-between space-x-3 hover:bg-primary-500 hover:text-white rounded-md w-11/12" role="menuitem" id="user-menu-item-0">
                                                            <div className="flex space-x-4 hover:text-white">
                                                                <IoSpeedometerOutline color={"blue"} size={20} />
                                                                <p>Dashboard</p>
                                                            </div>
                                                            <span className="bg-primary-400 text-xs font-bold rounded-full w-5 h-5 p-3 text-white text-center flex items-center justify-center">12</span>
                                                        </Link>
                                                    </div> : null
                                            }
                                        </div>
                                    </div>

                                    <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                                        <button
                                            onClick={() => signOut({ callbackUrl: "/" })}
                                            className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            )
                            :
                            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                                <a
                                    href="/signin"
                                    className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90"
                                >
                                    Sign In
                                </a>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavComponent;

const ListItem = ({ children, NavLink }: { NavLink: string; children: any }) => {
    return (
        <>
            <li>
                <a
                    href={NavLink}
                    className="flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex"
                >
                    {children}
                </a>
            </li>
        </>
    );
};
