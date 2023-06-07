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

export {logdin, channelList, userList} 