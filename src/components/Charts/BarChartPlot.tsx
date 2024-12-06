import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  labels: string[];
  data1: number[];
  data2: number[];
}

const BarChartPlot: React.FC<BarChartProps> = ({ labels, data1, data2 }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Gross Margin',
        data: data1,
        backgroundColor: '#4A90E2',
        borderRadius: 5,
      },
      {
        label: 'Revenue',
        data: data2,
        backgroundColor: '#F5A623',
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#333', 
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#aaa', // Light gray for x-axis labels
        },
      },
      y: {
        grid: {
          color: '#444', // Dark gray grid lines for y-axis
        },
        ticks: {
          color: '#aaa', // Light gray for y-axis labels
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChartPlot;
