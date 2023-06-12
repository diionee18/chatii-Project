import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ChannelsList from "../components/Channels";
import { logdin } from "../data/Atoms";
import { useRecoilState } from "recoil";





const Root = () => {
    const [isLoading] = useRecoilState(logdin)
    
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