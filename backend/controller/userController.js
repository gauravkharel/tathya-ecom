const prisma = require("../lib/db");

const getUser = async (req, res) => {
  try {
    // const userId = req.userId;
    // const user = await prisma.clothing.findUnique({
    //   where: {
    //     id: userId,
    //   },
    //   include: {
    //     addresses: true,
    //   },
    // });

    // res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateUser = async(req, res) => {
    try {
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}