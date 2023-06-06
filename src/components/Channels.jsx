import { useState, useEffect } from "react";
import { handleChannels } from "../../data/getChannels";
import "../../styles/Channels.css";

const ChannelsList = () => {
    // const {emptyChannelList, setEmptyChannelList} = useState([])
    // const {inputChannelValue, setInputChannelValue} = useState("")
    const [ channels, setChannel]  = useState("");
    const [isActive, setActive] = useState(true);

    const onAllmäntClick = async () => {
        const updatedChannel = "allmänt";
        setActive(!isActive)
        setChannel(updatedChannel);
        try {
            const data = await handleChannels(updatedChannel);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const onGamingClick = async () => {
        const updatedChannel = "gaming";
        setChannel(updatedChannel);
        setActive(!isActive)
        try {
            const data = await handleChannels(updatedChannel);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await handleChannels(channels);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [channels]);

    return (
        <>
        <div className="channel-wrapper">

            <div className="channels">
                <button  onClick={onAllmäntClick} className={isActive ?  "active-channel" : "inactive-channel" }>Allmänt 👨‍👩‍👦‍👦</button>
                <button onClick={onGamingClick} className={isActive ? "inactive-channel" : "active-channel"} >Gaming 🎮</button>
            </div>

            
        </div>
        </>
    );
};

export default ChannelsList;
