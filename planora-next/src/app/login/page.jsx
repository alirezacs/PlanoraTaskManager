'use client';

import { login } from '@/lib/auth';
import api from '@/lib/axios';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { IconButton } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Index = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {email, password}

        await login(data) && redirect('/');
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white shadow p-6 rounded-md border-solid border-gray-300 border-1">
                <h1 className="text-center font-bold text-2xl mb-5">Welcome Back</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-5">
                        <label htmlFor="email" className="text-sm font-medium mb-2">Email</label>
                        <div className="border-solid border-gray-300 border-2 p-2 rounded-md focus-within:outline-solid outline-[#A591F5] outline-offset-3 flex items-center">
                            <MailOutlineIcon className='text-gray-400 mr-3' />
                            <input type="text" className='outline-none w-full text-sm' placeholder='Enter your email'  value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="password" className="text-sm font-medium mb-2">Password</label>
                        <div className="border-solid border-gray-300 border-2 p-2 rounded-md focus-within:outline-solid outline-[#A591F5] outline-offset-3 flex items-center">
                            <Password className='text-gray-400 mr-3' />
                            <input type={showPassword ? 'text' : 'password'} className='outline-none w-full text-sm' placeholder='Enter your password'  value={password} onChange={e => setPassword(e.target.value)}/>
                            <IconButton size='small' onClick={e => setShowPassword(!showPassword)}>
                                {showPassword ? <Visibility className='text-gray-400' /> : <VisibilityOff className='text-gray-400' />}
                            </IconButton>
                        </div>
                    </div>
                    <button className='w-full bg-[#A591F5] rounded-md py-2 text-sm text-white mb-3'>Sign In</button>
                    <p className='text-center text-sm text-gray-600'>
                        Don't have an account?
                        <Link href='/register' className='text-[#A591F5]'> Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Index;