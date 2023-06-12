const getUsers = async () =>{

    const options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    }


    const response = await fetch('/api/users', options );
    if(response.status !== 200){
        console.log("Error fetching users");
        return
    }
    const data = await response.json();
    console.log('Response: ', data);
    return data;
}

export {getUsers}
