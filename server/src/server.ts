import express from "express";
import { Server } from "socket.io";
import http from "http";
import ENV from "./utils/env";

const app = express();
app.get("/test", (req,res) => res.json({msg:"ishladi"}));

const server  = http.createServer(app);
const io = new Server(server)

io.on("connection", (socket) =>{
    console.log(socket.id + " user connected");
    
    const {token} = socket.handshake.auth;
    if(token && token === "token"){
        console.log("userni qaytarvordim ortiga");
        
        socket.emit("token_error");
    }
    
    socket.on("new_data", (data, callback: unknown) =>{
       if(typeof callback == "function"){
            callback(data)
       }
       socket.broadcast.emit("answer_new_data", data);
    })
    

    socket.on("disconnect", () =>{
        console.log(socket.id + " user disconnected");
        
    })
})

server.listen(ENV.port,() => console.log(ENV.port + " portda server ishga tushdi"))