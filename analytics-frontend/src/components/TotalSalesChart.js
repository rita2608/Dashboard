import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TotalSalesChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/total-sales');
        const chartData = response.data;

        setData({
          labels: chartData.map(d => `${d._id.year}-${d._id.month}`),
          datasets: [
            {
              label: 'Total Sales',
              data: chartData.map(d => d.totalSales),
              backgroundColor: 'rgba(155, 93, 229,0.2)',
              borderColor: 'rgba(155, 93, 229,1)',
              // borderColor: rgba(75, 192, 192,1),
              borderWidth: 1,
            }
          ]
        });
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
      <h2>Total Sales Over Time</h2>
      <Bar
        data={data}
        options={{
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`
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
                text: 'Total Sales'
              },
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};

export default TotalSalesChart;
