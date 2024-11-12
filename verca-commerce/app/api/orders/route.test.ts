import { GET } from './route'; // Adjust this import based on the actual path to your route file
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client
import { Order } from '@prisma/client'; // Adjust the import based on your Prisma model

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  order: {
    findMany: jest.fn(),
  },
}));

describe('GET /orders', () => {
  it('should return a list of orders with customer information', async () => {
    // Mock the response from the Prisma client
    const mockOrders = [
      {
        id: '1',
        total: 150.0,
        customerReference: 'cust1',
        customer: { id: 'cust1', name: 'Customer 1' },
      },
      {
        id: '2',
        total: 200.0,
        customerReference: 'cust2',
        customer: { id: 'cust2', name: 'Customer 2' },
      },
    ];

    // Mock the findMany method to return the mock orders
    (prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders);

    // Mock the NextRequest (no searchParams needed for this endpoint)
    const mockRequest = {} as unknown as NextRequest;

    // Call the GET function with the mock request
    const response = await GET(mockRequest);

    // Convert the response stream to JSON
    const responseData = await response.json();

    // Define the schema for a single order
    const orderSchema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        total: { type: 'number' },
        customerReference: { type: 'string' },
        customer: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
          },
          required: ['id', 'name'],
        },
      },
      required: ['id', 'total', 'customerReference', 'customer'],
    };

    // Define the schema for the response data
    expect(responseData).toMatchSchema({
      type: 'array',
      items: orderSchema,
    });

    // Check if the status is correct
    expect(response.status).toBe(200);
  });

  it('should return an empty array when no orders exist', async () => {
    // Mock the findMany method to return an empty array
    (prisma.order.findMany as jest.Mock).mockResolvedValue([]);

    const mockRequest = {} as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual([]); // Expect an empty array
    expect(response.status).toBe(200);
  });
  it('should handle errors from the Prisma client', async () => {
    // Mock the findMany method to throw an error
    (prisma.order.findMany as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const mockRequest = {} as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual({ error: 'Internal Server Error' });
    expect(response.status).toBe(500);
  });
});
