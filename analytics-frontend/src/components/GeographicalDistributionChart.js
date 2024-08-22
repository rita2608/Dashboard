import React, { useEffect, useState } from 'react';
import { Point, Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement,PointElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, PointElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const GeographicalDistributionChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async()=>{
      try {
        const response = await axios.get('https://dashboard-api-three.vercel.app/api/customer-distribution');
        const chartData= response.data;
        setData({
          labels: chartData.map(d => d._id),
          datasets: [
            {
              label: 'Number of Customers',
              data: chartData.map(d => d.count),
              backgroundColor: 'rgba(0, 187, 249,0.2)',
              borderColor: 'rgba(0, 187, 249,1)',
              borderWidth: 1,
            }
          ]
        });
      } catch(err) {
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
      <h2>Geographical Distribution of Customers</h2>
      <Line
      data={data}
      options={{
        plugins:{
          legend:{
            display:true
          },
          tooltip:{
            callbacks:{
              label:(tooltipItem)=>`$${tooltipItem.raw.toFixed(2)}`
            }
          }
        },
        scales:{
          x:{
            title:{
              display:true,
              text:'City'
            }
          },
          y:{
            title:{
              display:true,
              text:'Number Of Customers'
            },
            beginAtZero:true
          }
        }
      }} />
    </div>
  );
};

export default GeographicalDistributionChart;


