import { toast } from "react-toastify";
import api from "./axios";

const getCsrf = async () => {
    await api.get('sanctum/csrf-cookie');
}

export const login = async (data) => {
    await getCsrf();

    try{
        const response = await api.post('/api/login', data);
        
        if(response.status === 200){
            localStorage.setItem('user', JSON.stringify(response.data.data));
            toast.success(response.data.data.message);
            return true;
        }
    }catch(err){
        if(err.response?.data?.message){
            toast.error(err.response.data.message);
        }else{
            toast.error('Something went wrong. Please try again.');
        }
    }
    
}

export const getUser = async () => {
    try{
        const response = await api.get('/api/me');
        
        if(response.status === 200){
            return response.data.data;
        }
    }catch(err){
        if(err.response?.data?.message){
            toast.error(err.response.data.message);
        }else{
            toast.error('Something went wrong. Please try again.');
        }
    }
}

export const register = async (data) => {
    await getCsrf();

    try{
        const response = await api.post('/api/register', data);
        
        if(response.status === 200){
            localStorage.setItem('user', JSON.stringify(response.data.data));
            toast.success(response.data.data.message);
            return true;
        }
    }catch(err){
        if(err.response?.data?.message){
            toast.error(err.response.data.message);
        }else{
            toast.error('Something went wrong. Please try again.');
        }
    }
}

export const sendForgotPasswordEmail = async (email) => {
    await getCsrf();

    await api.post('/api/forgot-password', {'email': email})
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

export const resetPassword = async (data) => {
    await getCsrf();

    await api.post('/api/password-reset', data)
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