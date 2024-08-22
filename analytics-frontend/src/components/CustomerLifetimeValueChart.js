import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const CustomerLifetimeValueChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('http://localhost:3000/api/customer-lifetime-value')
      .then(response => {
        const chartData = response.data;
            console.log('Chart data:', chartData);
        
          
        setData({
          labels: chartData.map(d => `${d._id.year}-${d._id.month}`),
          datasets: [
            {
              label: 'Customer Lifetime Value',
              data: chartData.map(d => d.customerLifetimeValue),
              borderColor: 'rgba(0, 245, 212,1)',
              backgroundColor: 'rgba(0, 245, 212,0.2)',
              borderWidth:1,
              
            }
          ]
        });
      });
  }, []);

  return (
    <div>
      <h2>Customer Lifetime Value by Cohorts</h2>
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
              text:'Time'
            }
          },
          y:{
            title:{
              display:true,
              text:'Customer Lifetime Value'
            },
            
          }

        }
      }} />
    </div>
  );
};

export default CustomerLifetimeValueChart;
