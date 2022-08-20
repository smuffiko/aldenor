import nodemailer from "nodemailer"

export default async function ApiEmail(req, res) {
  switch(req.method) {
    case "POST":
      await handlePostRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
  }
}

const handlePostRequest = async (req, res) => {
  const { replyTo, to, subject, html } = req.body
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD, 
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USERNAME}>`,
      to, replyTo, subject, html
    })
    res.status(200).send("Email successfully sent")
  } catch(e) {
    res.status(500).send("Error at sending email.")
  }
}