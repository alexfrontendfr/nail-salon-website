import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name, date, time, service } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: '"Nail Factory Groningen" <noreply@nailfactorygroningen.com>',
        to: email,
        subject: "Booking Confirmation",
        text: `Dear ${name},\n\nYour appointment for ${service} on ${date} at ${time} has been confirmed.\n\nThank you for choosing Nail Factory Groningen!`,
        html: `<p>Dear ${name},</p><p>Your appointment for <strong>${service}</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been confirmed.</p><p>Thank you for choosing Nail Factory Groningen!</p>`,
      });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
