'use client';

import api from "@/lib/axios";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectUsers = ({defaultSelected = [], onChange}) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(defaultSelected || []);
    const [loading, setLoading] = useState(defaultSelected ? false : true);

    const getUsers = async () => {
        await api.get(`/api/user`)
            .then(res => {
                setUsers(res.data.data);
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

    const handleOpen = () => {
        setLoading(true);
        getUsers();
    }

    const handleChange = (e, newValue) => {        
        setSelectedUsers(newValue);
        onChange(newValue);
    }

    return (
        <Autocomplete
            multiple
            options={users}
            value={selectedUsers}
            disableCloseOnSelect
            getOptionLabel={(option) => option.full_name}
            renderOption={(props, option, {selected}) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected || selectedUsers.find(user => user.id === option.id) !== undefined}
                        />
                        {option.full_name}
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField {...params} label="Users" placeholder="Assign" />
            )}
            loading={loading}
            onOpen={handleOpen}
            onChange={handleChange}
        />
    );
}

export default SelectUsers;