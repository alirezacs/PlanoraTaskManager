'use client';

import { DateContext } from "@/context/DateContext";
import dayjs from "dayjs";
import { useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const Calender = () => {
    const {date, updateDate} = useContext(DateContext);

    const handleSelect = (newDate) => {
        updateDate(dayjs(newDate));
    }

    return (
        <DayPicker
            animate
            mode="single"
            selected={date.toDate()}
            month={date.toDate()}
            onSelect={handleSelect}
        />
    );
}

export default Calender;