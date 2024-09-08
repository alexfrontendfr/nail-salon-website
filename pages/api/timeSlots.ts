import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { date } = req.query;

    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "Date is required" });
    }

    try {
      const { data, error } = await supabase
        .from("time_slots")
        .select("*")
        .eq("date", date)
        .order("start_time", { ascending: true });

      if (error) throw error;

      return res.status(200).json(data || []);
    } catch (error: unknown) {
      console.error("Error fetching time slots:", error);
      return res
        .status(500)
        .json({
          error:
            error instanceof Error
              ? error.message
              : "Error fetching time slots",
        });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
