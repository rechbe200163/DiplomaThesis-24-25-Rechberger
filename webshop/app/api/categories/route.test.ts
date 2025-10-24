import { GET } from './route'; // Adjust this import based on the actual path to your route file
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  category: {
    findMany: jest.fn(),
  },
}));

describe('GET /categories', () => {
  it('should return a list of categories', async () => {
    const mockCategories = [
      { id: '1', name: 'Category 1', description: 'This is category 1' },
      { id: '2', name: 'Category 2', description: 'This is category 2' },
    ];

    // Mock the findMany method to return the mock categories
    (prisma.category.findMany as jest.Mock).mockResolvedValue(mockCategories);

    const mockRequest = {} as NextRequest; // Create a mock request object

    const response = await GET(mockRequest);
    const responseData = await response.json();

    // Define the schema for the expected response
    expect(responseData).toMatchSchema({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['id', 'name', 'description'],
      },
    });

    expect(response.status).toBe(200);
  });

  it('should return an empty array when there are no categories', async () => {
    // Mock the findMany method to return an empty array
    (prisma.category.findMany as jest.Mock).mockResolvedValue([]);

    const mockRequest = {} as NextRequest; // Create a mock request object

    const response = await GET(mockRequest);
    const responseData = await response.json();

    // Expect the response to be an empty array
    expect(responseData).toEqual([]);
    expect(response.status).toBe(200);
  });

  it('should handle errors from the Prisma client', async () => {
    // Mock the findMany method to throw an error
    (prisma.category.findMany as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const mockRequest = {} as NextRequest; // Create a mock request object

    const response = await GET(mockRequest);
    const responseData = await response.json();

    // Expecting the response to return an error status
    expect(response.status).toBe(500);
    expect(responseData).toEqual({ error: 'Internal Server Error' });
  });
});
