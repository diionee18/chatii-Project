import { useState, useEffect } from "react";
import {
    channelList,
    isLoggdInId,
    userList,
    channelNames,
    activeChannelName
} from "../../data/Atoms";
import { useRecoilState } from "recoil";
import { handleChannelMessages } from "../../data/getChannelMessages";
import "../../styles/Channels.css";
import ChatWindow from "../routes/Chat";
import { getUsers } from "../../data/getUsers";
import { Link, NavLink } from "react-router-dom";
import { getChannelNames } from "../../data/getChannelNames";
import { useParams } from "react-router-dom";

const ChannelsList = () => {
    const [emptyChannelList, setEmptyChannelList] = useRecoilState(channelList);
    const [isActive] = useState(true);
    const [loggedInUserId, setLoggedInUserId] = useRecoilState(isLoggdInId);
    const [chatUsers, setUsers] = useRecoilState(userList);
    const [channelNamesList] = useRecoilState(channelNames);
    const [channelUrl, setChannelUrl] = useState();
    const [activChannel, setActivChannel] = useRecoilState(activeChannelName)

    useEffect(() => {
        let selectedChannel = channelNamesList.find((c) => c.userId == useParams.name)
        setChannelUrl(selectedChannel)
    }, [channelNamesList])
    
    const getAllUsers = async () => {
        const response = await getUsers();
        if (response) {
            setUsers(response);
        }
    };

    const existedChannelNames = async () => {
        const data = await getChannelNames();
        if (data) {
            setChannelUrl(data);
            console.log("existed:", channelNamesList, "channelNames");
        }
    };

    // getAllUsers()
    useEffect(() => {
        const userIdFromStorage = sessionStorage.getItem("id");

        const matchingUser = chatUsers.find(
            (user) => user.id === parseInt(userIdFromStorage)
        );

        if (matchingUser) {
            setLoggedInUserId(matchingUser.name);
        }
    }, [chatUsers]);

    useEffect(() => {
        getAllUsers();
        existedChannelNames();
    }, []);

    const getChannelinfo = async (whichChannel) => {
        try {
            const data = await handleChannelMessages(whichChannel);
            setEmptyChannelList(data);
            setActivChannel(whichChannel)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="channel-wrapper">
                <div className="channels">
                    <NavLink to="/new-channel" className="add-channel">
                        {" "}
                        Lägg till ny kanal
                    </NavLink>
                    <hr />
                    {channelUrl && channelUrl.map((channel) => {
                        return (
                            <div>
                                <NavLink to={"/channel/" + channel} onClick={(e) => getChannelinfo(channel)}
                                    className={
                                        isActive
                                            ? "active-channel"
                                            : "inactive-channel"
                                    }
                                >
                                    {channel}
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <ChatWindow /> */}
        </>
    );
};

export default ChannelsList;
