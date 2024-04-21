import blowfish from "../../src/utils/blowfish.js"
import prisma from "../../src/config/connection.js"

async function main() {
  const userAdmin = await prisma.user.upsert({
    where: { email: 'demo@demo.com' },
    update: {},
    create: {
      email: 'demo@demo.com',
      name: 'User Name',
      password: blowfish.encrypt('demo')
    },
  })

  console.log({ userAdmin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })