import prisma from "./client";
import { hash } from "bcryptjs";

async function main() {
  const password = await hash("password", 10);

  // Customer seeding
  const customer = await prisma.customer.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      password: password,
      phoneNumber: "+43 123 456 789",
      address: {
        create: {
          city: "Test City",
          postcode: "12345",
          state: "Test State",
          country: "Test Country",
          streetName: "Test Street",
          streetNumber: "123",
        },
      },
    },
  });

  // Product seeding
  const product = await prisma.product.upsert({
    where: { name: "Test Product" },
    update: {},
    create: {
      name: "Test Product",
      price: 999,
      description: "Test Description",
      stock: 10,
    },
  });
  const product1 = await prisma.product.upsert({
    where: { name: "Test Product1" },
    update: {},
    create: {
      name: "Test Product1",
      price: 500,
      description: "Test Description1",
      stock: 20,
    },
  });

  // Category seeding
  const category = await prisma.category.upsert({
    where: { name: "Test Category" },
    update: {},
    create: {
      name: "Test Category",
    },
  });

  // Employee seeding
  await prisma.employees.upsert({
    where: { email: "employee@test.com" },
    update: {},
    create: {
      firstName: "Employee",
      lastname: "One",
      email: "employee@test.com",
      password: password,
    },
  });

  // SiteConfig seeding
  await prisma.siteConfig.upsert({
    where: { email: "config@test.com" },
    update: {},
    create: {
      companyName: "Test Company",
      logoPath: "/images/logo.png",
      email: "config@test.com",
      phoneNumber: "+43 123 456 000",
      address: {
        create: {
          city: "Config City",
          postcode: "54321",
          state: "Config State",
          country: "Config Country",
          streetName: "Config Street",
          streetNumber: "321",
        },
      },
    },
  });

  // Order seeding
  const order = await prisma.order.create({
    data: {
      customerId: customer.customerId,
      products: {
        create: [
          {
            productId: product.id,
            productAmount: 2,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      customerId: customer.customerId,
      products: {
        create: [
          {
            productId: product1.id,
            productAmount: 1,
          },
        ],
      },
    },
  });

  // Invoice seeding
  await prisma.invoice.create({
    data: {
      orderId: order.id,
      invoiceAmount: 1998, // 2 * 999
    },
  });
  await prisma.invoice.create({
    data: {
      orderId: order2.id,
      invoiceAmount: product1.price, //
    },
  });

  // Route seeding
  const route = await prisma.route.create({
    data: {
      name: "Test Route",
    },
  });

  // Route on Product seeding
  await prisma.routesOnProducts.create({
    data: {
      routeId: route.id,
      orderId: order.id,
    },
  });

  // Cart seeding
  await prisma.cart.create({
    data: {
      customerId: customer.customerId,
      products: {
        create: [
          {
            productId: product.id,
          },
          {
            productId: product1.id,
          },
        ],
      },
    },
  });

  // Category on Product seeding
  await prisma.categoriesOnProducts.create({
    data: {
      productId: product.id,
      categoryId: category.id,
    },
  });

  await prisma.categoriesOnProducts.create({
    data: {
      productId: product1.id,
      categoryId: category.id,
    },
  });

  console.log("Seeding finished.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
