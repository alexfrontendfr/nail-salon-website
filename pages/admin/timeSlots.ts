import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utils/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const adminCode = process.env.NEXT_PUBLIC_ADMIN_CODE;

const isAdminAuthenticated = (req: NextApiRequest): boolean => {
  return req.headers.authorization === `Bearer ${adminCode}`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { date } = req.query;
        if (typeof date !== "string") {
          return res.status(400).json({ error: "Invalid date parameter" });
        }
        const q = query(
          collection(db, "time_slots"),
          where("date", "==", date)
        );
        const querySnapshot = await getDocs(q);
        const timeSlots: any[] = [];
        querySnapshot.forEach((doc) => {
          timeSlots.push({ id: doc.id, ...doc.data() });
        });
        return res.status(200).json(timeSlots);
      } catch (error) {
        console.error("Error fetching time slots:", error);
        return res.status(500).json({ error: "Error fetching time slots" });
      }

    case "POST":
      try {
        const { date, startTime, endTime } = req.body;
        const docRef = await addDoc(collection(db, "time_slots"), {
          date,
          start_time: startTime,
          end_time: endTime,
          available: true,
        });
        return res
          .status(201)
          .json({ id: docRef.id, message: "Time slot added successfully" });
      } catch (error) {
        console.error("Error adding time slot:", error);
        return res.status(500).json({ error: "Error adding time slot" });
      }

    case "PUT":
      try {
        const { id, ...updateData } = req.body;
        await updateDoc(doc(db, "time_slots", id), updateData);
        return res
          .status(200)
          .json({ message: "Time slot updated successfully" });
      } catch (error) {
        console.error("Error updating time slot:", error);
        return res.status(500).json({ error: "Error updating time slot" });
      }

    case "DELETE":
      try {
        const { id } = req.query;
        if (typeof id !== "string") {
          return res.status(400).json({ error: "Invalid id parameter" });
        }
        await deleteDoc(doc(db, "time_slots", id));
        return res
          .status(200)
          .json({ message: "Time slot deleted successfully" });
      } catch (error) {
        console.error("Error deleting time slot:", error);
        return res.status(500).json({ error: "Error deleting time slot" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
