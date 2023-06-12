const editedMessage = async (message, timeStamp, channelName) => {
    
    const messageData = {
        message: message,
        timestamp: timeStamp
    }
    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    }

    const response = await fetch( "/api/messages/" + channelName, options);
    const data = await response.json();
    if(data){
        console.log('Response: ', data);
        return true
    }
    
}

export {editedMessage}