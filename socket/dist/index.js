"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
const PORT = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('WebSocket server is running...');
});
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('location', (message) => {
        console.log('Received location:', message);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
