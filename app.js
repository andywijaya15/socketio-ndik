import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const options = {
  cors: {
    // origin: ["http://localhost:80", "https://ndik.helloworld.my.id"],
    origin: "*",
    methods: ["GET", "POST"],
  },
};

const io = new Server(httpServer, options);

io.use((socket, next) => {
  next();
});

io.on("connection", (socket) => {
  socket.on("sapa", (req) => {
    if (socket.client.conn.server.clientsCount > 1) {
      socket.broadcast.emit("dapetsapa", req.username);
    } else {
      socket.emit("nooneonline");
    }
  });

  socket.on("openchatroom", (data) => {
    socket.broadcast.emit("joinedroom", data.username);
  });

  socket.on("sendmsg", (data) => {
    socket.broadcast.emit("recmsg", data);
  });
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Hahaha nyala di ${port}`);
});
