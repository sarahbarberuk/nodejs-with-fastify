// Import the unique Prisma client that uses this project's schema (replacing the temporary array used previously)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async function (fastify, opts) {
  fastify.get("/", async (req, reply) => {
    // Load the existing shopping list items from the database using Prisma
    const items = await prisma.shoppingListItem.findMany();

    return reply.view("/views/shopping_list.ejs", { items });
  });

  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "price"],
          properties: {
            name: { type: "string", minLength: 1 },
            price: { type: "number", minimum: 0 },
          },
        },
      },
    },
    async (req, reply) => {
      const { name, price } = req.body;

      // Store the new shopping list item in the database using Prisma
      await prisma.shoppingListItem.create({
        data: {
          name: name.trim(),
          price: price,
        },
      });

      return reply.redirect("/shopping_list");
    }
  );
};
