import { generateCustomerRefercenceNumber } from '@/lib/utils';
import prisma from './client';
import { hash } from 'bcryptjs';

async function main() {
  const password = await hash('password', 10);
  const customerReference = Number(1234567890);
  // Customer seeding
  const customer = await prisma.customer.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      customerReference,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: password,
      phoneNumber: '+43 123 456 789',
      address: {
        create: {
          city: 'Test City',
          postcode: '12345',
          state: 'Test State',
          country: 'Test Country',
          streetName: 'Test Street',
          streetNumber: '123',
        },
      },
    },
  });

  // Product seeding
  const product = await prisma.product.upsert({
    where: { name: 'Test Product' },
    update: {},
    create: {
      name: 'Test Product',
      price: 999,
      description: 'Test Description',
      stock: 10,
      imagePath: 'product_images/mock_image1.png',
    },
  });
  const product1 = await prisma.product.upsert({
    where: { name: 'Test Product1' },
    update: {},
    create: {
      name: 'Test Product1',
      price: 500,
      description: 'Test Description1',
      stock: 20,
      imagePath: 'product_images/mock_image2.png',
    },
  });

  // Category seeding
  const category = await prisma.category.upsert({
    where: { name: 'Test Category' },
    update: {},
    create: {
      name: 'Test Category',
    },
  });

  // Employee seeding
  await prisma.employees.upsert({
    where: { email: 'employee@test.com' },
    update: {},
    create: {
      firstName: 'Employee',
      lastname: 'One',
      email: 'employee@test.com',
      password: password,
    },
  });

  // SiteConfig seeding
  await prisma.siteConfig.upsert({
    where: { email: 'config@test.com' },
    update: {},
    create: {
      iban: 'AT823810300006528590',
      companyNumber: '123456789',
      companyName: 'Test Company',
      logoPath: '/images/logo.png',
      email: 'config@test.com',
      phoneNumber: '+43 123 456 000',
      address: {
        create: {
          city: 'Config City',
          postcode: '54321',
          state: 'Config State',
          country: 'Config Country',
          streetName: 'Config Street',
          streetNumber: '321',
        },
      },
    },
  });

  // Order seeding
  const order = await prisma.order.create({
    data: {
      customerReference: customer.customerReference,
      products: {
        create: [
          {
            productId: product.productId,
            productAmount: 2,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      customerReference: customer.customerReference,
      products: {
        create: [
          {
            productId: product1.productId,
            productAmount: 1,
          },
        ],
      },
    },
  });

  // Invoice seeding
  await prisma.invoice.create({
    data: {
      orderId: order.orderId,
      invoiceAmount: 1998, // 2 * 999
    },
  });
  await prisma.invoice.create({
    data: {
      orderId: order2.orderId,
      invoiceAmount: product1.price, //
    },
  });

  // Route seeding
  const route = await prisma.route.create({
    data: {
      name: 'Test Route',
    },
  });

  // Route on Product seeding
  await prisma.routesOnOrders.create({
    data: {
      routeId: route.routeId,
      orderId: order.orderId,
    },
  });

  // Cart seeding
  await prisma.cart.create({
    data: {
      customerReference: customer.customerReference,
      products: {
        create: [
          {
            productId: product.productId,
          },
          {
            productId: product1.productId,
          },
        ],
      },
    },
  });

  // Category on Product seeding
  await prisma.categoriesOnProducts.create({
    data: {
      productId: product.productId,
      categoryId: category.categoryId,
    },
  });

  await prisma.categoriesOnProducts.create({
    data: {
      productId: product1.productId,
      categoryId: category.categoryId,
    },
  });

  console.log('Seeding finished.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
