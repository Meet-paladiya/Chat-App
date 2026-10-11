import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectDB from "./lib/db.js";
import userRouter from "./route/userRoute.js";
import messageRouter from "./route/messageRoute.js";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "https://chat-app-henna-three-26.vercel.app",
  "https://chat-app-murex-gamma.vercel.app",
  "http://localhost:5173", // for development
  "http://localhost:5174",
];

if (process.env.CLIENT_URL) {
  const formattedClientUrl = process.env.CLIENT_URL.replace(/\/$/, "");
  if (!allowedOrigins.includes(formattedClientUrl)) {
    allowedOrigins.push(formattedClientUrl);
  }
}

// Dynamic origin check
const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      (origin.endsWith(".vercel.app") && origin.includes("chat-app"))
    ) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  credentials: true, // If you're using cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

//Initialize socket server
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

//Store online users
export const userSocketMap = {}; // userId:socketId

//Socket connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  //emit online users to connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use("/api/status", (req, res) => res.send("Server is live."));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
