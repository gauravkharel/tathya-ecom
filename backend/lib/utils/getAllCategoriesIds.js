const {Prisma} = require('@prisma/client')

async function getAllCategoryIds(selectedCategories) {
    const categories = await prisma.$queryRaw`
      WITH RECURSIVE CategoryTree AS (
        SELECT id FROM Category WHERE name IN (${Prisma.join(selectedCategories)})
        UNION ALL
        SELECT c.id FROM Category c
        INNER JOIN CategoryTree ct ON ct.id = c.parentId
      )
      SELECT id FROM CategoryTree
    `;
    return categories.map(category => category.id);
  }

module.export = getAllCategoryIds