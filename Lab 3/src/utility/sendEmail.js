import { createTransport } from "nodemailer";
import { emailTemplate } from "./emailTemp.js";

export default async function sendMails(email, OTPCode) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "itinoteapp@gmail.com",
      pass: "wjwt eyyd dbxs kwts",
    },
    tls: { rejectUnauthorized: false },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Note App ItI 👻" <itinoteapp@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailTemplate(email, OTPCode), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
