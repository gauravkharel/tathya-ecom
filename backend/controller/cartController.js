const prisma = require("../lib/db");

const getCarts = async (req, res) => {
  try {
    const carts = await prisma.cartItem.findMany({
      include: {
        clothing: true,
        user: true,
      },
    });

    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: "No carts found." });
    }

    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCartsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const carts = await prisma.cartItem.findMany({
      where: {
        user: {
          userId: userId,
        },
      },
      include: {
        clothing: true,
        users: true,
      },
    });

    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: "Cart is empty. No cart found." });
    }

    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCartItem = async (req, res) => {
  try {
    const { cartId } = req.body;
    const cartItem = await prisma.cartItem.findUnique({
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

    res.json(productToCart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { cartId } = req.body;
    const deleteItem = await prisma.cartItem.delete({
      where: {
        id: cartId,
      },
      include: {
        clothing: true,
      },
    });

    res
      .status(204)
      .json({
        message: `${deleteItem.clothing.name} is removed from your cart.`,
      });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//create the controller for just it case
const deleteAllCarts = async (req, res) => {
  try {
    const deleteUsers = await prisma.cartItem.deleteMany({});

    res.status(204).json({ message: "All carts is deleted. Admin :)" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const {cartId, quantity} = req.body

    const updateCart = await prisma.cartItem.update({
      where: {
        id: cartId
      },
      data: {
        quantity: quantity
      }
    })

    res.status(204).json({message: "Cart is updated."})
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    
  }
};


module.exports = {
  addProductToCart,
  getCarts,
  getCartItem,
  getCartsByUserId,
  deleteCartItem,
  deleteAllCarts,
  updateCartItem,
};
