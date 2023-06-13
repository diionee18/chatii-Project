const sessionStorageKey = 'jwt'
const handleChannelMessages = async (channel) =>{
    window.addEventListener("beforeunload", function() {
        // Rensa den specifika datan från sessionStorage
        sessionStorage.removeItem("jwt");
      });
    const maybeJwt = sessionStorage.getItem(sessionStorageKey)
    const options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    }

    if(maybeJwt){
        options.headers.Authorization = "Bearer: " + maybeJwt
    }

    const response = await fetch('/api/messages/' + channel, options );
    if(response.status !== 200){
        console.log("Error fetching channels");
        return
    }
    const data = await response.json();
    console.log('Response: ', data);
    return data;
}

export {handleChannelMessages}

