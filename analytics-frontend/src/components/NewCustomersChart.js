import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const NewCustomersChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/new-customers');
        const chartData = response.data;

        if (chartData.length > 0) {
          setData({
            labels: chartData.map(d => `${d._id.year}-${d._id.month}`),
            datasets: [
              {
                label: 'New Customers',
                data: chartData.map(d => d.newCustomers),
                backgroundColor: 'rgba(254, 228, 64,0.5)',
                borderColor: 'rgba(254, 228, 64,1)',
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
      <h2>New Customers Over Time</h2>
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
              text: 'Number of New Customers'
            },
            beginAtZero: true
          }
        }
      }} />
    </div>
  );
};

export default NewCustomersChart;
