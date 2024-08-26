const prisma = require("../lib/db");

const getAllCategories = async (req, res) => {
    try{
        const categories = await prisma.category.findMany({
            include:{
                parent: true
            }
        })
        res.status(200).json(categories)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
}

module.exports = {getAllCategories}