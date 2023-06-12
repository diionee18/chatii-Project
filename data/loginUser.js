import { API_URL } from "./constants"


const sessionStorageKey = 'jwt'
const handleLogin = async (username, password) =>{
    // window.location.reload();
    // sessionStorage.clear("jwt");
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

    const response = await fetch(API_URL + '/users' + '/login' , options)
    if(response.status !== 401){
        const data = await response.json()
        sessionStorage.setItem(sessionStorageKey, data.token)
        sessionStorage.setItem('id', data.id)
        return true
    }else{
        console.log('Login failed: ' + response.status);
        return

    }
    
}

const handleLogout = async () =>{
    sessionStorage.setItem("id", "0")
    sessionStorage.removeItem(sessionStorageKey)

}

export {handleLogin, handleLogout}