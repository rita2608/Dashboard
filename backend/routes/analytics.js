const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Total Sales Over Time
router.get('/sales-over-time', async (req, res) => {
    try {
        const result = await mongoose.connection.db.collection('shopifyOrders').aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$created_at" } // Change to %Y-%m, %Y for monthly, yearly
                    },
                    totalSales: { $sum: "$total_price_set.amount" }
                }
            }
        ]).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sales Growth Rate Over Time
router.get('/sales-growth-rate', async (req, res) => {
    try {
        // Implement logic here
        res.json([]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// New Customers Added Over Time
router.get('/new-customers', async (req, res) => {
    try {
        const result = await mongoose.connection.db.collection('shopifyCustomers').aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$created_at" }
                    },
                    newCustomers: { $sum: 1 }
                }
            }
        ]).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Number of Repeat Customers
router.get('/repeat-customers', async (req, res) => {
    try {
        const result = await mongoose.connection.db.collection('shopifyOrders').aggregate([
            {
                $group: {
                    _id: "$customer_id",
                    orderCount: { $sum: 1 }
                }
            },
            {
                $match: { orderCount: { $gt: 1 } }
            }
        ]).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Geographical Distribution of Customers
router.get('/customer-geography', async (req, res) => {
    try {
        const result = await mongoose.connection.db.collection('shopifyCustomers').aggregate([
            {
                $group: {
                    _id: "$default_address.city",
                    count: { $sum: 1 }
                }
            }
        ]).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Customer Lifetime Value by Cohorts
router.get('/customer-lifetime-value', async (req, res) => {
    try {
        const result = await mongoose.connection.db.collection('shopifyOrders').aggregate([
            {
              "$project": {
                "created_at": {
                  "$dateFromString": {
                    "dateString": "$created_at"
                  }
                }
              }
            },
            {
              "$group": {
                "_id": {
                  "year": { "$year": "$created_at" },
                  "month": { "$month": "$created_at" }
                },
                "total_sales": { "$sum": "$total_line_items_price" }
              }
            }
          ]
          ).toArray();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
