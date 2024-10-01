import { GET } from './route'; // Adjust this import based on the actual path to your route file
import { NextRequest } from 'next/server';
import { matchers } from 'jest-json-schema';
import prisma from '@/prisma/client'; // Import the Prisma client

expect.extend(matchers);

// Mocking Prisma client methods
jest.mock('@/prisma/client', () => ({
  siteConfig: {
    findFirst: jest.fn(),
  },
}));

describe('GET /site-config', () => {
  it('should return the first site configuration', async () => {
    const mockSiteConfig = {
      id: 'config1',
      title: 'Test Site',
      description: 'This is a test site configuration.',
      logoUrl: 'http://example.com/logo.png',
      // Add other fields as necessary based on your Prisma model
    };

    // Mock the findFirst method to return the mock site configuration
    (prisma.siteConfig.findFirst as jest.Mock).mockResolvedValue(
      mockSiteConfig
    );

    // Mock the NextRequest (no searchParams needed for this endpoint)
    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: 'test' }), // Example query parameter
      },
    } as unknown as NextRequest;

    // Call the GET function with the mock request
    const response = await GET(mockRequest);

    // Convert the response stream to JSON
    const responseData = await response.json();

    // Define the schema for a single site configuration
    const siteConfigSchema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        logoUrl: { type: 'string' },
        // Add other fields as necessary
      },
      required: ['id', 'title', 'description', 'logoUrl'], // Adjust as per your schema
    };

    // Define the schema for the response data
    expect(responseData).toMatchSchema(siteConfigSchema);

    // Check if the status is correct
    expect(response.status).toBe(200);
  });

  it('should return null if no site configuration is found', async () => {
    // Mock the findFirst method to return null
    (prisma.siteConfig.findFirst as jest.Mock).mockResolvedValue(null);

    // Mock the NextRequest
    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams({ q: 'test' }), // Example query parameter
      },
    } as unknown as NextRequest;

    const response = await GET(mockRequest);
    const responseData = await response.json();

    // Expect the response data to be null
    expect(responseData).toBeNull();
    expect(response.status).toBe(200); // Still return 200 status even if no configuration found
  });
});
