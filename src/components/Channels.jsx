import { useState, useEffect } from "react";
import {
    channelList,
    isLoggdInId,
    userList,
    channelNames,
    activeChannelName,
    authorizationError,
    logdin,
} from "../../data/Atoms";
import { useRecoilState } from "recoil";
import { handleChannelMessages } from "../../data/getChannelMessages";
import "../../styles/Channels.css";
import ChatWindow from "../routes/Chat";
import { getUsers } from "../../data/getUsers";
import { Link, NavLink } from "react-router-dom";
import { getChannelNames } from "../../data/getChannelNames";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faLockOpen,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

const ChannelsList = () => {
    const [emptyChannelList, setEmptyChannelList] = useRecoilState(channelList);
    const [isActive] = useState(true);
    const [loggedInUserId, setLoggedInUserId] = useRecoilState(isLoggdInId);
    const [chatUsers, setUsers] = useRecoilState(userList);
    const [channelNamesList] = useRecoilState(channelNames);
    const [channelUrl, setChannelUrl] = useState();
    const [activChannel, setActivChannel] = useRecoilState(activeChannelName);
    const [errorMessage, setErrorMessage] = useRecoilState(authorizationError);
    const [isLogdin] = useRecoilState(logdin);

    useEffect(() => {
        let selectedChannel = channelNamesList.find(
            (c) => c.userId == useParams.name
        );
        setChannelUrl(selectedChannel);
    }, [channelNamesList]);

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


    useEffect(() => {
        getAllUsers();
        existedChannelNames();
    }, []);

    const getChannelinfo = async (whichChannel) => {
        try {
            const data = await handleChannelMessages(whichChannel);
            if (!data) {
                setErrorMessage(true);
                console.log("You need to login to rewiew the channel");
            }
            setEmptyChannelList(data);
            setActivChannel(whichChannel);
            if (data) {
                setErrorMessage(false);
            }

            const userIdFromStorage = sessionStorage.getItem("id");
            const matchingUser = chatUsers.find(
                (user) => user.id === parseInt(userIdFromStorage)
            );

            if (matchingUser) {
                setLoggedInUserId(matchingUser.name);
            } else {
                sessionStorage.setItem("id", "0");
            }

            console.log("inloggad nu", loggedInUserId);
        } catch (error) {
            console.error(error);
        }
    };

    const openChannels = ["open"];
    return (
        <>
            <div className="channel-wrapper">
                <div className="channels">
                    {isLogdin && (
                        <>
                            <NavLink to="/new-channel" className="add-channel">
                                {" "}
                                <h3>

                                Skapa ny kanal
                                </h3>
                            </NavLink>
                            <hr />
                        </>
                    )}
                    {channelUrl &&
                        channelUrl.map((channel) => {
                            const isLocked = !openChannels.includes(channel);
                            const channelStatus = isLocked ? (
                                <FontAwesomeIcon icon={faLock} />
                            ) : (
                                <FontAwesomeIcon icon={faLockOpen} />
                            );
                            const channeledit = isLocked ? (
                                <button>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            ) : null;

                            return (
                                <div>
                                    <NavLink
                                        to={"/channel/" + channel}
                                        onClick={(e) => getChannelinfo(channel)}
                                        className="active-channel"
                                    >
                                        {channel} {channelStatus} {channeledit}
                                    </NavLink>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default ChannelsList;
