'use client'

import { MdOutlineDateRange, MdKeyboardArrowDown } from "react-icons/md";
import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const DateBox = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);  // State to control calendar visibility

  // Create a ref for the DatePicker component
  const datePickerRef = useRef<DatePicker | null>(null);

  // Create a ref for the custom input field (to handle focus)
  const inputRef = useRef<HTMLInputElement | null>(null);

  const CustomInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
    <div className="relative w-full">
      {/* Hide the input field completely, no space taken */}
      <input
        ref={ref}
        className="absolute w-0 h-0 p-0 m-0 border-none opacity-0"
        placeholder="Select Date Range"
        style={{ display: 'none' }}
        {...props}
      />
      {/* Arrow icon positioned at the right of the container */}
      <MdKeyboardArrowDown
        onClick={() => {
          // Toggle the open state when the arrow is clicked
          setIsOpen(prev => !prev);
        }}
        className="md:text-white sm:text-black font-bold cursor-pointer"
      />
    </div>
  ));

  const formatDateRange = (start: Date | undefined, end: Date | undefined) => {
    if (start && end) {
      const formattedStart = format(start, "MMM d");
      const formattedEnd = format(end, "MMM d, yyyy");
      return `${formattedStart} - ${formattedEnd}`;
    }
    return "Select Date Range";
  };

  return (
    <div className="flex items-center md:bg-gray-200 rounded-lg p-2 h-10">
      <div className="flex items-center">
        <label className="flex items-center md:text-gray-400 sm:text-black text-sm mb-2">
          <MdOutlineDateRange size={25}/>
          <span className="hidden md:block">Time period:</span>
          <span className="text-white text-sm ms-2 hidden md:block">
            {formatDateRange(startDate, endDate)}
          </span>
        </label>
      </div>
      <div className="ms-5 top-0">
        <DatePicker
          ref={datePickerRef}  // Ref for DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            setStartDate(start ?? undefined);
            setEndDate(end ?? undefined);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          customInput={<CustomInput ref={inputRef} />}  // Ref for custom input
          open={isOpen}  // Manually control calendar visibility
          onClickOutside={() => setIsOpen(false)}  // Close calendar when clicking outside
          popperClassName="datepicker-left-adjust" // Apply the custom CSS class

        />
      </div>
    </div>
  );
};

export default DateBox;
