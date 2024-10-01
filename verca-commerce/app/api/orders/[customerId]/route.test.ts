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

describe('GET /orders/:customerId', () => {
  it('should return a list of orders for a specific customer', async () => {
    const customerId = 'cust1'; // Mock customer ID
    const mockOrders = [
      {
        id: '1',
        total: 150.0,
        customerId: customerId,
        customer: { id: customerId, name: 'Customer 1' },
      },
      {
        id: '2',
        total: 200.0,
        customerId: customerId,
        customer: { id: customerId, name: 'Customer 1' },
      },
    ];

    // Mock the findMany method to return the mock orders
    (prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders);

    // Mock the NextRequest and params
    const mockRequest = {} as unknown as NextRequest;
    const mockParams = { params: { customerId } };

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
        customerId: { type: 'string' },
        customer: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
          },
          required: ['id', 'name'],
        },
      },
      required: ['id', 'total', 'customerId', 'customer'],
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
    const customerId = 'cust2'; // Mock customer ID
    // Mock the findMany method to return an empty array
    (prisma.order.findMany as jest.Mock).mockResolvedValue([]);

    // Mock the NextRequest and params
    const mockRequest = {} as unknown as NextRequest;
    const mockParams = { params: { customerId } };

    const response = await GET(mockRequest, mockParams);
    const responseData = await response.json();

    expect(responseData).toEqual([]); // Expect an empty array
    expect(response.status).toBe(200);
  });
});
