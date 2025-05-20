import React from "react";
import { FaSearch } from "react-icons/fa";
import profile from "../assets/profile.jpeg";
import IconNav from "./IconNav"; // Importing icon navigation

const Header = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full p-4 border-b bg-[#D3D3D3] shadow-md">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-orange-500 leading-tight">
            Golden<br />Generation
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center border px-3 py-1 rounded-md bg-gray-100 w-full max-w-md">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search Events"
              className="border-none outline-none text-sm ml-2 bg-gray-100 w-full"
            />
            <span className="ml-2 text-gray-600 text-sm">Search</span>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-4 ml-6">
          <img src={profile} alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Icons + Selected Box */}
      <IconNav onSelect={() => {}} onCalendarClick={() => {}} onCreateClick={() => {}} />
    </div>
  );
};

export default Header;
