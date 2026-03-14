//ye hamare server or smtp server jo mail send karega uske bech me conmminicate karega

import dotenv from "dotenv";

dotenv.config();
import Nodemailer from "nodemailer";

const transporter = Nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.google_user,
    clientId: process.env.google_clint_id,
    clientSecret: process.env.google_clint_secret,
    refreshToken: process.env.google_refresh_token,
  },
});

transporter
  .verify()
  .then(() => {
    console.log(" transpoter is connected");
  })
  .catch((err) => {
    console.log(err);
  });

export async function sendemail({ to, subject, html, text }) {
  const mailoption = {
    from: process.env.google_user,
    to,
    subject,
    html,
    text,
  };

  const details = await transporter.sendMail(mailoption);
  console.log("email send", details);
}
