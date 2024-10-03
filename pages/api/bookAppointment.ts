import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utils/firebase";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, phone, service, date, timeSlotId } = req.body;

    if (!name || !email || !phone || !service || !date || !timeSlotId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Check if the time slot is still available
      const timeSlotRef = doc(db, "time_slots", timeSlotId);
      const timeSlotSnap = await getDoc(timeSlotRef);

      if (!timeSlotSnap.exists() || !timeSlotSnap.data().available) {
        return res
          .status(400)
          .json({ error: "Time slot is no longer available" });
      }

      // Book the appointment
      const appointmentRef = await addDoc(collection(db, "appointments"), {
        name,
        email,
        phone,
        service,
        date,
        time_slot_id: timeSlotId,
      });

      // Update time slot availability
      await updateDoc(timeSlotRef, {
        available: false,
      });

      // Send confirmation email
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: '"Nail Factory Groningen" <noreply@nailfactorygroningen.com>',
        to: email,
        subject: "Booking Confirmation",
        text: `Dear ${name},\n\nYour appointment for ${service} on ${date} has been confirmed.\n\nThank you for choosing Nail Factory Groningen!`,
        html: `<p>Dear ${name},</p><p>Your appointment for <strong>${service}</strong> on <strong>${date}</strong> has been confirmed.</p><p>Thank you for choosing Nail Factory Groningen!</p>`,
      });

      res.status(201).json({
        message: "Appointment booked successfully",
        data: { id: appointmentRef.id },
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      res.status(500).json({
        error: "An error occurred while booking the appointment",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
