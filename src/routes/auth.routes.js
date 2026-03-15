import { Router } from "express";
import { register, verifyemail } from "../controller/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";


const authrouter = Router();

authrouter.post("/register", registerValidator, register)


authrouter.get("/verify-email",verifyemail)


export default authrouter