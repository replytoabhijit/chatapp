// const express = require('express');
import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors';
import connectToMongoDB from './db/connectToMongoDB.js';
import { addMsgToConversation } from './controllers/msgs.controller.js';
import msgsRouter from './routes/msgs.route.js';

dotenv.config();
const PORT = process.env.PORT || 5002;

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
       allowedHeaders: ["*"],
       origin: "*"
     }
});

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log("client connected");
    const username = socket.handshake.query.username;
    console.log("Username: " + username);
    userSocketMap[username] = socket;
    socket.on('chat msg', (msg) => {
        //socket.broadcast.emit('chat msg', msg);
        console.log("Sender: " +msg.sender);
        console.log("Message: " +msg.text);
        console.log("Receiver: " +msg.receiver);
        //socket.broadcast.emit('chat msg', msg);
        const receiverSocket = userSocketMap[msg.receiver];
        if(receiverSocket) {
            receiverSocket.emit('chat msg', msg);
        }
        addMsgToConversation([msg.sender, msg.receiver], {
            text: msg.text,
            sender: msg.sender,
            receiver: msg.receiver
        });
    })
})

app.use(cors());

app.use('/msgs', msgsRouter);
app.get('/', (req,res) => {
    res.send("Congratulations on setting up your first Node.js server with Express!");
});

server.listen(PORT, (req, res) => {
    connectToMongoDB();
    console.log('Server is running on Port ' + PORT);
});