'use client';

import AppBar from "@/components/appBar";
import Header from "@/components/header";
import TasksList from "@/components/tasksList";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto mt-5 mb-[4rem]">
                <div className="flex items-center justify-between mb-[4rem]">
                    <h2 className="text-xl font-semibold">Tasks</h2>
                    <Link href='/tasks/create' className="text-sm bg-blue-700 py-2 px-5 rounded-lg text-white">Create New Task</Link>
                </div>
                <TasksList />
            </div>
            <AppBar />
        </>
    );
}

export default Page;