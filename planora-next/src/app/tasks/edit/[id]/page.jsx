'use client';

import AppBar from "@/components/appBar";
import Header from "@/components/header";
import { Autocomplete, Box, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, { useEffect, useState } from "react";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import api from "@/lib/axios";
import { toast } from "react-toastify";
import SelectUsers from "@/components/ui/selectUsers";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

const Page = () => {
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const id = params.id;

    const defaultValues = {
        'title': '',
        'description': '',
        'date': null,
        'start_date': null,
        'end_date': null,
        'status': 'in_progress',
        'priority': 'medium',
        'assigns': [],
        'hasDate': false,
        'assign': true
    }
    
    const {control, handleSubmit, watch, setValue, reset, formState: {isSubmitting}} = useForm({
        defaultValues
    });

    const watchFields = watch();

    const fetchTask = async () => {
        await api.get(`/api/task/${id}`)
            .then(res => {
                const taskData = res.data?.data;
                   
                reset({
                    ...taskData,
                    start_date: taskData.start_date && new Date(taskData.start_date),
                    end_date: taskData.end_date && new Date(taskData.end_date),
                    date: taskData.date && dayjs(taskData.date).toDate(),
                    hasDate: true,
                    assign: taskData.assignments && taskData.assignments.length > 0 && true,
                    assigns: taskData.assignments
                });
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
        
        /* Fetch Task */
        setLoading(true);
        fetchTask();
        /* Fetch Task */

    }, []);

    const onSubmit = async (data) => {
        data.assigns = data.assigns.map(user => user.id);
        data.date = dayjs(data.date).format('YYYY-MM-DD');
        data.start_date = data.start_time && dayjs(data.start_time).format('YYYY-MM-DD');
        data.end_date = data.end_date && dayjs(data.end_date).format('YYYY-MM-DD');

        await api.put(`/api/task/${id}`, data)
            .then(res => {                
                toast.success(res.data?.message);
            })
            .catch(error => {
                if(error.response?.data?.message){
                    toast.error(error.response.data.message);
                }else{
                    toast.error('Something went wrong. Please try again.');
                }
            }); 
    }
    

    return (
        <>
            <Header />
            <div className="container mx-auto mt-5 mb-[4rem]">
                <h2 className="font-bold text-2xl text-gray-800 mb-2">Edit Task</h2>
                <div className="border-solid border-gray-200 border-1 shadow-sm p-4 rounded-md">
                    {loading ? (
                        <div className="h-[300px] flex justify-center items-center">
                            <CircularProgress />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="title"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        variant='standard'
                                        label='Title'
                                        fullWidth
                                        className="!mb-2"
                                    />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        variant='standard'
                                        label='Description'
                                        fullWidth
                                        className="!mb-2"
                                    />
                                )}
                            />
                            <FormControl variant="standard" sx={{ mt: 1 }} fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            fullWidth
                                            sx={{ my: 2 }}
                                        >
                                            <MenuItem value='in_progress'>In Progress</MenuItem>
                                            <MenuItem value='pending'>Pending</MenuItem>
                                            <MenuItem value='completed'>Completed</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel>Priority</InputLabel>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            fullWidth
                                            sx={{ my: 2 }}
                                        >
                                            <MenuItem value='low'>Low</MenuItem>
                                            <MenuItem value='medium'>Medium</MenuItem>
                                            <MenuItem value='high'>High</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                            <div className="flex flex-col my-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-700 text-lg font-bold flex items-center">
                                        <CalendarMonthIcon className="text-gray-700 mr-2" />
                                        Time
                                    </span>
                                    <Controller
                                        name="hasDate"
                                        control={control}
                                        render={({field}) => (
                                            <Switch
                                                defaultChecked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                                {watchFields.hasDate && (
                                    <div className="mt-2">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Controller
                                                name="date"
                                                control={control}
                                                render={({field}) => (
                                                    <DateTimePicker
                                                        {...field}
                                                        sx={{ width: '100%', mb: 2 }}
                                                        label='Date'
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name="start_date"
                                                control={control}
                                                render={({field}) => (
                                                    <DateTimePicker
                                                        {...field}
                                                        sx={{ width: '100%', mb: 2 }}
                                                        label='Time To Start'
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name="end_date"
                                                control={control}
                                                render={({field}) => (
                                                    <DateTimePicker
                                                        {...field}
                                                        sx={{ width: '100%' }}
                                                        label='End Time'
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col my-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-700 text-lg font-bold flex items-center">
                                        <PersonAddAltIcon className="text-gray-700 mr-2" />
                                        Assign To Others
                                    </span>
                                    <Controller
                                        name="assign"
                                        control={control}
                                        render={({field}) => (
                                            <Switch
                                                defaultChecked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                                {watchFields.assign && <SelectUsers defaultSelected={watchFields.assigns} onChange={data => setValue('assigns', data)} />}
                            </div>
                            <button className={`${isSubmitting ? 'bg-green-600/50' : 'bg-green-600'} text-white w-full rounded-md py-2 mt-3`} disabled={isSubmitting}>Update Task</button>
                        </form>
                    )}
                </div>
            </div>
            <AppBar />
        </>
    );
}

export default Page;