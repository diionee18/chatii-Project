const sessionStorageKey = 'jwt'

const sendMessage = async (message, channelName) =>{
    const maybeJwt = sessionStorage.getItem(sessionStorageKey)
    const currentUser = parseInt(sessionStorage.getItem("id"))
    
    const messageData = {
        channelName: channelName,
        message: message,
        userId: currentUser
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    }

    if(maybeJwt){
        options.headers.Authorization = "Bearer: " + maybeJwt
    }


    const response = await fetch( '/api/messages/' + channelName, options);
    if(response.status !== 200){
        console.log("Error sending message: " + response.status);
        return
    }
    const data = await response.json();
    console.log('Response: ', data, messageData.userId);
    return data;
}

export {sendMessage}