'use client'

import { MdAddToPhotos, MdBarChart } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import BarChartPlot from "@/components/Charts/BarChartPlot";
import Card from "@/components/Card";
import PieChartPlot from "@/components/Charts/pieChart/PieChartPlot";
import LineChartPlot from "@/components/Charts/LineChartPlot";
import { cardData, barCharthData } from "@/utils/data";
import { iconsCollection } from "@/utils/icons";
import { useState } from "react";
import Map from "@/components/Map"

const AdminDashboard = () => {
  const [barChart, setBarChart] = useState(true);
  
  return (
    <div className="p-4 space-y-6">
      {/* Page Title */}
      <header>
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </header>

      {/* Cards Section */}
      <section className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cardData.map((card) => (
          <Card key={card.id} {...card} />
        ))}

        {/* Add Data Card */}
        <div className="border border-dashed rounded-lg flex flex-col items-center justify-center p-4">
          <MdAddToPhotos size={25} className="text-gray-500" />
          <p className="text-sm">Add data</p>
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
        <div className="flex-1 bg-white border rounded-lg p-4">
          <h1 className="text-xl font-bold mb-4">Orders By Product Category</h1>
          <PieChartPlot />
        </div>

        {/* Map */}
        <div className=" h-[300px] bg-white border rounded-lg">
          <Map />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
