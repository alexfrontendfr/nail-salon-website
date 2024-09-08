// components/BookingSteps.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { services } from "../data/services";
import TimeSlotSelection from "./TimeSlotSelection";
import axios from "axios";
import { Service, TimeSlot } from "../types";

const steps = [
  "Select Service",
  "Choose Date & Time",
  "Your Details",
  "Confirmation",
];

const BookingSteps: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  const handleServiceSelection = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(1);
  };

  const handleDateSelection = async (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      try {
        const response = await axios.get<TimeSlot[]>(
          `/api/timeSlots?date=${date.toISOString().split("T")[0]}`
        );
        setAvailableTimeSlots(response.data);
      } catch (error) {
        console.error("Error fetching time slots", error);
        // You might want to show an error message to the user here
      }
    }
  };

  const handleTimeSlotSelection = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setCurrentStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTimeSlot) {
      console.error("Missing required booking information");
      return;
    }
    try {
      const response = await axios.post("/api/bookAppointment", {
        ...bookingDetails,
        service: selectedService.name,
        date: selectedDate.toISOString().split("T")[0],
        timeSlotId: selectedTimeSlot.id,
      });
      if (response.data.message === "Appointment booked successfully") {
        setCurrentStep(3);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: unknown) {
      console.error("Error booking appointment", error);
      alert(
        `Error booking appointment: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-serif font-bold text-center mb-8 text-primary">
        Book Your Appointment
      </h2>
      <div className="flex flex-wrap justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step} className="relative w-full sm:w-auto mb-4 sm:mb-0">
            <span
              className={`font-medium ${
                index <= currentStep ? "text-primary" : "text-gray-400"
              }`}
            >
              {step}
            </span>
            {index <= currentStep && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        ))}
      </div>
      {currentStep === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service) => (
            <button
              key={service.name}
              onClick={() => handleServiceSelection(service)}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-serif text-lg font-bold mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">€{service.price}</span>
                <span className="text-gray-500">{service.duration}</span>
              </div>
            </button>
          ))}
        </motion.div>
      )}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <DatePicker
            selected={selectedDate}
            onChange={handleDateSelection}
            inline
            minDate={new Date()}
            className="mx-auto"
          />
          {selectedDate && (
            <TimeSlotSelection
              timeSlots={availableTimeSlots}
              onSelectTimeSlot={handleTimeSlotSelection}
            />
          )}
        </motion.div>
      )}
      {currentStep === 2 && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={bookingDetails.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={bookingDetails.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={bookingDetails.phone}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary transition-colors"
          >
            Book Appointment
          </button>
        </motion.form>
      )}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-serif font-bold mb-4">
            Booking Confirmed!
          </h3>
          <p>Thank you for booking with Nail Factory Groningen.</p>
          <p>
            We&apos;ll see you on {selectedDate?.toDateString()} at{" "}
            {selectedTimeSlot?.start_time} for your {selectedService?.name}{" "}
            appointment.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BookingSteps;
