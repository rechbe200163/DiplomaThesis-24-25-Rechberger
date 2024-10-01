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
  it('should return customers matching the search query', async () => {
    const mockCustomers = [
      {
        id: 'customer1',
        firstName: 'John',
        lastName: 'Doe',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          zip: '12345',
        },
      },
      {
        id: 'customer2',
        firstName: 'Jane',
        lastName: 'Doe',
        address: {
          street: '456 Elm St',
          city: 'Anytown',
          zip: '12345',
        },
      },
    ];

    // Mock the findMany method to return the mock customers
    (prisma.customer.findMany as jest.Mock).mockResolvedValue(mockCustomers);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: 'Doe' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

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
              street: { type: 'string' },
              city: { type: 'string' },
              zip: { type: 'string' },
            },
            required: ['street', 'city', 'zip'],
          },
        },
        required: ['id', 'firstName', 'lastName', 'address'],
      },
    });

    expect(response.status).toBe(200);
  });

  it('should return an empty array when no customers match the search query', async () => {
    // Mock the findMany method to return an empty array
    (prisma.customer.findMany as jest.Mock).mockResolvedValue([]);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: 'NonExistingName' }),
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    expect(responseData).toEqual([]); // Expecting an empty array
    expect(response.status).toBe(200);
  });

  it('should return all customers if no search query is provided', async () => {
    const mockCustomers = [
      {
        id: 'customer3',
        firstName: 'Alice',
        lastName: 'Smith',
        address: {
          street: '789 Maple St',
          city: 'Anytown',
          zip: '12345',
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
              street: { type: 'string' },
              city: { type: 'string' },
              zip: { type: 'string' },
            },
            required: ['street', 'city', 'zip'],
          },
        },
        required: ['id', 'firstName', 'lastName', 'address'],
      },
    });

    expect(response.status).toBe(200);
  });
  it('should handle errors from the Prisma client', async () => {
    // Mock the findMany method to throw an error
    (prisma.customer.findMany as jest.Mock).mockRejectedValue(
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
