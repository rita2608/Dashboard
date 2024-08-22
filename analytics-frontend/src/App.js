// import React from 'react';
// import TotalSalesChart from './components/TotalSalesChart';
// import SalesGrowthRateChart from './components/SalesGrowthRateChart';
// import NewCustomersChart from './components/NewCustomersChart';
// import RepeatCustomersChart from './components/RepeatCustomersChart';
// import GeographicalDistributionChart from './components/GeographicalDistributionChart';
// import CustomerLifetimeValueChart from './components/CustomerLifetimeValueChart';

// function App() {
//   return (
//     <div className="App">
//       <h1>Analytics Dashboard</h1>
//       <TotalSalesChart />
//       <SalesGrowthRateChart />
//       <NewCustomersChart />
//       <RepeatCustomersChart />
//       <GeographicalDistributionChart /> 
//       <CustomerLifetimeValueChart /> 
//     </div>
//   );
// }

// export default App;


import React from 'react';
import TotalSalesChart from './components/TotalSalesChart';
import SalesGrowthRateChart from './components/SalesGrowthRateChart';
import NewCustomersChart from './components/NewCustomersChart';
import RepeatCustomersChart from './components/RepeatCustomersChart';
import GeographicalDistributionChart from './components/GeographicalDistributionChart';
import CustomerLifetimeValueChart from './components/CustomerLifetimeValueChart';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="dashboard-title">Analytics Dashboard</h1>
      <div className="dashboard-grid">
        <div className="chart-container">
          <TotalSalesChart />
        </div>
        <div className="chart-container">
          <SalesGrowthRateChart />
        </div>
        <div className="chart-container">
          <NewCustomersChart />
        </div>
        <div className="chart-container">
          <RepeatCustomersChart />
        </div>
        <div className="chart-container">
          <GeographicalDistributionChart />
        </div>
        <div className="chart-container">
          <CustomerLifetimeValueChart />
        </div>
      </div>
    </div>
  );
}

export default App;


