import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js"
dotenv.config();
const app=express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(express.json());
app.use(cors());

/*using end points*/
app.use("/", authRoutes);
app.use("/books", bookRoutes);
app.use("/", reviewRoutes)

/*Mongoose setup*/ 
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
.then((result)=>{
    app.listen(PORT, ()=>{
        console.log(`server is active at PORT ${PORT}`)
    })
})
.catch(error=>{
    console.log(`didnot connect to mongoDB due to ${error}`)
})