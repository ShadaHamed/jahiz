'use client'

import { IoArrowBack } from "react-icons/io5";
import {redirect } from "next/navigation";

const BackButton = () => {
  return (
        <button className="p-2 rounded bg-[#f5f4f7]" onClick={() => {redirect('/')}}>
        <IoArrowBack />
        </button>
  )
}

export default BackButton