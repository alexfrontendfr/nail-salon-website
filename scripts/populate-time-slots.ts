import { createClient } from "@supabase/supabase-js";
import { addDays, format } from "date-fns";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function populateTimeSlots() {
  const startDate = new Date();
  const endDate = addDays(startDate, 30);

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const formattedDate = format(date, "yyyy-MM-dd");
    const timeSlots = [
      { start_time: "09:00", end_time: "10:00" },
      { start_time: "10:00", end_time: "11:00" },
      { start_time: "11:00", end_time: "12:00" },
      { start_time: "13:00", end_time: "14:00" },
      { start_time: "14:00", end_time: "15:00" },
      { start_time: "15:00", end_time: "16:00" },
    ];

    for (const slot of timeSlots) {
      const { error } = await supabase.from("time_slots").insert({
        date: formattedDate,
        start_time: slot.start_time,
        end_time: slot.end_time,
        available: true,
      });

      if (error) {
        console.error(`Error inserting time slot for ${formattedDate}:`, error);
      }
    }
  }

  console.log("Time slots populated successfully");
}

populateTimeSlots();
