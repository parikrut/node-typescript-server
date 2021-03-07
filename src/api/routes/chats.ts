// Credit - https://youtu.be/jD7FnbI76Hg

import { verifyAuthentication } from '../middlewares/userAuth';
import http from 'http';
import { Server } from 'socket.io';
const path = require('path');
const formatMessage = require('../../components/chat/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('../../components/chat/users');

export default (app: any) => {

    // Listen changes on /chat-app only who are logged in
    app.use('/chat-app', verifyAuthentication, function (req: any) {

        const botName = 'Testing Bot';
        const server = http.createServer(app);
        const io = new Server(server);

        io.on('connection', socket => {
            socket.on('joinRoom', (socket: any, req: any) => {
                //Setting the New user's Username to the Array of User who logged In
                const user = userJoin(socket.id, req.session.user.username, "Hard Coded Room name");

                socket.join(user.room);

                // Welcome current user
                socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

                // Broadcast when a user connects
                socket.broadcast
                    .to(user.room)
                    .emit(
                        'message',
                        formatMessage(botName, `${user.username} has joined the chat`)
                    );

                // Send users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                });
            });

            // Listen for chatMessage
            socket.on('chatMessage', (msg: string) => {
                const user = getCurrentUser(socket.id);

                io.to(user.room).emit('message', formatMessage(user.username, msg));
            });

            // Runs when client disconnects
            socket.on('disconnect', () => {
                const user = userLeave(socket.id);

                if (user) {
                    io.to(user.room).emit(
                        'message',
                        formatMessage(botName, `${user.username} has left the chat`)
                    );

                    // Send users and room info
                    io.to(user.room).emit('roomUsers', {
                        room: user.room,
                        users: getRoomUsers(user.room)
                    });
                }
            });
        });

    });

};
