import Order from "../models/order.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import Product from "../models/product.model.js";

const restoreStock = async (order) => {
  for (const item of order.items) {
    const product = await Product.findById(item.productId);

    if (product) {
      product.stock += item.qty;
      await product.save();
    }
  }
};

export const placeOrder = async (req, res) => {
  try {
    const { items, address, paymentId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found`,
        });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `${product.name} is out of stock`,
        });
      }

      product.stock -= item.qty;
      await product.save();

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: item.qty,
      });

      totalAmount += product.price * item.qty;
    }

    const order = new Order({
      userId: req.user._id,
      items: orderItems,
      totalAmount,
      address,
      paymentId,
    });

    const createdOrder = await order.save();

    const message = `
      <h2>Order Confirmation</h2>
      <p>Hello ${req.user.name},</p>
      <p>Your order has been successfully placed!</p>
      <p>Order ID: <strong>${createdOrder._id}</strong></p>
      <p>Total Amount Paid: $${totalAmount.toFixed(2)}</p>
      <p>It will be shipped to: ${address.street}, ${address.city}</p>
      <p>Thank you for shopping with Aurevia!</p>
    `;

    try {
      await sendEmail({
        email: req.user.email,
        subject: "Aurevia - Order Confirmation",
        message,
      });
    } catch (emailError) {
      console.error("Failed to send order confirmation email:", emailError);
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.userId.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const validStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];

    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (req.body.status === "Cancelled" && order.status !== "Cancelled") {
      await restoreStock(order);
    }

    order.status = req.body.status;

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending orders can be cancelled",
      });
    }

    await restoreStock(order);

    order.status = "Cancelled";

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
