import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ customerReference: string }> }
) {
  const params = await props.params;
  try {
    const customerReference = Number(params.customerReference);

    const user = await prisma.customer.findUnique({
      where: {
        customerReference: customerReference,
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
