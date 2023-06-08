import { channelList, userList, isLoggdInId  } from "../../data/Atoms";
import { useEffect, useState,  } from "react";
import { useRecoilState } from "recoil";
import "../../styles/Chat.css";
import { getUsers } from "../../data/getUsers";

const ChatWindow = () => {
    const [activChannelList] = useRecoilState(channelList);
    const [loggedInUserId] = useRecoilState(isLoggdInId);

    return (
        <div>
            {activChannelList.map((channel, index) => (
                <div key={`${channel.userId}-${index}`}>
                    {channel.userId === loggedInUserId ? (
                        <div className="right-main">
                            <div className="right-wrapper">
                                <div> Användare: {channel.userId}</div>
                                <div> {channel.message}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="left-main">
                            <div className="left-wrapper">
                                <div> Användare: {channel.userId}</div>
                                <div> {channel.message}</div>
                                <div> {channel.userid}</div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatWindow;
