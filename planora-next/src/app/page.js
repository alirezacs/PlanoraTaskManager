'use client';

import AppBar from "@/components/appBar";
import Header from "@/components/header";
import TasksList from "@/components/tasksList";
import Calender from "@/components/ui/calender";
import { DateContext } from "@/context/DateContext";
import { Avatar, AvatarGroup } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
  const {date, updateDate} = useContext(DateContext);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-5 mb-[4rem]">
        <div className="p-4 border-solid border-gray-200 border-1 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{dayjs(date).format('YYYY MMMM')}</h2>
            <button className="text-xs bg-blue-700 py-1 px-3 rounded-lg text-white" onClick={e => updateDate(dayjs())}>Go To Today</button>
          </div>
          <div className="p-3 rounded-md border-solid border-gray-200 border-1">
            <Calender />          
          </div>
        </div>
        <TasksList />
      </div>
      <AppBar />
    </>
  );
}
