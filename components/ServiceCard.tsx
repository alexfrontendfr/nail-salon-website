import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Service } from "../types";

interface ServiceCardProps extends Service {
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  duration,
  image,
  price,
  description,
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">€{price}</span>
          <span className="text-gray-500">{duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
