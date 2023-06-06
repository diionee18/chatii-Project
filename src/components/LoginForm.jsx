import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { handleLogin } from "../../data/loginUser";


const LoginForm = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await handleLogin(userName, userPassword)
        if (result){
            console.log('logged in');
        }else{
            console.log('Could not login', result.message);
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
            <form className="main-form" onSubmit={handleSubmit}>
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
                   <Link to="/">
                   <button onClick={handleClick} type="submit" className="login-btn">Logga in</button>
                    </Link> 
                    </div>
                </div>
            </form>
        </>
    );
};

export default LoginForm;