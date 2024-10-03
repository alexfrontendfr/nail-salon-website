const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const { addDays, format } = require("date-fns");

const firebaseConfig = {
  apiKey: "AIzaSyBE0VVv6fFQfQRaHN2TOqSqquEbyxsonNE",
  authDomain: "nail-salon-website-40049.firebaseapp.com",
  projectId: "nail-salon-website-40049",
  storageBucket: "nail-salon-website-40049.appspot.com",
  messagingSenderId: "360712691544",
  appId: "1:360712691544:web:7826caf2529996a50f4f2d",
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
