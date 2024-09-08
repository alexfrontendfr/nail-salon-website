import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

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
      // Book the appointment
      const { data: appointmentData, error: appointmentError } = await supabase
        .from("appointments")
        .insert({ name, email, phone, service, date, time_slot_id: timeSlotId })
        .select("*, time_slot:time_slots(*)");

      if (appointmentError) throw appointmentError;

      const msg = {
        to: "contactalexfr@gmail.com", // Replace with the salon's email
        from: "contactalexfr@gmail.com", // Replace with your verified sender
        subject: "New Appointment Booked",
        text: `
          New appointment booked:
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Service: ${service}
          Date: ${date}
          Time: ${appointmentData[0].time_slot.start_time} - ${appointmentData[0].time_slot.end_time}
        `,
      };

      await sgMail.send(msg);
      // Update time slot availability
      const { error: timeSlotError } = await supabase
        .from("time_slots")
        .update({ available: false })
        .eq("id", timeSlotId);

      if (timeSlotError) throw timeSlotError;

      res.status(201).json({
        message: "Appointment booked successfully",
        data: appointmentData,
      });
    } catch (error: unknown) {
      console.error("Error booking appointment:", error);
      res.status(500).json({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
