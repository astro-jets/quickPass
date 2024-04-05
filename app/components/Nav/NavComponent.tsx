"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import { getURL } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { IconContext } from "react-icons";
import { BsBell, BsDoorOpen, BsExclamationCircle, BsPersonCircle } from "react-icons/bs"
import { IoSpeedometerOutline } from "react-icons/io5";
import NotificationModal from "@/app/components/NotificationModal"
import { readNotifications } from "@/app/actions/action";
import { useRouter } from "next/navigation";
import SearchForm from "./SearchForm";

type notificationProps = {
    _id: string,
    title: string,
    description: string
}[]


const links = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Courses',
        url: '/courses'
    },
    {
        name: 'About Us',
        url: '/about'
    }, {
        name: 'Contact Us',
        url: '/contacts'
    },
]

const initialModal = {
    status: false,
    message: '',
    title: ''
}
const NavbarComponent = ({ notifications }: { notifications: notificationProps }) => {
    const { data: session, status } = useSession()
    const [menuState, setMenuState] = useState(false)
    const [profileState, setProfileState] = useState(false)
    const [notificationState, setNotificationState] = useState(false)
    const url = getURL();
    const [modal, setModal] = useState(initialModal)
    const router = useRouter();

    const handleNotificationClick = async (notification: any) => {
        console.table(notification)
        const res = await readNotifications(notification._id)
        if (res) {
            setModal({
                status: true,
                message: notification.description as string,
                title: notification.title as string
            });
            router.refresh();
        }
    }

    return (
        <>
            <div className="container-fluid bg-dark text-light p-0">
                <div className="row gx-0 d-none d-lg-flex">
                    <div className="col-lg-7 px-5 text-start">
                        <div className="h-100 d-inline-flex align-items-center me-4">
                            <small className="fa fa-map-marker-alt text-primary me-2"></small>
                            <small>123 Street, New York, USA</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center">
                            <small className="far fa-clock text-primary me-2"></small>
                            <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
                        </div>
                    </div>
                    <div className="col-lg-5 px-5 text-end">
                        <div className="h-100 d-inline-flex align-items-center me-4">
                            <small className="fa fa-phone-alt text-primary me-2"></small>
                            <small>+012 345 6789</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center mx-n2">
                            <a className="btn btn-square btn-link rounded-0 border-0 border-end border-secondary" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-square btn-link rounded-0 border-0 border-end border-secondary" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-square btn-link rounded-0 border-0 border-end border-secondary" href=""><i className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-square btn-link rounded-0" href=""><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-gray-800 text-sm py-4 ">
                <nav className="max-w-[85rem] max-h-14 overflow-hidden w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                    <div className="flex items-center justify-between">
                        <a className="flex-none text-xl font-semibold dark:text-white" href="/">Quick Pass</a>
                        <div className="sm:hidden">
                            <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-with-collapse" aria-controls="navbar-with-collapse" aria-label="Toggle navigation">
                                <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                    </div>
                    <div id="navbar-with-collapse" className="hidden basis-full grow sm:block">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                            {
                                links.map(link => (
                                    link.url === url ?
                                        <a className="font-medium text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href={link.url} aria-current="page">{link.name}</a>
                                        :
                                        <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href={link.url} >
                                            {link.name}
                                        </a>
                                ))
                            }
                            <SearchForm />
                        </div>
                    </div>
                </nav>
            </header>

            <NotificationModal
                message={modal.message}
                title={modal.title}
                isOpen={modal.status}
                onClose={() => {
                    setModal({
                        ...initialModal,
                        status: false
                    });
                }
                }
            />
        </>
    );
}

export default NavbarComponent;