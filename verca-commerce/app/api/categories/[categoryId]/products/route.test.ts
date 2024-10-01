import { GET } from './route'; // Adjust the import path as necessary
import { NextRequest } from 'next/server';
import prisma from '@/prisma/client'; // Import the Prisma client
import { matchers } from 'jest-json-schema'; // If using JSON schema validation
expect.extend(matchers);

// Mocking the Prisma client methods
jest.mock('@/prisma/client', () => ({
  product: {
    findMany: jest.fn(),
  },
}));

describe('GET /products', () => {
  it('should return products by category with sorting', async () => {
    const categoryId = 'category1';
    const mockProducts = [
      {
        id: 'product1',
        name: 'Product 1',
        price: 100,
        createdAt: '2024-09-29T11:59:44.273Z',
        imagePath: null,
        stock: 5,
        categories: [{ category: { name: 'Category 1' } }],
      },
      {
        id: 'product2',
        name: 'Product 2',
        price: 200,
        createdAt: '2023-01-01T00:00:00.000Z',
        imagePath: null,
        stock: 3,
        categories: [{ category: { name: 'Category 1' } }],
      },
    ];

    // Mock the Prisma findMany method to return the mock products
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ sort: 'latest' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest, { params: { categoryId } });
    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData).toEqual(mockProducts);
  });

  it('should return products by category with search query', async () => {
    const categoryId = 'category1';
    const mockProducts = [
      {
        id: 'product1',
        name: 'Special Product',
        price: 100,
        createdAt: '2024-09-29T11:59:44.273Z',
        imagePath: null,
        stock: 5,
        categories: [{ category: { name: 'Category 1' } }],
      },
    ];

    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: 'Special' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest, { params: { categoryId } });
    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData).toEqual(mockProducts);
  });

  it('should return an empty array if no products found for category', async () => {
    const categoryId = 'unknown-category';
    (prisma.product.findMany as jest.Mock).mockResolvedValue([]);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ sort: 'latest' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest, { params: { categoryId } });
    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData).toEqual([]); // Expect an empty array
  });
  it('should handle errors from the Prisma client', async () => {
    const categoryId = 'category1';
    (prisma.product.findMany as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ sort: 'latest' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest, { params: { categoryId } });
    const responseData = await response.json();

    expect(response.status).toBe(500);
    expect(responseData).toEqual({ error: 'Internal Server Error' });
  });
});
