import { channelList, userList} from "../../data/Atoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../../styles/Chat.css"
import { getUsers } from "../../data/getUsers";

const ChatWindow = () => {
    const [activChannelList] = useRecoilState(channelList);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [chatUsers, setUsers] = useRecoilState(userList)
    
    const getAllUsers = async () =>{
        const response = await getUsers()
        if (response){
            setUsers(response)
        }
    }
    
    useEffect(() => {
        const userIdFromStorage = sessionStorage.getItem("id");

        const matchingUser = chatUsers.find((user) => user.id === parseInt(userIdFromStorage));
;
        if (matchingUser) {
          setLoggedInUserId(matchingUser.name);

        }
      }, [chatUsers]);
      




    return (
        <div>
            {activChannelList.map((channel) => (
                <div key={channel.userId} > 
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
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatWindow;
