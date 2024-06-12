const prisma = require("../lib/db");

const getAllOrder = async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getOrderByOrderId = async (req, res) => {
    try {
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getOrderByUserId = async (req, res) => {
    try {
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const createNewOrder = async (req, res) => {
    try {
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateOrderById = async (req, res) => {
    try {
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deletOrders = async(req, res) => {
    try {

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteSingleOrder = async(req, res) => {
    try {

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllOrder,
    getOrderByOrderId,
    getOrderByUserId,
    createNewOrder,
    updateOrderById,
    deleteSingleOrder,
    deleteOrders
};
