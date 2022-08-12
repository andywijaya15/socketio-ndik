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
  let addedUser = false;

  socket.on("sapa", (req) => {
    if (socket.client.conn.server.clientsCount > 1) {
      socket.broadcast.emit("dapetsapa", req.username);
    } else {
      socket.emit("nooneonline");
    }
  });

  socket.on("openchatroom", (data) => {
    if (socket.client.conn.server.clientsCount > 1) {
      if (addedUser) {
        return;
      } else {
        socket.username = data.username;
        addedUser = true;
        socket.broadcast.emit("joinedroom", { username: socket.username });
        socket.emit("joinedroom", { username: socket.username });
      }
    } else {
      socket.emit("noone");
    }
  });

  socket.on("sendmsg", (data) => {
    socket.broadcast.emit("recmsg", {
      username: data.username,
      msg: data.msg,
    });
  });

  socket.on("reqreftable",(data)=>{
    socket.broadcast.emit("resreftable",data);
  });
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`Hahaha nyala di ${port}`);
});
