import {io} from 'socket.io-client';

const instance = async () => {
    const option = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket']
    }
    const req = io.connect("http://localhost:5000",option);
    return req;
}

export default instance;

