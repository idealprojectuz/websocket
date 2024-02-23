import { useEffect, useRef } from 'react';
import io, {  Socket } from 'socket.io-client';

export const useSocket = (): Socket => {
    const token  = localStorage.getItem("token");
    const { current: socket } = useRef(io("http://localhost:5000",{
        transports:["websocket"],
        autoConnect: false,
        auth:{token}
    }));

    useEffect(() => {
        if(token){
            if(!socket.connected){
                socket.connect();
            }
        }else{
            socket.disconnect();
        }
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);

    return socket;
};