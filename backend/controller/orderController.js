const prisma = require("../lib/db");

const getAllOrder = async (req, res) => {
  try {
    if (!req.query.take) {
      req.query.take = 10;
    } else {
      req.query.take = parseInt(req.query.take, 10);
      if (!Number.isInteger(req.query.take)) {
        req.query.take = 1;
      }
    }
    const skip = req.query.skip;

    const { orderStatus, paymentStatus, paymentMethod, email, orderId } =
      req.body;
    const filters = {};

    if (orderStatus) filters.orderStatus = orderStatus;
    if (paymentStatus) filters.paymentStatus = paymentStatus;
    if (paymentMethod) filters.paymentMethod = paymentMethod;
    if (orderId) filters.id = orderId;
    if (email) {
      filters.user = {
        email: email,
      };
    }
    const allOrder = await prisma.orderItem.findMany({
      skip: +skip,
      take: +req.query.take,
      where: filters,
      include: {
        clothing: true,
        user: true,
      },
    });

    res.status(200).json(allOrder);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderByOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.orderItem.findFirst({
      where: {
        id: id,
      },
    });
    if (!order) {
      return res.status(204).json("No such entries for order.");
    }
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createNewOrder = async (req, res) => {
    try {
      const {
        userId,
        clothingId,
        quantity,
        shippingAddress,
        billingAddress,
        paymentMethod,
        totalPrice,
        taxAmount,
        shippingCost,
        discountAmount,
        trackingNumber,
        estimatedDeliveryDate,
        comments
      } = req.body;
  
      if (!userId || !clothingId || !quantity || !shippingAddress || !paymentMethod || !totalPrice || !taxAmount || !shippingCost) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newOrder = await prisma.orderItem.create({
        data: {
          userId,
          clothingId,
          quantity,
          shippingAddress,
          billingAddress,
          paymentMethod,
          totalPrice,
          taxAmount,
          shippingCost,
          discountAmount,
          trackingNumber,
          estimatedDeliveryDate,
          comments
        }
      });
  
      return res.status(201).json(newOrder);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = {
    createNewOrder
  };
  
const updateOrderById = async (req, res) => {
    try {
      const { orderId } = req.params;
      const {
        quantity,
        shippingAddress,
        billingAddress,
        orderStatus,
        paymentStatus,
        paymentMethod,
        totalPrice,
        taxAmount,
        shippingCost,
        discountAmount,
        trackingNumber,
        estimatedDeliveryDate,
        comments
      } = req.body;
  
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }
  
      const updatedOrder = await prisma.orderItem.update({
        where: { id: orderId },
        data: {
          quantity,
          shippingAddress,
          billingAddress,
          orderStatus,
          paymentStatus,
          paymentMethod,
          totalPrice,
          taxAmount,
          shippingCost,
          discountAmount,
          trackingNumber,
          estimatedDeliveryDate,
          comments
        }
      });
  
      return res.status(200).json(updatedOrder);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
const deleteOrders = async (req, res) => {
  try {
    const deletedOrders = await prisma.orderItem.deleteMany({});

    return res.status(204).json({ message: "All orders have been deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const deletedOrder = await prisma.orderItem.delete({
      where: { id: orderId },
    });

    return res.status(204).json({ message: "Order has been deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllOrder,
  getOrderByOrderId,
  createNewOrder,
  updateOrderById,
  deleteSingleOrder,
  deleteOrders,
};
