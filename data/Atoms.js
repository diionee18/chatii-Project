import {atom} from 'recoil';

const logdin = atom({
    key: 'logdin',
    default:false,
})


const channelList = atom({
    key: 'channelList',
    default:[],
})

const userList = atom({
    key: 'userList',
    default:[],
})
const isLoggdInId = atom({
    key: 'isLoggdInId',
    default:null,
})

export {logdin, channelList, userList, isLoggdInId} 