import { GET } from './route'; // Adjust this import based on the actual path to your route file
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  customer: {
    findMany: jest.fn(),
  },
}));

describe('GET /customers', () => {
  it('should return customers filtered by postCode', async () => {
    const mockCustomers = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        address: {
          postCode: '12345',
          city: 'Sample City',
        },
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        address: {
          postCode: '12345',
          city: 'Another City',
        },
      },
    ];

    // Mock the findMany method to return the mock customers
    (prisma.customer.findMany as jest.Mock).mockResolvedValue(mockCustomers);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ postCode: '12345' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    // Define the schema for the expected response
    expect(responseData).toMatchSchema({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          address: {
            type: 'object',
            properties: {
              postCode: { type: 'string' },
              city: { type: 'string' },
            },
            required: ['postCode', 'city'],
          },
        },
        required: ['id', 'firstName', 'lastName', 'address'],
      },
    });

    // Check if the response status is correct
    expect(response.status).toBe(200);
  });

  it('should return all customers when no postCode is provided', async () => {
    const mockCustomers = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        address: {
          postCode: '12345',
          city: 'Sample City',
        },
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        address: {
          postCode: '67890',
          city: 'Another City',
        },
      },
    ];

    // Mock the findMany method to return the mock customers
    (prisma.customer.findMany as jest.Mock).mockResolvedValue(mockCustomers);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({}),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    // Define the schema for the expected response
    expect(responseData).toMatchSchema({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          address: {
            type: 'object',
            properties: {
              postCode: { type: 'string' },
              city: { type: 'string' },
            },
            required: ['postCode', 'city'],
          },
        },
        required: ['id', 'firstName', 'lastName', 'address'],
      },
    });

    // Check if the response status is correct
    expect(response.status).toBe(200);
  });
  it('should handle errors when the Prisma client throws an error', async () => {
    // Mock the findMany method to throw an error
    (prisma.customer.findMany as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({}),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);

    // Check if the response status is correct
    expect(response.status).toBe(500);
  });
});
