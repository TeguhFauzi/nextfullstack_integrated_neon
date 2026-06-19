import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, content } = body;

    if (!name || !email || !content) {
      return NextResponse.json(
        { error: 'Name, email, and content are required' },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        name,
        email,
        content,
      },
    });

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error) {
    console.error('Failed to create message:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
