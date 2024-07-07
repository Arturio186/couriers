import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('WebSocket server is running...');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('location', (message: string) => {
        console.log('Received location:', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
