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
const channelNames = atom({
    key: 'channelNames',
    default:[],
})
const activeChannelName = atom({
    key: 'activeChannelName',
    default:"",
})
const authorizationError = atom({
    key: 'errorMessage',
    default:true,
})

export {logdin, channelList, userList, isLoggdInId, channelNames, activeChannelName, authorizationError} 