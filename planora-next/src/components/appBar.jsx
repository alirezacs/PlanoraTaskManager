'use client';

import { Calendar, CheckCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AppBar = () => {
    const pathName = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-solid border-gray-200 border-t-1 py-2 backdrop-blur-sm bg-white/30">
            <div className="container flex items-center justify-around">
                <Link href="/profile" className={`flex flex-col items-center space-y-1 ${pathName === '/profile' ? '!text-blue-700' : '!text-gray-500'}`}>
                    <User className="h-5 w-5" />
                    <span className="text-xs">Profile</span>
                </Link>
                <Link href="/" className={`flex flex-col items-center space-y-1 ${pathName === '/' ? '!text-blue-700' : '!text-gray-500'}`}>
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">Calendar</span>
                </Link>
                <Link href="/tasks" className={`flex flex-col items-center space-y-1 ${pathName === '/tasks' ? '!text-blue-700' : '!text-gray-500'}`}>
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-xs">Tasks</span>
                </Link>
            </div>
        </nav>
    );
}

export default AppBar;