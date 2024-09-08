import React, { useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminTimeSlots: NextPage = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (date && startTime && endTime) {
      try {
        const response = await axios.post("/api/admin/add-time-slot", {
          date: date.toISOString().split("T")[0],
          startTime,
          endTime,
        });
        alert(response.data.message);
        setDate(null);
        setStartTime("");
        setEndTime("");
      } catch (error) {
        console.error("Error adding time slot", error);
        alert("Error adding time slot. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
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
    </div>
  );
};

export default AdminTimeSlots;
