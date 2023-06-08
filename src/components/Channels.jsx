import { useState, useEffect } from "react";
import { channelList, isLoggdInId, userList } from "../../data/Atoms";
import { useRecoilState } from "recoil";
import { handleChannelMessages } from "../../data/getChannelMessages";
import "../../styles/Channels.css";
import ChatWindow from "../routes/Chat";
import { getUsers } from "../../data/getUsers";
import { Link, NavLink } from "react-router-dom";

const ChannelsList = () => {
    const [emptyChannelList, setEmptyChannelList] = useRecoilState(channelList);
    const [channels, setChannel] = useState("");
    const [isActive, setActive] = useState(true);
    const [loggedInUserId, setLoggedInUserId] = useRecoilState(isLoggdInId);
    const [chatUsers, setUsers] = useRecoilState(userList);

    const getAllUsers = async () => {
        const response = await getUsers();
        if (response) {
            setUsers(response);
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

    const onAllmäntClick = async () => {
        getAllUsers();
        const updatedChannel = "allmänt";
        setActive(!isActive);
        setChannel(updatedChannel);

        let existedChannel = emptyChannelList.slice();

        existedChannel.sort((a, b) => a.timestamp - b.timestamp);
        const messages = existedChannel;

        try {
            const data = await handleChannelMessages(updatedChannel);
            setEmptyChannelList(data);
            console.log("meddelande", messages);
            messages.forEach((m) => {
                console.log(m.userId + " posted: " + m.message);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onGamingClick = async () => {
        getAllUsers();
        const updatedChannel = "gaming";
        setChannel(updatedChannel);
        setActive(!isActive);

        let existedChannel = emptyChannelList.slice();

        existedChannel.sort((a, b) => a.timestamp - b.timestamp);
        const messages = existedChannel;

        try {
            const data = await handleChannelMessages(updatedChannel);
            setEmptyChannelList(data);
            console.log("empty channelList:", emptyChannelList);
            messages.forEach((m) => {
                console.log(m.userId + " posted: " + m.message);
            });
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
                    <button
                        onClick={onAllmäntClick}
                        className={
                            isActive ? "active-channel" : "inactive-channel"
                        }
                    >
                        Allmänt 👨‍👩‍👦‍👦
                    </button>
                    <button
                        onClick={onGamingClick}
                        className={
                            isActive ? "inactive-channel" : "active-channel"
                        }
                    >
                        Gaming 🎮
                    </button>
                </div>
            </div>
            <ChatWindow />
        </>
    );
};

export default ChannelsList;
