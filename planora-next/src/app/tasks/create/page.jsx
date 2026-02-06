'use client';

import AppBar from "@/components/appBar";
import Header from "@/components/header";
import { Autocomplete, Box, Chip, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
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

const Page = () => {
    const defaultValues = {
        'title': '',
        'description': '',
        'date': new Date(),
        'start_date': null,
        'end_date': null,
        'status': 'in_progress',
        'priority': 'medium',
        'assigns': [],
        'hasDate': false,
        'assign': true
    }
    
    const {control, handleSubmit, watch, setValue, formState: {isSubmitting}} = useForm({
        defaultValues
    });

    const watchFields = watch();

    const onSubmit = async (data) => {
        data.assigns = data.assigns.map(user => user.id);
        data.date = dayjs(data.date).format('YYYY-MM-DD');
        data.start_date = data.start_time && dayjs(data.start_time).format('YYYY-MM-DD');
        data.end_date = data.end_date && dayjs(data.end_date).format('YYYY-MM-DD');
        
        await api.post('/api/task', data)
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
                <h2 className="font-bold text-2xl text-gray-800 mb-2">Create New Task</h2>
                <div className="border-solid border-gray-200 border-1 shadow-sm p-4 rounded-md">
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
                            {watchFields.assign && <SelectUsers onChange={data => setValue('assigns', data)} />}
                        </div>
                        <button className={`${isSubmitting ? 'bg-green-600/50' : 'bg-green-600'} text-white w-full rounded-md py-2 mt-3`} disabled={isSubmitting}>Create Task</button>
                    </form>
                </div>
            </div>
            <AppBar />
        </>
    )
}

export default Page;