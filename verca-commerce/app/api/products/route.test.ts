import { GET } from './route';
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client
import { Product } from '@prisma/client';

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  product: {
    findMany: jest.fn(),
  },
}));

describe('GET /products', () => {
  it('should return a list of products sorted by price in ascending order', async () => {
    // Mock the response from the Prisma client
    const mockProducts = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        imagePath: null,
        stock: 5,
        categories: [{ category: { name: 'Category 1' } }],
      },
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        imagePath: null,
        stock: 3,
        categories: [{ category: { name: 'Category 2' } }],
      },
    ];

    // Mock the findMany method to return the mock products
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

    // Mock the NextRequest with searchParams for sorting by price-asc
    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ sort: 'price-asc' }),
      },
    } as unknown as NextRequest;

    // Call the GET function with the mock request
    const response = await GET(mockRequest);

    // Convert the response stream to JSON
    const responseData = await response.json(); // This reads the stream and returns the parsed data

    // Define the schema for a single product
    const productSchema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'number' },
        imagePath: { type: ['string', 'null'] },
        stock: { type: 'number' },
        categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
                required: ['name'],
              },
            },
            required: ['category'],
          },
        },
      },
      required: ['id', 'name', 'price', 'imagePath', 'stock', 'categories'],
    };

    // Define the schema for the response data
    expect(responseData).toMatchSchema({
      type: 'array',
      items: productSchema,
    });

    // Check if the status is correct
    expect(response.status).toBe(200);

    // Verify the products are sorted by price in ascending order
    const prices = responseData.map((product: Product) => product.price);
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  it('should return a list of products sorted by createdAt in descending order', async () => {
    // Mock products sorted by createdAt descending
    const mockProducts = [
      {
        id: 'adfadasdas',
        name: 'Product 1',
        price: 100,
        createdAt: '2024-09-29T11:59:44.273Z' as String, // Ensure this is a string
        imagePath: null,
        stock: 5,
        categories: [{ category: { name: 'Category 1' } }],
      },
      {
        id: 'asdasdasd',
        name: 'Product 2',
        price: 200,
        createdAt: '2023-01-02T00:00:00.000Z' as String, // Ensure this is a string
        imagePath: null,
        stock: 3,
        categories: [{ category: { name: 'Category 2' } }],
      },
    ];

    // Mock the Prisma client's findMany method
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

    // Create a mock request with sorting parameter
    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ sort: 'latest' }),
      },
    } as unknown as NextRequest;

    // Call the GET function with the mock request
    const response = await GET(mockRequest);
    const responseData = await response.json();

    expect(response.status).toBe(200);
    // Check the response matches mockProducts
    expect(responseData).toEqual(mockProducts);
  });

  it('should return a list of products sorted by createdAt in descending order', async () => {
    const mockProducts = [
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        createdAt: '2023-01-01T23:00:00.000Z', // Adjusted to string
        imagePath: null,
        stock: 3,
        categories: [{ category: { name: 'Category 2' } }],
      },
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        createdAt: '2022-12-31T23:00:00.000Z', // Adjusted to string
        imagePath: null,
        stock: 5,
        categories: [{ category: { name: 'Category 1' } }],
      },
    ];

    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ sort: 'latest' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData).toEqual(mockProducts); // Check the response matches mockProducts
  });

  // Existing test for getting a list of products
  it('should return a list of products', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Test Product',
        price: 999,
        imagePath: null,
        stock: 10,
        categories: [{ category: { name: 'Test Category' } }],
      },
      {
        id: '2',
        name: 'Test Product1',
        price: 500,
        imagePath: null,
        stock: 20,
        categories: [{ category: { name: 'Test Category' } }],
      },
    ];

    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: 'test', sort: 'latest' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    const productSchema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'number' },
        imagePath: { type: ['string', 'null'] },
        stock: { type: 'number' },
        categories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
                required: ['name'],
              },
            },
            required: ['category'],
          },
        },
      },
      required: ['id', 'name', 'price', 'imagePath', 'stock', 'categories'],
    };

    expect(responseData).toMatchSchema({
      type: 'array',
      items: productSchema,
    });

    expect(response.status).toBe(200);
  });
  it('should handle errors from the Prisma client', async () => {
    // Mock the findMany method to throw an error
    (prisma.product.findMany as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    // Mock the NextRequest
    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: 'test' }), // Example query parameter
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    // Expect the response data to contain an error message
    expect(responseData).toEqual({ error: 'Internal Server Error' });
    expect(response.status).toBe(500);
  });
});
