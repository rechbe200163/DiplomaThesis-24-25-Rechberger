// seeds.js
const {
  PrismaClient,
  Role,
  OrderState,
  BusinessSector,
} = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Erstelle eine Adresse
  const address = await prisma.address.create({
    data: {
      city: 'Berlin',
      country: 'Germany',
      postCode: '10115',
      state: 'Berlin',
      streetName: 'Musterstraße',
      streetNumber: '123',
    },
  });

  // Erstelle einen Customer
  const customer = await prisma.customer.create({
    data: {
      customerReference: 1,
      email: 'customer@example.com',
      phoneNumber: '0123456789',
      password: 'hashedPassword',
      firstName: 'Max',
      lastName: 'Mustermann',
      addressId: address.addressId,
      role: Role.CUSTOMER,
      businessSector: BusinessSector.RETAIL,
    },
  });

  // Erstelle einen Employee
  const employee = await prisma.employees.create({
    data: {
      email: 'employee@example.com',
      password: 'hashedPassword',
      firstName: 'Anna',
      lastName: 'Müller',
      role: Role.EMPLOYEE,
    },
  });

  // Erstelle einen Cart für den Customer
  const cart = await prisma.cart.create({
    data: {
      customerReference: customer.customerReference,
    },
  });

  // Erstelle ein Produkt
  const product = await prisma.product.create({
    data: {
      name: 'Laptop',
      price: 100000, // 1000€ in Cent
      description: 'Ein leistungsstarker Laptop',
      stock: 50,
    },
  });

  // Erstelle eine Kategorie
  const category = await prisma.category.create({
    data: {
      name: 'Elektronik',
    },
  });

  // Verknüpfe Produkt mit der Kategorie
  await prisma.categoriesOnProducts.create({
    data: {
      productId: product.productId,
      categoryId: category.categoryId,
    },
  });

  // Verknüpfe Produkt mit dem Cart
  await prisma.cartOnProducts.create({
    data: {
      cartId: cart.cartId,
      productId: product.productId,
      quantity: 1,
    },
  });

  // Erstelle eine Bestellung (Order)
  const order = await prisma.order.create({
    data: {
      customerReference: customer.customerReference,
      orderState: OrderState.ORDER_PLACED,
      selfCollect: false,
    },
  });

  // Verknüpfe Produkt mit der Bestellung
  await prisma.orderOnProducts.create({
    data: {
      orderId: order.orderId,
      productId: product.productId,
      productAmount: 1,
    },
  });

  // Erstelle eine Rechnung (Invoice)
  const invoice = await prisma.invoice.create({
    data: {
      orderId: order.orderId,
      invoiceAmount: 100000, // 1000€
      pdfUrl: 'https://example.com/invoice/1',
    },
  });

  // Erstelle eine Route
  const route = await prisma.route.create({
    data: {
      name: 'Berlin to Hamburg',
    },
  });

  // Verknüpfe Route mit der Bestellung
  await prisma.routesOnOrders.create({
    data: {
      routeId: route.routeId,
      orderId: order.orderId,
    },
  });

  // Erstelle eine SiteConfig
  const siteConfig = await prisma.siteConfig.create({
    data: {
      companyName: 'Tech GmbH',
      logoPath: '/path/to/logo.png',
      email: 'info@techgmbh.com',
      phoneNumber: '0123456789',
      iban: 'DE12345678901234567890',
      companyNumber: 'HRB123456',
      addressId: address.addressId,
    },
  });
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
