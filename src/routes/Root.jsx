import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import {LoginContext} from "../ContextRoot"
import { useContext, useState } from "react";
import ChannelsList from "../components/Channels";




const Root = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);

    return (
        <>
        <Header/>
        {isLoggedIn && <ChannelsList/>}
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Root;