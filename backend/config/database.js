const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

if (process.env.NODE_ENV === "development") {
  prisma.$on("query", (e) => console.log("Prisma query:", e));
}

prisma
  .$connect()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = prisma;