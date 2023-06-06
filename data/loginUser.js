import { API_URL } from "./constants"


const sessionStorageKey = 'jwt'
const handleLogin = async (username, password) =>{
    // Om det redan finns en token avslutar vi direkt.
    if (sessionStorage.getItem(sessionStorageKey) != null) {
        return;
    }

    const userData ={
        name: username,
        password: password
    }

    const options = {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    }

    const response = await fetch(API_URL + '/login', options)
    if(response.status !== 200){
        console.log('Login failed: ' + response.status);
        return
    }
    
    const data = await response.json()
    sessionStorage.setItem(sessionStorageKey, data.token)
    sessionStorage.setItem('id', data.id)
}

export {handleLogin}