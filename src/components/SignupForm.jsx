import { handleSignup } from "../data/SignupUser";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignupForm = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const result = await handleSignup(userName, userPassword)
            if (result){
                console.log('User created successfully');
                return
            }

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
            <form className="main-form" >
                <div className="form-div">
                <h2>Skapa Konto</h2>
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
                   <Link to="/Signin">
                   <button onClick={handleSubmit} className="login-btn">Skapa konto</button>
                    </Link> 
                    </div>
                </div>
            </form>
        </>
    );
};

export default SignupForm;