'use client'

import { createContext, useState } from "react";

type AppContextType = {
    isTaskDialogOpened: any,
    setIsTaskDialogOpened: any
}

export const AppContext = createContext<AppContextType | null>(null);

interface Props {
    [propName: string]: any;
}

const AppContextProvider = (props: Props) => {

    const [isTaskDialogOpened, setIsTaskDialogOpened] = useState(false);

    const value = {
        isTaskDialogOpened,
        setIsTaskDialogOpened
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider