// utils/timeSlots.ts
import { addMinutes, format, parse, isAfter, isBefore } from "date-fns";

export interface TimeSlot {
  start: string;
  end: string;
}

interface BusinessHours {
  start: string;
  end: string;
}

let businessHours: BusinessHours = {
  start: "10:00",
  end: "18:00",
};

let slotDuration = 30; // in minutes

export function setBusinessHours(start: string, end: string) {
  businessHours = { start, end };
}

export function setSlotDuration(duration: number) {
  slotDuration = duration;
}

export function generateTimeSlots(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  let currentTime = parse(businessHours.start, "HH:mm", date);
  const endTime = parse(businessHours.end, "HH:mm", date);

  while (isBefore(currentTime, endTime)) {
    const slotEnd = addMinutes(currentTime, slotDuration);
    slots.push({
      start: format(currentTime, "HH:mm"),
      end: format(slotEnd, "HH:mm"),
    });
    currentTime = slotEnd;
  }

  return slots;
}

export function isSlotAvailable(
  slot: TimeSlot,
  bookedSlots: TimeSlot[]
): boolean {
  return !bookedSlots.some(
    (bookedSlot) =>
      (isAfter(
        parse(slot.start, "HH:mm", new Date()),
        parse(bookedSlot.start, "HH:mm", new Date())
      ) &&
        isBefore(
          parse(slot.start, "HH:mm", new Date()),
          parse(bookedSlot.end, "HH:mm", new Date())
        )) ||
      (isAfter(
        parse(slot.end, "HH:mm", new Date()),
        parse(bookedSlot.start, "HH:mm", new Date())
      ) &&
        isBefore(
          parse(slot.end, "HH:mm", new Date()),
          parse(bookedSlot.end, "HH:mm", new Date())
        ))
  );
}
