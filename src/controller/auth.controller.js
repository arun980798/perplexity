import usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendemail } from "../services/mail.service.js";
import mongoose from "mongoose";

//rigster controller
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await usermodel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User with this email or username already exists",
        success: false,
        err: "User already exists",
      });
    }

    const user = await usermodel.create({ username, email, password });

    const emailVerificationToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    await sendemail({
      to: email,
      subject: "Welcome to Perplexity!",
      html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `,
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
}

export async function verifyemail(req,res) {
  try{
    const { token } = req.query

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await  usermodel.findOne({email:decoded.email })
    if(!user){
       return res.status(402).json({
        message:"inalid token ",
        success: false ,
        err:"user not found "
      })
    }

    user.verified = true 


    await user.save();

   const html = `
   <p>Hi ${user.username},</p>
   <p>Your email has been successfully verified. You can now log in to your account and start using our services.</p>
   <p>Best regards,<br>The Perplexity Team</p>
   `;

   res.send(html);
   

  }
 catch (err) {         
        console.error(err);
        res.status(500).json({ message: err.message, success: false }); 
    }
}