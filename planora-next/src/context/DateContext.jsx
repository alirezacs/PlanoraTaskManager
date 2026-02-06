'use client';

import dayjs from "dayjs";

const { createContext, useState } = require("react");

export const DateContext = createContext();

const DateContextProvider = ({children}) => {
    const [date, setDate] = useState(dayjs('2005/05/05'));

    const updateDate = (newDate) => {
        setDate(newDate);
    }

    return(
        <DateContext.Provider value={{ date, updateDate }}>
            {children}
        </DateContext.Provider>
    );
}

export default DateContextProvider;