const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient({})

// async function main() {
//    const deleteUsers = await prisma.user.delete({
//       where: {
//         email: 'alice@prisma.o'
//       },
//     })
//     const allUsers = await prisma.user.findMany()
//     console.dir(allUsers, { depth: null })
// }
// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async(e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

module.exports = prisma