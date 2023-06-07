import { useState, useEffect } from "react";
import { channelList } from "../../data/Atoms";
import { useRecoilState } from "recoil";
import { handleChannels } from "../../data/getChannels";
import "../../styles/Channels.css";
import ChatWindow from "../routes/Chat";

const ChannelsList = () => {
    const [emptyChannelList, setEmptyChannelList] = useRecoilState(channelList)
    const [ channels, setChannel]  = useState("");
    const [isActive, setActive] = useState(true);

    const onAllmäntClick = async () => {
        const updatedChannel = "allmänt";
        setActive(!isActive)
        setChannel(updatedChannel);

        let existedChannel = emptyChannelList

        existedChannel.sort((a, b) => a.timestamp - b.timestamp);
        const messages = existedChannel;

        try {
            const data = await handleChannels(updatedChannel);
            setEmptyChannelList(data)
            console.log("meddelande", messages);
            messages.forEach( m => {
                console.log(m.userId + ' posted: ' + m.message);
            })

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
            setEmptyChannelList(data)
            console.log("empty channelList:", emptyChannelList);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
        <div className="channel-wrapper">

            <div className="channels">
                <button  onClick={onAllmäntClick} className={isActive ?  "active-channel" : "inactive-channel" }>Allmänt 👨‍👩‍👦‍👦</button>
                <button onClick={onGamingClick} className={isActive ? "inactive-channel" : "active-channel"} >Gaming 🎮</button>
            </div>

            
        </div>
        <ChatWindow/>
        </>
    );
};

export default ChannelsList;
