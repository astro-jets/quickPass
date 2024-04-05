"use client"

import { useState } from "react";
import { newSubscription } from "../actions/subcriptions";
import { useSession } from "next-auth/react";
import SucessModal from "./SuccessModal";
import { useRouter } from "next/navigation";

type serviceProps = {
    _id: string;
    name: string;
    price: string;
    list: string[];
};

const Paywall = ({ onClose, service }: { onClose: () => void, service: serviceProps }) => {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleClose = async () => {
        setIsLoading(false)
        setSuccess(false)
        router.push('/subscriptions');
    }

    const subscribe = async () => {
        setIsLoading(true)
        const res = await newSubscription(service._id, session?.user?.id!)
        if (res) {
            setSuccess(true)
            setIsLoading(false)
        }
    }
    if (!session?.user) { return }
    return (
        <>
            <div className="relative z-40" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg min-w-[80rem]">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                                <div className="font-[sans-serif] bg-white p-4">
                                    <div className="lg:max-w-7xl max-w-xl mx-auto">
                                        <div className="grid lg:grid-cols-3 gap-10">
                                            <div className="lg:col-span-2 max-lg:order-1">
                                                <form className="mt-16 min-w-[50rem]">
                                                    <h2 className="text-2xl font-extrabold text-[#333]">Payment method</h2>
                                                    <div className="grid gap-4 sm:grid-cols-2 mt-8">
                                                        <div className="flex items-center">
                                                            <input type="radio" className="w-5 h-5 cursor-pointer" id="card" checked />
                                                            <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                                                <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                                                                <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                                                                <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                                                            <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                                                <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="grid gap-6 mt-8">
                                                        <input type="text" placeholder="Cardholder's Name"
                                                            className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                                        <div className="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 ml-3" viewBox="0 0 291.764 291.764">
                                                                <path fill="#2394bc" d="m119.259 100.23-14.643 91.122h23.405l14.634-91.122h-23.396zm70.598 37.118c-8.179-4.039-13.193-6.765-13.193-10.896.1-3.756 4.24-7.604 13.485-7.604 7.604-.191 13.193 1.596 17.433 3.374l2.124.948 3.182-19.065c-4.623-1.787-11.953-3.756-21.007-3.756-23.113 0-39.388 12.017-39.489 29.204-.191 12.683 11.652 19.721 20.515 23.943 9.054 4.331 12.136 7.139 12.136 10.987-.1 5.908-7.321 8.634-14.059 8.634-9.336 0-14.351-1.404-21.964-4.696l-3.082-1.404-3.273 19.813c5.498 2.444 15.609 4.595 26.104 4.705 24.563 0 40.546-11.835 40.747-30.152.08-10.048-6.165-17.744-19.659-24.035zm83.034-36.836h-18.108c-5.58 0-9.82 1.605-12.236 7.331l-34.766 83.509h24.563l6.765-18.08h27.481l3.51 18.153h21.664l-18.873-90.913zm-26.97 54.514c.474.046 9.428-29.514 9.428-29.514l7.13 29.514h-16.558zM85.059 100.23l-22.931 61.909-2.498-12.209c-4.24-14.087-17.533-29.395-32.368-36.999l20.998 78.33h24.764l36.799-91.021H85.059v-.01z" data-original="#2394bc" />
                                                                <path fill="#efc75e" d="M51.916 111.982c-1.787-6.948-7.486-11.634-15.226-11.734H.374L0 101.934c28.329 6.984 52.107 28.474 59.821 48.688l-7.905-38.64z" data-original="#efc75e" />
                                                            </svg>
                                                            <input type="number" placeholder="Card Number"
                                                                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm outline-none" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-6">
                                                            <input type="number" placeholder="EXP."
                                                                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                                            <input type="number" placeholder="CVV"
                                                                className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                                            <label htmlFor="remember-me" className="ml-3 block text-sm">
                                                                I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 mt-8">
                                                        <button onClick={onClose} type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-700 text-white rounded-md hover:bg-gray-200">Back</button>
                                                        {!isLoading ?
                                                            <button onClick={() => { subscribe() }} type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]">
                                                                Confirm payment K{service.price}
                                                            </button> :
                                                            <button type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]" disabled>
                                                                <span className="animate-spin inline-block size-7 border-[5px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                                                                Subscribing
                                                            </button>
                                                        }
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="bg-gray-100 px-6 py-8 rounded-md">
                                                <h2 className="text-2xl font-extrabold text-[#333]">{service.name}</h2>
                                                <ul className="text-[#333] mt-10 space-y-6">
                                                    {
                                                        service.list.map(item => (
                                                            <li className="flex flex-wrap gap-4 text-base">{item}</li>
                                                        ))
                                                    }
                                                    <li className="flex flex-wrap gap-4 text-base font-bold border-t-2 pt-4">Total <span className="ml-auto">K {service.price}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SucessModal
                isOpen={success}
                message={`Successfully subscribed to ${service.name}`}
                onClose={() => { handleClose() }}
                title="Subscription Successfull"
                url=""
            />
        </>

    );
}

export default Paywall;