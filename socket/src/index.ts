import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";

config();

const app = express();
const server = createServer(app);

console.log(process.env.OPERATOR_URL)

const io = new Server(server, {
    cors: {
        origin: process.env.OPERATOR_URL,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const PORT = process.env.PORT || 3001;

interface ICourierLocation {
    userId: string;
    userBranchId: string;
    lat: number;
    long: number;
}

interface ICourierConnection {
    userId: string;
    userBranchId: string;
    userFirstName: string;
    userLastName: string;
}

interface IOperatorConnection {
    branchId: string;
}

const connectedCouriers = new Map<string, ICourierConnection>();

app.get("/", (req, res) => {
    res.send("WebSocket server is running...");
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("new_courier", (message: ICourierConnection) => {
        const connectionId = socket.id;
        connectedCouriers.set(connectionId, message);

        const room = `branch_${message.userBranchId}`;
        socket.join(room);

        io.to(room).emit("courier_connected", message);
        // console.log(`Закинул юзера в комнату: ${room}`);
    });

    socket.on("location", (message: ICourierLocation) => {
        // console.log("Курьер отправил локацию:", message);

        const room = `branch_${message.userBranchId}`;

        io.to(room).emit("location_update", {
            userId: message.userId,
            lat: message.lat,
            long: message.long
        }); 
    });

    socket.on("new_operator", (message: IOperatorConnection) => {
        const room = `branch_${message.branchId}`;
        socket.join(room);
        // console.log("Подключился оператор к комнате:", room);
        
        connectedCouriers.forEach((courier, id) => {
            if (courier.userBranchId === message.branchId) {
                socket.emit("courier_connected", courier);
            }
        });
    });

    socket.on("disconnect", () => {
        const connectionId = socket.id;
        const courier = connectedCouriers.get(connectionId);

        if (courier) {
            const room = `branch_${courier.userBranchId}`;
            connectedCouriers.delete(connectionId);

            io.to(room).emit("courier_disconnected", courier);
            //console.log("Курьер отключился:", connectionId);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
