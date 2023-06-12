const editedMessage = async (message, timeStamp, channelName) => {
    
    const messageData = {
        message: message,
        timpestamp: timeStamp
    }
    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    }

    const response = await fetch( "/api/messages/" + channelName, options);
    if(response.status !== 200){
        console.log("Error sending message: " + response.status);
        return
    }
    const data = await response.json();
    console.log('Response: ', data);
    return data;
}

export {editedMessage}