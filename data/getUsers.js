import { API_URL } from "./constants"
import { useRecoilState } from "recoil"
import { userList } from "./Atoms"

const getUsers = async () =>{

    const options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    }


    console.log(API_URL + '/users')
    const response = await fetch(API_URL + '/users', options );
    if(response.status !== 200){
        console.log("Error fetching users");
        return
    }
    const data = await response.json();
    console.log('Response: ', data);
    return data;
}

export {getUsers}
