import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client
import { GET } from './route';

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  customer: {
    findUnique: jest.fn(),
  },
}));

describe('GET /customers/:customerReference', () => {
  it('should return customer details with address', async () => {
    const mockCustomer = {
      customerReference: '123',
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
    const params = { customerReference: '123' };

    const response = await GET(mockRequest, { params });
    const responseData = await response.json();

    // Define the schema for the expected response
    expect(responseData).toMatchSchema({
      type: 'object',
      properties: {
        customerReference: { type: 'string' },
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
      required: [
        'customerReference',
        'firstName',
        'lastName',
        'email',
        'address',
      ],
    });

    expect(response.status).toBe(200);
  });
  it('should handle errors from the Prisma client', async () => {
    // Mock the findMany method to throw an error
    (prisma.customer.findUnique as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const mockRequest = {} as NextRequest; // Create a mock request object
    const params = { customerReference: '123' };

    const response = await GET(mockRequest, { params });
    const responseData = await response.json();

    // Expecting the response to return an error status
    expect(response.status).toBe(500);
    expect(responseData).toEqual({ error: 'Internal Server Error' });
  });
  it('should return a 404 status if the customer is not found', async () => {
    // Mock the findUnique method to return null
    (prisma.customer.findUnique as jest.Mock).mockResolvedValue(null);

    const mockRequest = {} as NextRequest; // Create a mock request object
    const params = { customerReference: '123' };

    const response = await GET(mockRequest, { params });
    const responseData = await response.json();

    // Expecting the response to return a 404 status
    expect(response.status).toBe(404);
    expect(responseData).toEqual({ message: 'Cart not found' });
  });
});
