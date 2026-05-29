import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const prisma = new PrismaClient();
const rl = readline.createInterface({ input, output });

async function main() {
  console.log("\n=== Create Superuser ===\n");

  const email = await rl.question("Email: ");
  const name = await rl.question("Name: ");
  const password = await rl.question("Password: ");
  const confirm = await rl.question("Confirm password: ");

  if (password !== confirm) {
    console.error("✗ Passwords do not match");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { name, hashedPassword, role: "admin" },
    create: { email, name, hashedPassword, role: "admin" },
  });

  console.log(`\n✓ Superuser "${email}" created successfully\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
