import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Service, TimeSlot } from "../types";
import axios from "axios";
import {
  format,
  addMinutes,
  parse,
  isBefore,
  differenceInMinutes,
} from "date-fns";
import { services } from "../data/services";
import Loading from "./Loading";

const DatePicker = dynamic(
  () =>
    import("react-datepicker").then((mod) => mod.default) as Promise<
      React.ComponentType<any>
    >,
  { ssr: false }
);

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  const fetchAvailableTimeSlots = useCallback(async () => {
    if (!selectedDate || !selectedService) return;

    setIsLoading(true);
    const q = query(
      collection(db, "time_slots"),
      where("date", "==", format(selectedDate, "yyyy-MM-dd")),
      where("available", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const slots: TimeSlot[] = [];
    querySnapshot.forEach((doc) => {
      const slot = { id: doc.id, ...doc.data() } as TimeSlot;
      const slotDuration = getSlotDuration(slot.start_time, slot.end_time);
      if (slotDuration >= parseInt(selectedService.duration)) {
        slots.push(slot);
      }
    });
    setAvailableTimeSlots(slots);
    setIsLoading(false);
  }, [selectedDate, selectedService]);

  useEffect(() => {
    if (selectedDate && selectedService) {
      fetchAvailableTimeSlots();
    }
  }, [selectedDate, selectedService, fetchAvailableTimeSlots]);

  const getSlotDuration = (start: string, end: string) => {
    const startTime = parse(start, "HH:mm", new Date());
    const endTime = parse(end, "HH:mm", new Date());
    return differenceInMinutes(endTime, startTime);
  };

  const handleServiceSelection = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(1);
  };

  const handleDateSelection = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelection = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setCurrentStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!bookingDetails.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(bookingDetails.email))
      newErrors.email = "Invalid email address";
    if (!/^\d{10}$/.test(bookingDetails.phone))
      newErrors.phone = "Invalid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
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

      if (response.status === 201) {
        setCurrentStep(3);
      } else {
        throw new Error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error booking appointment", error);
      alert(
        `Error booking appointment: ${
          error instanceof Error ? error.message : "Unknown error"
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
          {services.map((service: Service) => (
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
          {isLoading ? (
            <Loading />
          ) : (
            selectedDate && (
              <div className="grid grid-cols-3 gap-4">
                {availableTimeSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-md bg-primary text-white hover:bg-secondary"
                    onClick={() => handleTimeSlotSelection(slot)}
                  >
                    {format(
                      parse(slot.start_time, "HH:mm", new Date()),
                      "h:mm a"
                    )}{" "}
                    -{" "}
                    {format(
                      parse(slot.end_time, "HH:mm", new Date()),
                      "h:mm a"
                    )}
                  </motion.button>
                ))}
              </div>
            )
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
            className={`w-full p-2 border rounded-md ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={bookingDetails.email}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={bookingDetails.phone}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border rounded-md ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
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
            We will see you on {selectedDate?.toDateString()} at{" "}
            {selectedTimeSlot?.start_time} for your {selectedService?.name}{" "}
            appointment.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BookingSteps;
