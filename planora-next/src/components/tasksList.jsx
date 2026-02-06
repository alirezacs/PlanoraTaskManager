'use client';

import { DateContext } from "@/context/DateContext";
import api from "@/lib/axios";
import { Avatar, AvatarGroup, Skeleton } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const TasksList = () => {
    const {date} = useContext(DateContext);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    const getTodayTasks = async () => {
        await api.get(`/api/task?date=${date}`)
            .then(res => {
                setTasks(res.data?.data || []);
                setLoading(false);                                
            })
            .catch(error => {
                if(error.response?.data?.message){
                    toast.error(error.response.data.message);
                }else{
                    toast.error('Something went wrong. Please try again.');
                }
            });
    }

    useEffect(() => {

        /* Get Today Tasks */
        setLoading(true);
        getTodayTasks();
        /* Get Today Tasks */        

    }, [date]);

    return (
        <section className="mt-[3rem]">
            <h2 className="text-xl font-semibold mb-4">Schedule for {date.format('MMMM DD, YYYY')}</h2>
            <div className="flex flex-col">
            {loading ? (
                <div className="rounded-lg border-solid border-gray-200 border-1 p-4 shadow-sm mb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <Skeleton width={150} />
                            <Skeleton width={150} />
                        </div>
                        <div>
                            <Skeleton width={40} />
                        </div>
                    </div>
                </div>
            ) : tasks.length < 1 ? (
                <p className="text-gray-900 font-bold">No Task Exists.</p>
            ) : tasks.map(task => (
                <Link href={`/tasks/edit/${task.id}`}>
                    <div className="rounded-lg border-solid border-gray-200 border-1 p-4 shadow-sm mb-2">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="font-medium">{task.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        {task.start_date && new Date(task.start_date).toLocaleDateString()}
                                        {task.start_date && task.end_date && ' - '}
                                        {task.end_date && new Date(task.end_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <AvatarGroup max={3} sx={{ width: '25px', height: '25px' }}>
                                    {task.assignments && task.assignments.length ? task.assignments.map(user => (
                                        <Avatar sx={{ width: '25px', height: '25px', fontSize: '12px' }} className="!bg-blue-700" alt={user.full_name} src="/static/images/avatar/1.jpg" />
                                    )) : null}
                                </AvatarGroup>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            </div>
      </section>
    );
}

export default TasksList;