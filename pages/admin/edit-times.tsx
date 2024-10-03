import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { motion } from "framer-motion";
import { isAdminAuthenticated } from "../../utils/adminAuth";
import { useRouter } from "next/router";

const EditTimes: React.FC = () => {
  const [jsonData, setJsonData] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin");
    } else {
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const docRef = doc(db, "settings", "available-times");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setJsonData(JSON.stringify(docSnap.data(), null, 2));
      } else {
        setJsonData(
          JSON.stringify(
            {
              weekdays: {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
              },
              exceptions: [],
            },
            null,
            2
          )
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error fetching data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = JSON.parse(jsonData);
      await setDoc(doc(db, "settings", "available-times"), data);
      setMessage("Available times updated successfully");
    } catch (error) {
      console.error("Error updating available times:", error);
      setMessage(
        "Error updating available times. Please check your JSON format and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-4xl"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Edit Available Times
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="jsonData" className="block mb-2 font-medium">
            Available Times JSON
          </label>
          <textarea
            id="jsonData"
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            className="w-full h-96 p-2 border rounded focus:ring focus:ring-primary font-mono text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-2 px-4 rounded hover:bg-secondary transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Available Times"}
        </button>
      </form>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 p-2 rounded ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default EditTimes;
