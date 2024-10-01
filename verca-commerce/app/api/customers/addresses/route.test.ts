import { GET } from './route'; // Adjust this import based on the actual path to your route file
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  address: {
    findMany: jest.fn(),
  },
}));

describe('GET /addresses', () => {
  it('should return addresses matching the city query', async () => {
    const mockAddresses = [
      {
        id: 'address1',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postcode: '10001',
        customers: [{ id: 'customer1', firstName: 'Alice', lastName: 'Smith' }],
      },
      {
        id: 'address2',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postcode: '10002',
        customers: [{ id: 'customer2', firstName: 'Bob', lastName: 'Brown' }],
      },
    ];

    // Mock the findMany method to return the mock addresses
    (prisma.address.findMany as jest.Mock).mockResolvedValue(mockAddresses);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ city: 'New York' }),
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
          city: { type: 'string' },
          state: { type: 'string' },
          country: { type: 'string' },
          postcode: { type: 'string' },
          customers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
              },
              required: ['id', 'firstName', 'lastName'],
            },
          },
        },
        required: ['id', 'city', 'state', 'country', 'postcode', 'customers'],
      },
    });

    expect(response.status).toBe(200);
  });

  it('should return addresses matching the postcode query', async () => {
    const mockAddresses = [
      {
        id: 'address3',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        postcode: '90001',
        customers: [],
      },
    ];

    (prisma.address.findMany as jest.Mock).mockResolvedValue(mockAddresses);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ postcode: '90001' }),
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
          city: { type: 'string' },
          state: { type: 'string' },
          country: { type: 'string' },
          postcode: { type: 'string' },
          customers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
              },
              required: ['id', 'firstName', 'lastName'],
            },
          },
        },
        required: ['id', 'city', 'state', 'country', 'postcode', 'customers'],
      },
    });

    expect(response.status).toBe(200);
  });

  it('should return addresses matching the state query', async () => {
    const mockAddresses = [
      {
        id: 'address4',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        postcode: '60601',
        customers: [],
      },
    ];

    (prisma.address.findMany as jest.Mock).mockResolvedValue(mockAddresses);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ state: 'IL' }),
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
          city: { type: 'string' },
          state: { type: 'string' },
          country: { type: 'string' },
          postcode: { type: 'string' },
          customers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
              },
              required: ['id', 'firstName', 'lastName'],
            },
          },
        },
        required: ['id', 'city', 'state', 'country', 'postcode', 'customers'],
      },
    });

    expect(response.status).toBe(200);
  });

  it('should return addresses matching the country query', async () => {
    const mockAddresses = [
      {
        id: 'address5',
        city: 'Toronto',
        state: 'ON',
        country: 'Canada',
        postcode: 'M5H 2N2',
        customers: [],
      },
    ];

    (prisma.address.findMany as jest.Mock).mockResolvedValue(mockAddresses);

    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ country: 'Canada' }),
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
          city: { type: 'string' },
          state: { type: 'string' },
          country: { type: 'string' },
          postcode: { type: 'string' },
          customers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
              },
              required: ['id', 'firstName', 'lastName'],
            },
          },
        },
        required: ['id', 'city', 'state', 'country', 'postcode', 'customers'],
      },
    });

    expect(response.status).toBe(200);
  });

  it('should return all addresses if no query parameters are provided', async () => {
    const mockAddresses = [
      {
        id: 'address6',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        postcode: '98101',
        customers: [],
      },
    ];

    (prisma.address.findMany as jest.Mock).mockResolvedValue(mockAddresses);

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
          city: { type: 'string' },
          state: { type: 'string' },
          country: { type: 'string' },
          postcode: { type: 'string' },
          customers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
              },
              required: ['id', 'firstName', 'lastName'],
            },
          },
        },
        required: ['id', 'city', 'state', 'country', 'postcode', 'customers'],
      },
    });

    expect(response.status).toBe(200);
  });
  it('should handle errors from the Prisma client', async () => {
    // Mock the findMany method to throw an error
    (prisma.address.findMany as jest.Mock).mockRejectedValue(
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
