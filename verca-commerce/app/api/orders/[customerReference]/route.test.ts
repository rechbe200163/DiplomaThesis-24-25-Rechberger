import { GET } from './route'; // Adjust this import based on the actual path to your route file
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  order: {
    findMany: jest.fn(),
  },
}));

describe('GET /orders/:customerReference', () => {
  it('should return a list of orders for a specific customer', async () => {
    const customerReference = 'cust1'; // Mock customer ID
    const mockOrders = [
      {
        id: '1',
        total: 150.0,
        customerReference: customerReference,
        customer: { id: customerReference, name: 'Customer 1' },
      },
      {
        id: '2',
        total: 200.0,
        customerReference: customerReference,
        customer: { id: customerReference, name: 'Customer 1' },
      },
    ];

    // Mock the findMany method to return the mock orders
    (prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders);

    // Mock the NextRequest and params
    const mockRequest = {} as unknown as NextRequest;
    const mockParams = { params: { customerReference } };

    // Call the GET function with the mock request and params
    const response = await GET(mockRequest, mockParams);

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

  it('should return an empty array when no orders exist for the customer', async () => {
    const customerReference = 'cust2'; // Mock customer ID
    // Mock the findMany method to return an empty array
    (prisma.order.findMany as jest.Mock).mockResolvedValue([]);

    // Mock the NextRequest and params
    const mockRequest = {} as unknown as NextRequest;
    const mockParams = { params: { customerReference } };

    const response = await GET(mockRequest, mockParams);
    const responseData = await response.json();

    expect(responseData).toEqual([]); // Expect an empty array
    expect(response.status).toBe(200);
  });
  it('should handle errors from the Prisma client', async () => {
    const customerReference = 'cust3'; // Mock customer ID
    // Mock the findMany method to throw an error
    (prisma.order.findMany as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    // Mock the NextRequest and params
    const mockRequest = {} as unknown as NextRequest;
    const mockParams = { params: { customerReference } };

    const response = await GET(mockRequest, mockParams);
    const responseData = await response.json();

    // Expect the response data to contain an error message
    expect(responseData).toEqual({ error: 'Internal Server Error' });
    expect(response.status).toBe(500);
  });
});
