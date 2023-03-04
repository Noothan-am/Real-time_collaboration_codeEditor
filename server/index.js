const express = require('express');
const http = require('http');
const {Server} = require('socket.io')
const app = express();
const server  =  http.createServer(app);

const io = new Server(server); 
const allUsers = {};

const getuser = (id) => {
    return Array.from(io.sockets.adapter.rooms.get(id)).map(socketid =>{
        return {
            socketid,
            name: allUsers[socketid]
        }
    });
}
io.on('connection',(socket)=>{

    socket.on("joined",({id,username})=>{    
        allUsers[socket.id] = username                  
        socket.join(id);
        const users = getuser(id); 
        users.forEach(({socketid})=>{
            
            socket.to(socketid).emit("logedin",{
                users,
                socket_id:socket.id,
                username,
            })
        })


    })

    socket.on("codeChange",({id,code})=>{
        socket.in(id).emit("code",{
            code
        })
    })

    socket.on("codeSync",({id,code})=>{
        io.to(id).emit("code",{
            code
        })
    })

    socket.on('disconnecting',()=>{
        const rooms = [...socket.rooms];
        rooms.forEach(room => {
            socket.in(room).emit("left",{
                socketid:socket.id,
                username:allUsers[socket.id]
            })
        })
        delete allUsers[socket.id];
        socket.leave();
    })
    
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`listening to port no ${PORT}`);
})