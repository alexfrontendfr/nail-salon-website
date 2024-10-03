const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const { addDays, format } = require("date-fns");

const firebaseConfig = {
  apiKey: "replace-with-your-own",
  authDomain: "replace-with-your-own",
  projectId: "replace-with-your-own",
  storageBucket: "replace-with-your-own",
  messagingSenderId: "replace-with-your-own",
  appId: "replace-with-your-own",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
      try {
        await addDoc(collection(db, "time_slots"), {
          date: formattedDate,
          start_time: slot.start_time,
          end_time: slot.end_time,
          available: true,
        });
      } catch (error) {
        console.error(`Error inserting time slot for ${formattedDate}:`, error);
      }
    }
  }

  console.log("Time slots populated successfully");
}

populateTimeSlots();
