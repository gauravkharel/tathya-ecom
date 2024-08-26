const {Prisma} = require('@prisma/client')
const prisma = require("../db");

//recursive CTE CategoryTree, recursively join all the id's from Catgory and later, returns as CategoryTree. simple. 
async function getAllCategoryIds(selectedCategories) {
    const categories = await prisma.$queryRaw`
      WITH RECURSIVE CategoryTree AS (
        SELECT id FROM "public"."categories" WHERE name IN (${Prisma.join(selectedCategories)})
        UNION ALL
        SELECT c.id FROM "public"."categories" c
        INNER JOIN CategoryTree ct ON ct.id = c."parentId"
      )
      SELECT id FROM CategoryTree
    `;
    console.log("from: ", categories.map(category => category.id))
    return categories.map(category => category.id);
  }

module.exports = getAllCategoryIds