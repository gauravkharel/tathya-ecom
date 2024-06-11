const prisma = require("../lib/db");

const getCarts = async (req, res) => {
  try {
    const cart = await prisma.cart.findMany({
      include: {
        clothing: true,
        users: true,
      },
    });
    res.json(cart);
    console.log("Fetched cart", cart);
  } catch (err) {
    res.status(402).json({ message: "The cart is empty." });
  }
};

const getCartsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await prisma.cart.findMany({
      where: {
        users: userId,
      },
      include: {
        clothing: true,
        users: true,
      },
    });
    res.json(cart);
    console.log("Fetched cart", cart);
  } catch (err) {
    res.status(402).json({ message: "The cart is empty." });
  }
};

const getCartItem = async (req, res) => {
  try {
    const { cartId } = req.body;
    const cartItem = await prisma.cart.findUnique({
      where: {
        cartId: cartId,
      },
      include: {
        clothing: true,
        users: true,
      },
    });

    res.json(cartItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    const productToCart = await prisma.cart.create({
      data: {
        clothing: productId,
        users: userId,
        quantity: quantity,
      },
      include: {
        clothing: true,
        users: true,
      },
    });

    res.json(productToCart)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {};

const deleteCarts = async (req, res) => {};

const updateCartItem = async (req, res) => {};

module.exports = {
  addProductToCart,
  getCarts,
  getCartItem,
  getCartsByUserId,
  deleteCartItem,
  deleteCarts,
  updateCartItem,
};
