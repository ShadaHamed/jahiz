// components/LineChartPlot.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

interface BarChartProps {
  labels: string[];
  data1: number[];
  data2: number[];
}

const LineChartPlot: React.FC<BarChartProps>= ({ labels, data1, data2 }) => {
  const data = {
    labels: labels,
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
        position: 'top'  as const,
        labels: {
          color: '#333', 
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
        text: 'Monthly Sales Data',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Sales',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[400px] bg-white border rounded-lg p-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartPlot;
