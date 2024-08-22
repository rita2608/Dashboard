const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

// Total Sales Over Time
router.get('/total-sales', controllers.getTotalSalesOverTime);

// Sales Growth Rate Over Time
router.get('/sales-growth', controllers.getSalesGrowthRateOverTime);

// New Customers Added Over Time
router.get('/new-customers', controllers.getNewCustomersAddedOverTime);

// Number of Repeat Customers
router.get('/repeat-customers', controllers.getNumberOfRepeatCustomers);

// Geographical Distribution of Customers
router.get('/customer-distribution', controllers.getGeographicalDistributionOfCustomers);

// Customer Lifetime Value by Cohorts
router.get('/customer-lifetime-value', controllers.getCustomerLifetimeValueByCohorts);

module.exports = router;
