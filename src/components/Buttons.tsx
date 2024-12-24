'use client'

import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import {redirect } from "next/navigation";

const BackButton = () => {

  return (
        <button className="p-2 rounded bg-[#f5f4f7]" onClick={() =>window.history.back()}>
        <IoArrowBack />
        </button>
  )
}

export default BackButton;

export const ShortArrowBackButton = () => {
  return (
    <button className="p-1 rounded bg-[#f5f4f7]" onClick={() => {redirect('/')}}>
        <IoIosArrowBack size={15} />
        </button>
  )
}

export const ShortArrowForwardButton = () => {
  return (
    <button className="p-1 rounded bg-[#f5f4f7]" onClick={() => {redirect('/')}}>
        <MdArrowForwardIos size={15} />
        </button>
  )
}

