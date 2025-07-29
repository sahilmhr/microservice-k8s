import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const customers = [
    {
      name: "John Doe",
      email: "john.doe@company.com",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@company.com",
    },
    {
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
    },
    {
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
    },
    {
      name: "David Brown",
      email: "david.brown@company.com",
    },
    {
      name: "Emily Davis",
      email: "emily.davis@company.com",
    },
    {
      name: "Robert Miller",
      email: "robert.miller@company.com",
    },
    {
      name: "Lisa Anderson",
      email: "lisa.anderson@company.com",
    },
  ];

  await prisma.customer.createMany({
    data: customers,
  });
};

main()
  .then(() => {
    console.log("Seeding completed successfully.");
  })
  .catch((error) => {
    console.error("Error during seeding:", error);
  });
