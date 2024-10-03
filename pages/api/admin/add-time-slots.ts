import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { date, startTime, endTime } = req.body;

    try {
      const docRef = await addDoc(collection(db, "time_slots"), {
        date,
        start_time: startTime,
        end_time: endTime,
        available: true,
      });

      res
        .status(200)
        .json({ message: "Time slot added successfully", id: docRef.id });
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
