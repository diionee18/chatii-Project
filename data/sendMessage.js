import { API_URL } from "./constants";

const sendMessage = async (message, channelName) =>{
    
    const messageData = {
        channelName: channelName,
        message: message,
        userId: sessionStorage.getItem('id'),
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    }
    const response = await fetch(API_URL + '/channels/' + channelName, options);
    if(response.status !== 200){
        console.log("Error sending message: " + response.status);
        return
    }
    const data = await response.json();
    console.log('Response: ', data);
    return data;
}

export {sendMessage}