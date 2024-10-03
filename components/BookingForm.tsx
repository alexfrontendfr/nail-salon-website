import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { services } from "../data/services";
import { Service } from "../types";
import axios from "axios";

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    instagram_handle: "",
    phone_number: "",
    service: "",
    additional_notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/bookAppointment", formData);
      if (response.status === 201) {
        setMessage(
          "Booking successful! We'll contact you to confirm the details."
        );
        setFormData({
          full_name: "",
          instagram_handle: "",
          phone_number: "",
          service: "",
          additional_notes: "",
        });
      } else {
        throw new Error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage("Error booking appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-serif text-primary mb-6">
        Book Your Appointment
      </h2>

      <div className="mb-4">
        <label
          htmlFor="full_name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="instagram_handle"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Instagram Handle
        </label>
        <input
          type="text"
          id="instagram_handle"
          name="instagram_handle"
          value={formData.instagram_handle}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="service"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Service
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a service</option>
          {services.map((service: Service) => (
            <option key={service.name} value={service.name}>
              {service.name} ({service.duration})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="additional_notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Additional Notes
        </label>
        <textarea
          id="additional_notes"
          name="additional_notes"
          value={formData.additional_notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>

      <Button type="submit" variant="primary">
        {isLoading ? "Booking..." : "Book Now"}
      </Button>

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
    </motion.form>
  );
};

export default BookingForm;
