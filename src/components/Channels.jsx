import { useState, useEffect } from "react";
import { handleChannels } from "../../data/getChannels";

const ChannelsList = () => {
    // const {emptyChannelList, setEmptyChannelList} = useState([])
    // const {inputChannelValue, setInputChannelValue} = useState("")
    const [ channels, setChannel]  = useState("");

    const onAllmäntClick = async () => {
        const updatedChannel = "allmänt";
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
                <button onClick={onAllmäntClick}>Allmänt</button>
                <button onClick={onGamingClick}>Gaming</button>
            </div>

            
        </div>
        </>
    );
};

export default ChannelsList;
