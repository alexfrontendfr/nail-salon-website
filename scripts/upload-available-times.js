const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");

initializeApp();
const db = getFirestore();

async function uploadAvailableTimes() {
  const data = JSON.parse(fs.readFileSync("available-times.json", "utf8"));

  await db.doc("settings/available-times").set(data);

  console.log("Available times uploaded successfully");
}

uploadAvailableTimes().catch(console.error);
