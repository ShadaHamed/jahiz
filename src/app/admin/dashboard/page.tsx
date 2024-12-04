'use client'

import { MdAddToPhotos, MdBarChart} from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import BarChartPlot from "@/components/Charts/BarChartPlot";
import Card from "@/components/Card";
import PieChartPlot from "@/components/Charts/pieChart/PieChartPlot";
import LineChartPlot from "@/components/Charts/LineChartPlot";
import { cardData, barCharthData } from "@/utils/data";
import { useState } from "react";
import dynamic from "next/dynamic";
import DateBox from "@/components/DateBox";
// import Map from "@/components/Map"
const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });

const AdminDashboard = () => {
  const [barChart, setBarChart] = useState(true);

  return (
    <div className="container p-6 space-y-6 ">
      {/* Page Title */}
      <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 font-bold text-2xl mx-auto  md:left-auto md:transform-none ">
          Dashboard
      </h2>
      {/* <div className="relative w-96 items-center justify-center md:justify-start"> */}
        <div className="flex justify-end ">
          <DateBox />
        </div>
     

      {/* Cards Section */}
      <section className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center">
        {cardData.map((card) => (
          <Card key={card.id} {...card} />
        ))}

        {/* Add Data Card */}
       <div className="col-span-full md:col-span-1">
       <div className="md:border md:border-dashed rounded-lg flex flex-col items-center justify-center p-4 bg-gray-100 md:bg-white">
          <MdAddToPhotos size={25} className="text-gray-500" />
          <p className="text-sm">Add data</p>
        </div>
       </div>
      </section>

      {/* Bar Chart & Line Chart Toggle Section */}
      <section className="bg-white p-4 border rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Product Sales</h1>
          <div className="space-x-2">
            <button
              onClick={() => setBarChart(false)}
              className={`p-1 border rounded-sm ${!barChart ? "bg-green-200" : ""}`}
            >
              <FaChartLine size={25} className="text-gray-800" />
            </button>
            <button
              onClick={() => setBarChart(true)}
              className={`p-1 border rounded-sm ${barChart ? "bg-green-200" : ""}`}
            >
              <MdBarChart size={25} className="text-gray-800" />
            </button>
          </div>
        </div>
        <div className="h-[300px] md:h-[400px]">
          {barChart ? (
            <BarChartPlot labels={barCharthData.barLabels} data1={barCharthData.barData1} data2={barCharthData.barData2} />
          ) : (
            <LineChartPlot labels={barCharthData.barLabels} data1={barCharthData.barData1} data2={barCharthData.barData2} />
          )}
        </div>
      </section>

      {/* Pie Chart & Map Section */}
      <section className="flex flex-col md:flex-row gap-4">
        {/* Pie Chart */}
        <div className="container flex-1 w-full md:w-1/2 bg-white border rounded-lg p-4">
          <h1 className="text-xl font-bold mb-4">Orders By Product Category</h1>
          <PieChartPlot />
        </div>

        {/* Map */}
        <div className=" h-[300px] md:w-1/2 bg-white border rounded-lg">
          <Map key={new Date().getTime()}/>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
