import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const SalesGrowthRateChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dashboard-api-three.vercel.app/api/sales-growth');
        const chartData = response.data[0];

        if (chartData && chartData.dates.length > 0) {
          setData({
            labels: chartData.dates.map(d => `${d.year}-${String(d.month).padStart(2, '0')}`),
            datasets: [
              {
                label: 'Sales Growth Rate',
                data: chartData.growthRate,
                borderColor: 'rgba(241, 91, 181,1)',
                backgroundColor: 'rgba(241,91,181,0.2)',
                fill: false,
                borderWidth:1,
              }
            ]
          });
        } else {
          setData({
            labels: [],
            datasets: []
          });
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Sales Growth Rate Over Time</h2>
      <Line data={data} options={{
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Growth Rate'
            },
            beginAtZero: true
          }
        }
      }} />
    </div>
  );
};

export default SalesGrowthRateChart;

