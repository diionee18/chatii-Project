import { API_URL } from "./constants";

const addChannel = async (channelName) =>{

    const channelData = {
        name: channelName,
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(channelData)
    }
    const response = await fetch(API_URL + "/channels", options)
    const data = await response.json()
    if(data){
        return true
    }
    return false

}

export {addChannel}