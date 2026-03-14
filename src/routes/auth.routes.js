import { Router } from "express";
import { register } from "../controller/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";


const authrouter = Router();

authrouter.post("/rigster",registerValidator,register)



export default authrouter