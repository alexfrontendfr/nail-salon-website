import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { date, startTime, endTime } = req.body;

    try {
      const { data, error } = await supabase.from("time_slots").insert({
        date,
        start_time: startTime,
        end_time: endTime,
        available: true,
      });

      if (error) throw error;

      res.status(200).json({ message: "Time slot added successfully", data });
    } catch (error: unknown) {
      console.error("Error adding time slot:", error);
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
