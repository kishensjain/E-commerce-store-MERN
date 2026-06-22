import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAdminStats = async (req, res) => {
  try {
    const [totalOrders, totalProducts, totalUsers, revenueResult] =
      await Promise.all([
        Order.countDocuments(),
        Product.countDocuments(),
        User.countDocuments({ role: "user" }),
        Order.aggregate([
          {
            //$group groups documents together and performs calculations.
            $group: {
              _id: null,
              totalRevenue: {
                // totalAmount ?? 0
                $sum: { $ifNull: ["$totalAmount", 0] },
              },
            },
          },
        ]),
      ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    res.status(200).json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);

    res.status(500).json({
      message: "Failed to fetch admin stats",
      error: error.message,
    });
  }
};

/*
Aggregation means:
"Take a collection of documents and perform calculations, transformations, grouping, filtering, etc., to produce a new result."

SQL Eg: SELECT SUM(totalAmount) FROM orders;
*/
