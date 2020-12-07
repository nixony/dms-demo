import axios from 'axios';

export default axios.create({
    baseURL: 'http://dir.tsl.dmscore.club/api',
    params: {}
});