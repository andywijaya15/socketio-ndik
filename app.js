import { createServer } from "http";
import  {Server}  from "socket.io";

const httpServer = createServer();

const options = {
  cors: {
    // origin: "https://ndik.helloworld.my.id",
    origin: "*",
  },
};

const io = new Server(httpServer, options);

io.use((socket, next) => {
  next();
});

io.on("connection", (socket) => {
  socket.on("connected", (data) => {
    socket.emit("nyambung", `Welcome ${data.username}`);
  });
});

httpServer.listen(3000, () => {
  console.log("Hahaha nyala di 3000");
});
