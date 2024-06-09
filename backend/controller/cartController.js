const prisma = require("../lib/db");

const getCarts = async (req, res) => {};

const getCartItem = async (req, res) => {};

const addProductToCart = async (req, res) => {
  const { productId, cartId } = req.body;
};
const deleteCartItem = async (req, res) => {};

const deleteCarts = async (req, res) => {};

const updateCartItem = async (req, res) => {};

module.exports = {
  addProductToCart,
  getCarts,
  deleteCartItem,
  deleteCarts,
  updateCartItem,
};
