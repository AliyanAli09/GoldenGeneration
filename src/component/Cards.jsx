import React, { useRef, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

// Import images
import FootballImg from "../assets/Football.png";
import SwimmingImg from "../assets/Swimming.png";
import TennisImg from "../assets/Tennis.png";
import WalkingImg from "../assets/Walking.png";
import YogaImg from "../assets/Yoga.png";
import GardeningImg from "../assets/Gardening.png";

const imageMap = {
  Football: FootballImg,
  Swimming: SwimmingImg,
  Tennis: TennisImg,
  "Walking in Nature": WalkingImg,
  Yoga: YogaImg,
  Gardening: GardeningImg,
};

const Cards = ({ events = [] }) => {
  const scrollRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);

  // Show arrow only if scrollable
  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setShowArrow(
          scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        );
      }
    };
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [events]);

  // Scroll Right Function
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  // Sort events by ascending date (earliest first)
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="relative bg-[#D3D3D3] mt-4 max-w-screen-lg mx-auto w-full">
      {/* Centered flex container for cards and arrow */}
      <div className="flex items-center justify-center w-full">
        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto hide-scrollbar p-2 w-full"
          style={{ scrollBehavior: "smooth" }}
        >
          {sortedEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden w-60 min-h-[300px] flex-shrink-0"
            >
              <img
                src={event.image || imageMap[event.title]}
                alt={event.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-base font-bold">{event.title}</h3>
              </div>
              <div className="px-4 pb-4 flex justify-between items-center">
                <p className="text-gray-500 font-bold">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Scroll Right Button */}
        {showArrow && (
          <button
            onClick={scrollRight}
            className="ml-2 bg-blue-500 text-white p-2 rounded-full shadow-md"
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
