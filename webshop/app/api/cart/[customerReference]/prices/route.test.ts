import { GET } from './route'; // Adjust this import based on the actual path to your route file
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  cart: {
    findUnique: jest.fn(),
  },
}));

describe('GET /carts/:customerReference', () => {
  const customerReference = 'customer-123';

  it('should return the cart products sorted by price in descending order', async () => {
    const mockCartProducts = {
      products: [
        {
          product: {
            name: 'Product 1',
            price: 200,
          },
        },
        {
          product: {
            name: 'Product 2',
            price: 100,
          },
        },
      ],
    };

    // Mock the findUnique method to return the mock cart products
    (prisma.cart.findUnique as jest.Mock).mockResolvedValue(mockCartProducts);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({}),
      },
    } as unknown as NextRequest;

    // Mock params object
    const params = { customerReference };

    const response = await GET(mockRequest, { params });
    const responseData = await response.json();

    // Define the schema for the expected response
    expect(responseData).toMatchSchema({
      type: 'object',
      properties: {
        products: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              product: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  price: { type: 'number' },
                },
                required: ['name', 'price'],
              },
            },
            required: ['product'],
          },
        },
      },
      required: ['products'],
    });

    // Check if the response status is correct
    expect(response.status).toBe(200);

    // Verify the products are sorted by price in descending order
    const prices = responseData.products.map(
      (item: { product: { price: number } }) => item.product.price
    );
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  it('should return 404 when cart is not found', async () => {
    // Mock the findUnique method to return null (cart not found)
    (prisma.cart.findUnique as jest.Mock).mockResolvedValue(null);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({}),
      },
    } as unknown as NextRequest;

    // Mock params object
    const params = { customerReference };

    const response = await GET(mockRequest, { params });
    const responseData = await response.json();

    expect(responseData).toEqual({ message: 'Cart not found' });
    expect(response.status).toBe(404);
  });
  it('should handle errors from the Prisma client', async () => {
    // Mock the findUnique method to throw an error
    (prisma.cart.findUnique as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({}),
      },
    } as unknown as NextRequest;

    // Mock params object
    const params = { customerReference };

    const response = await GET(mockRequest, { params });
    const responseData = await response.json();

    expect(responseData).toEqual({ error: 'Internal Server Error' });
    expect(response.status).toBe(500);
  });
});
