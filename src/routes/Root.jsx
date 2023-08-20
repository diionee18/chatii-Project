import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ChannelsList from "../components/Channels";
import { logdin } from "../data/Atoms";
import { useRecoilState } from "recoil";
import "../../styles/root.css"





const Root = () => {
    const [isLoading] = useRecoilState(logdin)
    
    return (
        <>
        <Header/>
        
            <main className="main-root">
            <ChannelsList/>
                <Outlet />
            </main>
        </>
    );
};

export default Root;