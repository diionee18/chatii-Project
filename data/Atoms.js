import {atom} from 'recoil';

const logdin = atom({
    key: 'logdin',
    default:false,
})

export {logdin}