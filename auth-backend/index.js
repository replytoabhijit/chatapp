// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';



dotenv.config();
const PORT = process.env.PORT || 5005;

const app = express();

app.use(express.json());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005'];
app.use(cookieParser());
app.use(cors({
 credentials: true,
 origin: allowedOrigins
}
));
app.get('/', (req,res) => {
    res.send("Congratulations on setting up your first Node.js server with Express!");
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT, (req, res) => {
    connectToMongoDB();
    console.log('Server is running on Port ' + PORT);
});