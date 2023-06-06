import { API_URL } from "./constants"

const handleChannels = async (channel) =>{
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
        },
    }
    console.log(API_URL + '/channel?channel=' + channel)
    const response = await fetch(API_URL + '/channel?channel=' + channel, options );
    const data = await response.json();
    console.log('Response: ', data);
    return data;
}

export {handleChannels}

