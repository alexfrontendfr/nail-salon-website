import React from "react";
import { motion } from "framer-motion";
import { TimeSlot } from "../types";

interface TimeSlotSelectionProps {
  timeSlots: TimeSlot[];
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

const TimeSlotSelection: React.FC<TimeSlotSelectionProps> = ({
  timeSlots,
  onSelectTimeSlot,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {timeSlots.map((slot) => (
        <motion.button
          key={slot.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-md ${
            slot.available
              ? "bg-primary text-white hover:bg-secondary"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => slot.available && onSelectTimeSlot(slot)}
          disabled={!slot.available}
        >
          {slot.start_time} - {slot.end_time}
        </motion.button>
      ))}
    </div>
  );
};

export default TimeSlotSelection;
