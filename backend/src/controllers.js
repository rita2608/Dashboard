const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Mongoose Schemas
const orderSchema = new Schema({
  created_at: Date,
  total_price: String
});
const customerSchema = new Schema({
  created_at: Date,
  default_address: {
    city: String
  }
});

const Order = mongoose.model('Order', orderSchema, 'shopifyOrders');
const Customer = mongoose.model('Customer', customerSchema, 'shopifyCustomers');

// Total Sales Over Time
exports.getTotalSalesOverTime = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $addFields: {
          createdAtDate: {
            $dateFromString: { dateString: "$created_at" }
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAtDate" },
            month: { $month: "$createdAtDate" }
          },
          totalSales: { $sum: { $toDouble: "$total_price" } }
        }
      }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sales Growth Rate Over Time
exports.getSalesGrowthRateOverTime = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $addFields: {
          createdAtDate: {
            $dateFromString: { dateString: "$created_at" }
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAtDate" },
            month: { $month: "$createdAtDate" }
          },
          totalSales: { $sum: { $toDouble: "$total_price" } }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      },
      {
        $group: {
          _id: null,
          sales: { $push: "$totalSales" },
          dates: { $push: { year: "$_id.year", month: "$_id.month" } }
        }
      },
      {
        $project: {
          growthRate: {
            $map: {
              input: { $range: [1, { $size: "$sales" }] },
              as: "i",
              in: {
                $subtract: [
                  { $arrayElemAt: ["$sales", "$$i"] },
                  { $arrayElemAt: ["$sales", { $subtract: ["$$i", 1] }] }
                ]
              }
            }
          },
          dates: 1
        }
      }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// New Customers Added Over Time
exports.getNewCustomersAddedOverTime = async (req, res) => {
  try {
    const data = await Customer.aggregate([
      {
        $addFields: {
          createdAtDate: {
            $dateFromString: { dateString: "$created_at" }
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAtDate" },
            month: { $month: "$createdAtDate" }
          },
          newCustomers: { $sum: 1 }
        }
      }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Number of Repeat Customers
exports.getNumberOfRepeatCustomers = async (req, res) => {
    try {
      const data = await Order.aggregate([
        {
          $addFields: {
            createdAtDate: {
              $dateFromString: { dateString: "$created_at" }
            }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAtDate" },
              month: { $month: "$createdAtDate" },
              customerId: "$customer.id"
            },
            orderCount: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: {
              year: "$_id.year",
              month: "$_id.month"
            },
            repeatCustomers: {
              $sum: {
                $cond: [{ $gt: ["$orderCount", 1] }, 1, 0]
              }
            }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 } // Optional: Sort by year and month
        }
      ]);
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Geographical Distribution of Customers
exports.getGeographicalDistributionOfCustomers = async (req, res) => {
  try {
    const data = await Customer.aggregate([
      {
        $group: {
          _id: "$default_address.city",
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Customer Lifetime Value by Cohorts
exports.getCustomerLifetimeValueByCohorts = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $addFields: {
          createdAtDate: {
            $dateFromString: { dateString: "$created_at" }
          },
          customerId: "$customer.id"
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAtDate" },
            month: { $month: "$createdAtDate" },
            customerId: "$customerId"
          },
          totalSpent: { $sum: { $toDouble: "$total_price" } }
        }
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month"
          },
          customerLifetimeValue: {
            $avg: "$totalSpent"
          }
        }
      }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
