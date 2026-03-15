import express from "express"
import cookieParser from "cookie-parser";
import authrouter from "./routes/auth.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/auth" , authrouter)

app.get("/",(req,res)=>{
    res.json({message:"server is running"})
})



export default app
