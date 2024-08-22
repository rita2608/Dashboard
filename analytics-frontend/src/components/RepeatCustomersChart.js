import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const RepeatCustomersChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dashboard-api-three.vercel.app/api/repeat-customers');
        const chartData = response.data;

        if (chartData.length > 0) {
          setData({
            labels: chartData.map(d => `${d._id.year}-${d._id.month}`),
            datasets: [
              {
                label: 'Repeat Customers',
                data: chartData.map(d => d.repeatCustomers),
                backgroundColor: 'rgba(96, 150, 186,0.5)',
                borderColor: 'rgba(96, 150, 186,1)',
                borderWidth: 1,
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
      <h2>Repeat Customers Over Time</h2>
      <Bar data={data} options={{
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
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
              text: 'Number of Repeat Customers'
            },
            beginAtZero: true
          }
        }
      }} />
    </div>
  );
};

export default RepeatCustomersChart;
