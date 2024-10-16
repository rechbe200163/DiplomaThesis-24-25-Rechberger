import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(
  req: NextRequest,
  { params }: { params: { customerId: string } }
) {
  try {
    const customerId = params.customerId;

    const user = await prisma.customer.findUnique({
      where: {
        customerId: customerId,
        deleted: false,
      },
      include: {
        address: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
