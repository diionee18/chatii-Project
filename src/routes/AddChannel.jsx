import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logdin } from "../data/Atoms";
import { useRecoilState } from "recoil";
import "../../styles/LoginForm.css";
import { addChannel } from "../data/addChannel.js";

const AddNewChannel = () => {
    const [channelName, setChannelName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await addChannel(channelName);
            if (response) {
                console.log("Added channel" + channelName + response);
                return;
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleAddChannel = (e) => {
        setChannelName(e.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="main-form">
                <div className="form-div">
                    <h2>Lägg till en ny kanal</h2>

                    <div className="input-div">
                        <label htmlFor="name">Kanalens namn</label>
                        <input
                            id="name"
                            type="text"
                            value={channelName}
                            placeholder="Kanalensnamn"
                            onChange={handleAddChannel}
                        />
                    </div>

                    <div className="login-div">
                        <button type="submit" className="login-btn">
                            Lägg till kanal
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddNewChannel;
