import { generateCustomerRefercenceNumber } from '@/lib/utils';
import prisma from './client';
import { hash } from 'bcryptjs';

async function main() {
  const password = await hash('password', 10);
  const customerReference = 123456789;
  // Customer seeding
  const customer = await prisma.customer.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      customerReference,
      firstName: 'Test',
      lastName: 'User',
      email: 'customer@test.com',
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
      cart: {},
    },
  });

  const customerReferenceAdmin = 298765443;

  await prisma.customer.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      customerReference: customerReferenceAdmin,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@test.com',
      password: password,
      phoneNumber: '+43 123 456 789',
      address: {
        create: {
          city: 'Admin City',
          postcode: '54321',
          state: 'Admin State',
          country: 'Admin Country',
          streetName: 'Admin Street',
          streetNumber: '321',
        },
      },
      role: 'ADMIN',
      cart: {},
    },
  });

  const employee = await prisma.employees.upsert({
    where: { email: 'admin@admin' },
    update: {},
    create: {
      firstName: 'Admin',
      lastname: 'Admin',
      email: 'admin@admin',
      password: password,
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

  // Route seeding
  const route = await prisma.route.create({
    data: {
      name: 'Test Route',
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
