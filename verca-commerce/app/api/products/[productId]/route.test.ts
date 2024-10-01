import { GET } from './route'; // Adjust this import based on the actual path to your route file
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  product: {
    findUnique: jest.fn(),
  },
}));

describe('GET /products/:productId', () => {
  it('should return a product by productId', async () => {
    const productId = 'prod1'; // Mock product ID
    const mockProduct = {
      id: productId,
      name: 'Test Product',
      price: 100,
      imagePath: null,
      stock: 10,
      categories: [{ category: { name: 'Test Category' } }],
    };

    // Mock the findUnique method to return the mock product
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    // Mock the NextRequest and params
    const mockRequest = {} as unknown as NextRequest;
    const mockParams = { params: { productId } };

    // Call the GET function with the mock request and params
    const response = await GET(mockRequest, mockParams);

    // Convert the response stream to JSON
    const responseData = await response.json();

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
    expect(responseData).toMatchSchema(productSchema);

    // Check if the status is correct
    expect(response.status).toBe(200);
  });

  it('should return null when the product does not exist', async () => {
    const productId = 'prod2'; // Mock product ID for a non-existent product

    // Mock the findUnique method to return null
    (prisma.product.findUnique as jest.Mock).mockResolvedValue(null);

    // Mock the NextRequest and params
    const mockRequest = {} as unknown as NextRequest;
    const mockParams = { params: { productId } };

    const response = await GET(mockRequest, mockParams);
    const responseData = await response.json();

    // Expect the response data to be null
    expect(responseData).toBeNull();
    expect(response.status).toBe(200); // Still return 200 status even if no product found
  });
});
