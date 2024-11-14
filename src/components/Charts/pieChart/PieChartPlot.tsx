// components/PieChart.tsx
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import styles from './PieChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartPlot = () => {
  const data = {
    labels: ['Living room', 'Kids', 'Office', 'Bedroom', 'Kitchen', 'Bathroom', 'Dining room', 'Decor', 'Lighting', 'Outdoor'],
    datasets: [
      {
        data: [25, 17, 13, 12, 9, 8, 6, 5, 3, 2],
        backgroundColor: [
          '#36A2EB', '#FF6384', '#FFCE56', '#E7E9ED', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#4BC0C0', '#FFCE56'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 6,
      },
    ],
  };

  const options: Partial<ChartOptions<'doughnut'>> = {
    plugins: {
      legend: {
        position: 'left',
        labels: {
          boxWidth: 15,
          padding: 20,
          color: '#3b3b3b',
          font: {
            size: 12,
          },
          
        },
        
      },
    },
    cutout: '60%',
    maintainAspectRatio: false, // This helps with responsive sizing
    responsive: true
  };
  

  return (
    <div className={styles.chartContainer}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieChartPlot;
