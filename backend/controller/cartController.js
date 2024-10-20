const prisma = require("../lib/db");

const getCarts = async (req, res) => {
  try {
    const { userId } = req.query;
    let carts;
    if (userId) {
      carts = await prisma.cartItem.findMany({
        where: {
          userId: userId,
        },
        include: {
          clothing: true,
          user: true,
        },
      });
      
      if (!carts || carts.length === 0) {
        return res.status(204).json({ message: "No carts found for the specified user." });
      }
    } else {
      carts = await prisma.cartItem.findMany({
        include: {
          clothing: true,
          user: true,
        },
      });

      if (!carts || carts.length === 0) {
        return res.status(404).json({ message: "No carts found." });
      }
    }
    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCartItem = async (req, res) => {
  try {
    const { cartId } = req.body;
    if (!cartId) {
      return res.status(400).json({ message: 'Cart ID is required' });
    }
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
    const userId = req.userId;
    const { clothingId, quantity } = req.body;
    if (!clothingId || !quantity) {
      return res.status(400).json({ message: 'Product ID, and Quantity are required' });
    }
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        clothingId: parseInt(clothingId),
        userId: userId,
      }
    });

    if (existingCartItem) {
      return res.status(409).json({ message: 'Product already exists in the user\'s cart' });
    }

    const productToCart = await prisma.cartItem.create({
      data: {
        clothingId: parseInt(clothingId),
        userId: userId,
        quantity: quantity,
      }
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
    if (!cartId) {
      return res.status(400).json({ message: 'Cart ID is required' });
    }
    const deleteItem = await prisma.cartItem.delete({
      where: {
        id: cartId,
      }
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

    res.status(204).json({ message: "All carts have been deleted. Admin :)" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;

    if (!cartId || !quantity) {
      return res.status(400).json({ message: 'Cart ID and Quantity are required' });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: parseInt(cartId) },
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id: parseInt(cartId) },
      data: { quantity },
    });

    return res.status(200).json(updatedCartItem);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};


const deleteCartItems = async (req, res) => {
  try {
    const { cartIds } = req.body;
    if (!cartIds || !Array.isArray(cartIds)) {
      return res.status(400).json({ message: "Cart IDs are required and should be an array" });
    }

    const deleteItems = await prisma.cartItem.deleteMany({
      where: {
        id: {
          in: cartIds,
        },
      },
    }); 

    if (deleteItems.count === 0) {
      return res.status(404).json({ message: "No items found to delete" });
    }

    res.status(204).json({
      message: `${deleteItems.count} item(s) removed from your cart.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteCartItems;


module.exports = {
  addProductToCart,
  getCarts,
  getCartItem,
  deleteCartItem,
  deleteAllCarts,
  updateCartItem,
  deleteCartItems,
};
