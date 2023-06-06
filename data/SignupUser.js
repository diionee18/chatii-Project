
const handleSignup = async (username,password) =>{

    const userData ={
        name: username,
        password: password
    }

    let options = {
        method: 'POST',
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(userData)
    }

    const response = await fetch('/login', options)
    if(response.status !== 200){
        console.log('Login failed: ' + response.status);
        return
    }
    const data = await response.json()

}

export {handleSignup}