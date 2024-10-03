import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { motion } from "framer-motion";
import { isAdminAuthenticated } from "../../utils/adminAuth";
import withAdminAuth from "../../components/withAdminAuth";

interface TimeSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  available: boolean;
}

const AdminTimeSlots: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [existingSlots, setExistingSlots] = useState<TimeSlot[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (!isAdminAuthenticated()) {
      router.push("/admin");
    }
  }, [router]);

  const fetchExistingSlots = useCallback(async () => {
    if (!date) return;
    try {
      const response = await axios.get("/api/admin/timeSlots", {
        params: { date: date.toISOString().split("T")[0] },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_CODE}`,
        },
      });
      setExistingSlots(response.data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (date && startTime && endTime) {
      try {
        await axios.post(
          "/api/admin/timeSlots",
          {
            date: date.toISOString().split("T")[0],
            startTime,
            endTime,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_CODE}`,
            },
          }
        );
        alert("Time slot added successfully");
        setStartTime("");
        setEndTime("");
        fetchExistingSlots();
      } catch (error) {
        console.error("Error adding time slot", error);
        alert("Error adding time slot. Please try again.");
      }
    }
  };

  const handleDelete = async (slotId: string) => {
    try {
      await axios.delete(`/api/admin/timeSlots?id=${slotId}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_CODE}`,
        },
      });
      alert("Time slot deleted successfully");
      fetchExistingSlots();
    } catch (error) {
      console.error("Error deleting time slot", error);
      alert("Error deleting time slot. Please try again.");
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Add Time Slot
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <DatePicker
            selected={date}
            onChange={(date: Date | null) => setDate(date)}
            className="w-full p-2 border rounded focus:ring focus:ring-primary"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded focus:ring focus:ring-primary"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded focus:ring focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary transition-colors"
        >
          Add Time Slot
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Existing Time Slots</h2>
        {existingSlots.length > 0 ? (
          <ul className="space-y-2">
            {existingSlots.map((slot) => (
              <li
                key={slot.id}
                className="bg-gray-100 p-2 rounded flex justify-between items-center"
              >
                <span>
                  {slot.start_time} - {slot.end_time} (
                  {slot.available ? "Available" : "Booked"})
                </span>
                <button
                  onClick={() => handleDelete(slot.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No time slots for this date.</p>
        )}
      </div>
    </motion.div>
  );
};

export default withAdminAuth(AdminTimeSlots);
