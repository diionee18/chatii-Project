import { channelList, userList, isLoggdInId, activeChannelName } from "../../data/Atoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../../styles/Chat.css";
import { getUsers } from "../../data/getUsers";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendMessage } from "../../data/sendMessage";


const ChatWindow = () => {
    const [activChannelList] = useRecoilState(channelList);
    const [loggedInUserId] = useRecoilState(isLoggdInId);
    const [activChannel,] = useRecoilState(activeChannelName)
    const [message, setMessage] = useState("")


    const sendMessageToChannel = async () => {
        try {
            const data = await sendMessage(message, activChannel);
        } catch (error) {
            console.error(error);
        }
    };
   

    

    return (
        <div className="chat-wrapper">
            <div className="modal">
                {activChannelList.map((channel, index) => (
                    <div
                        className="chat-window"
                        key={`${channel.userId}-${index}`}
                    >
                        {channel.userId === loggedInUserId ? (
                            <div className="right-main">
                                <div className="right-wrapper">
                                    <div className="right-convo-look">
                                        <div className="right-convo-message">
                                            {" "}
                                            {channel.message}
                                        </div>
                                        <div> {channel.userId}</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="left-main">
                                <div className="left-wrapper">
                                    <div className="left-convo-look">
                                        <div className="left-convo-message">
                                            {channel.message}
                                        </div>
                                        
                                        <div> {channel.userId}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Send a message" />

                <div className="send-button">
                    <button onClick={sendMessageToChannel} >
                        <FontAwesomeIcon color="white" icon={faPaperPlane} size="2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
