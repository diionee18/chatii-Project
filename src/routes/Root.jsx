import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import {LoginContext} from "../ContextRoot.jsx"
import React, { useContext } from 'react';
import ChannelsList from "../components/Channels";





const Root = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);
    
    return (
        <>
        <Header/>
        
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Root;