const deleteMessage = async (timeStamp, channelName) => {
    
    const messageData = {
        timestamp: timeStamp
    }
    const options = {
        method: 'DELETE',
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

export {deleteMessage}