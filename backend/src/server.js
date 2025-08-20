import { configDotenv } from "dotenv";
import express from "express";
import {ENV} from "./config/env.js";
import { clerkMiddleware } from "@clerk/express";
import {functions, inngest} from "./config/inngest.js";
import { serve} from "@inngest/express";
import chatRoutes from "./routes/chat.route.js";
import express from "express";
import cors from "cors";
import * as Sentry from "@sentry/node";


configDotenv();
const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());

// app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); // req.auth will be available in the request object
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello World! 123");
});


app.use("/api/inngest", serve({client: inngest, functions}));
app.use("/api/chat", chatRoutes);


Sentry.setupExpressErrorHandler(app);

// const startServer = async () => {
//   try {
//     await connectDB();
//     if (ENV.NODE_ENV !== "production") {
//       app.listen(ENV.PORT, () => {
//         console.log("Server started on port:", ENV.PORT);
//       });
//     }
//   } catch (error) {
//     console.error("Error starting server:", error);
//     process.exit(1); // Exit the process with a failure code
//   }
// };

// startServer();

app.listen(PORT, () => {
  console.log("Server started on port:", ENV.PORT);
}) 

export default app;