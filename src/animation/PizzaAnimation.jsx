import React from "react";
import { motion } from "framer-motion";
import "./PizzaAnimation.css"; // optional, for container styling

const sliceVariants = [
  { x: "-200%", y: "-200%" }, // slice 1
  { x: "200%", y: "-200%" },  // slice 2
  { x: "300%", y: "0%" },     // slice 3
  { x: "200%", y: "200%" },   // slice 4
  { x: "0%", y: "300%" },     // slice 5
  { x: "-200%", y: "200%" },  // slice 6
  { x: "-300%", y: "0%" },    // slice 7
  { x: "-200%", y: "-200%" }, // slice 8
];

export default function PizzaAnimation() {
  return (
    <div className="pizza-container">
      {[...Array(8)].map((_, i) => (
        <motion.img
          key={i}
          src={`/slices/slice${i + 1}.png`}
          alt={`slice ${i + 1}`}
          initial={sliceVariants[i]}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.2 }}
          className="pizza-slice"
        />
      ))}
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import "./PizzaAnimation.css"; // optional, for container styling

const sliceVariants = [
  { x: "-200%", y: "-200%" }, // slice 1
  { x: "200%", y: "-200%" },  // slice 2
  { x: "300%", y: "0%" },     // slice 3
  { x: "200%", y: "200%" },   // slice 4
  { x: "0%", y: "300%" },     // slice 5
  { x: "-200%", y: "200%" },  // slice 6
  { x: "-300%", y: "0%" },    // slice 7
  { x: "-200%", y: "-200%" }, // slice 8
];

export default function PizzaAnimation() {
  return (
    <div className="pizza-container">
      {[...Array(8)].map((_, i) => (
        <motion.img
          key={i}
          src={`/slices/slice${i + 1}.png`}
          alt={`slice ${i + 1}`}
          initial={sliceVariants[i]}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.2 }}
          className="pizza-slice"
        />
      ))}
    </div>
  );
}
