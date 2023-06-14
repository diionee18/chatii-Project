import { Link } from "react-router-dom";
import "../../styles/Header.css";
import { useState } from "react";
import { logdin } from "../data/Atoms";
import { useRecoilState } from "recoil";
import ChannelsList from "./Channels";
import { handleLogout } from "../data/LoginUser";

const Header = () => {
    const [isActive, setActive] = useState(true);
    const [isLogdin, setLogdin] = useRecoilState(logdin);

    const logOut = async () => {
        await handleLogout()
        setLogdin(false)
    }
    


    return (
        <header>
            <div className="header-wrapper">
                <div>
                    <Link to="/">
                        <h1> Chatii </h1>
                    </Link>
                </div>
                
                <div className="user-account">
                    
                    {isLogdin ? 
                    <Link to="/">
                    <button onClick={logOut} className={isActive ?  "active" : "account-btn" }> Logga ut</button>
                    </Link>
                    :
                        <>
                    <Link to="/signin">
                        <button onClick={(e) => setActive(!isActive)} className={isActive ?  "active" : "account-btn" }> Logga in</button>
                    </Link>

                    <Link to="/signup">
                        <button onClick={(e) => setActive(!isActive)} className={isActive ? "account-btn" : "active"}> Skapa konto </button>
                    </Link>
                    
                </>
                
                }
                </div>
            </div>
            
            
            <ChannelsList/>
            
        </header>
    );
};

export default Header;
