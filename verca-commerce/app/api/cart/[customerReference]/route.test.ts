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

  it('should return the count of products in the cart', async () => {
    const mockCartCount = {
      _count: {
        products: 5,
      },
    };

    // Mock the findUnique method to return the mock cart count
    (prisma.cart.findUnique as jest.Mock).mockResolvedValue(mockCartCount);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: 'count' }),
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
        _count: {
          type: 'object',
          properties: {
            products: { type: 'number' },
          },
          required: ['products'],
        },
      },
      required: ['_count'],
    });

    expect(response.status).toBe(200);
  });

  it('should return the cart products with count', async () => {
    const mockCartProducts = {
      products: [
        {
          product: {
            id: 'product-1',
            name: 'Product 1',
            price: 100,
            imagePath: '/images/product1.jpg',
            stock: 10,
          },
        },
        {
          product: {
            id: 'product-2',
            name: 'Product 2',
            price: 200,
            imagePath: '/images/product2.jpg',
            stock: 5,
          },
        },
      ],
      _count: {
        products: 2,
      },
    };

    // Mock the findUnique method to return the mock cart products
    (prisma.cart.findUnique as jest.Mock).mockResolvedValue(mockCartProducts);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({}), // No specific query
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
                  id: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  imagePath: { type: 'string' },
                  stock: { type: 'number' },
                },
                required: ['id', 'name', 'price', 'imagePath', 'stock'],
              },
            },
            required: ['product'],
          },
        },
        _count: {
          type: 'object',
          properties: {
            products: { type: 'number' },
          },
          required: ['products'],
        },
      },
      required: ['products', '_count'],
    });

    expect(response.status).toBe(200);
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
  it('should handle erros from the Prisma client', async () => {
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
