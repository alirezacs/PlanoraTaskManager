'use client';

import AppBar from "@/components/appBar";
import Header from "@/components/header";
import { getUser, sendForgotPasswordEmail } from "@/lib/auth";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');

    const fetchUser = async () => {
        const user = await getUser();
        if(user){
            setFullName(user.full_name);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const response = await api.put('api/profile', {'full_name': fullName});
        if(response.status === 200){
            fetchUser();
        }
    }

    const handleSendForgetPassword = async () => {
        const user = await getUser();
        await sendForgotPasswordEmail(user.email);
    }

    return (
        <>
            <Header />
            <div className="container mx-auto mt-5 mb-[4rem]">
                <div className="rounded-lg border-solid border-gray-200 border-1 p-5 shadow-xs mb-[3rem]">
                    <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="full_name" className="text-sm font-medium mb-2">Name (full name)</label>
                            <input type="text" className="flex h-10 w-full rounded-md border-solid border-gray-200 border-1 px-3 py-4 text-sm font-medium text-gray-700 outline-none mb-3" disabled={loading} value={fullName} onChange={e => setFullName(e.target.value)}/>
                            <button className="text-white bg-blue-600 rounded-lg py-2 text-sm font-semibold">Save Changes</button>
                        </div>
                    </form>
                </div>
                <div className="rounded-lg border-solid border-gray-200 border-1 p-5 shadow-xs">
                    <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
                    <p className="text-gray-400 text-sm mb-4">We'll send you an email with instructions to reset your password.</p>
                    <button className="border-solid border-gray-200 border-1 w-full py-2 rounded-lg text-sm" onClick={handleSendForgetPassword}>Send Reset Password Email</button>
                </div>
            </div>
            <AppBar />
        </>
    );
}

export default Page;