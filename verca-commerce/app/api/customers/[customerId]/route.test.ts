import { GET } from './route'; // Adjust this import based on the actual path to your route file
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  customer: {
    findUnique: jest.fn(),
  },
}));

describe('GET /customers/:customerId', () => {
  it('should return customer details with address', async () => {
    const mockCustomer = {
      customerId: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: {
        id: 'address1',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postcode: '90210',
        country: 'USA',
      },
    };

    // Mock the findUnique method to return the mock customer
    (prisma.customer.findUnique as jest.Mock).mockResolvedValue(mockCustomer);

    const mockRequest = {
      nextUrl: {
        pathname: '/customers/123', // Adjust the path if necessary
      },
    } as unknown as NextRequest;

    // Mock params object
    const params = { customerId: '123' };

    const response = await GET(mockRequest, { params });
    const responseData = await response.json();

    // Define the schema for the expected response
    expect(responseData).toMatchSchema({
      type: 'object',
      properties: {
        customerId: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        address: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            street: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            postcode: { type: 'string' },
            country: { type: 'string' },
          },
          required: ['id', 'street', 'city', 'state', 'postcode', 'country'],
        },
      },
      required: ['customerId', 'firstName', 'lastName', 'email', 'address'],
    });

    expect(response.status).toBe(200);
  });
});
