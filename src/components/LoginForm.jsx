import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { handleLogin } from "../../data/LoginUser";
import ChannelsList from "./Channels";


const LoginForm = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userName, userPassword);

        try{
            await handleLogin(userName, userPassword)
            sessionStorage.getItem('jwt');
        }catch (error){
            console.log(error.message);
        }


    }
    
    


    const handleUserNameChange = (e) => {
        setUserName(e.target.value)
    }

    const handleUserPasswordChange = (e) => {
        setUserPassword(e.target.value)
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="main-form" >
                <div className="form-div">
                    <div className="form-header">
                    </div>

                    <div className="input-div">
                        <label htmlFor="name">Användarnamn</label>
                        <input id="name" type="text" value={userName} placeholder="Användarnamn" onChange={handleUserNameChange} />
                    </div>

                    <div className="input-div">
                        <label htmlFor="password">Lösenord</label>
                        <input id="password" type="password" placeholder="Lösenord" value={userPassword} onChange={handleUserPasswordChange} />
                    </div>

                    <div className="login-div">
                   
                   <button type="submit" className="login-btn">Logga in</button>

                    
                    </div>
                </div>
            </form>
                   <ChannelsList/>
        </>
    );
};

export default LoginForm;