import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, course, message } = body;

    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { error: 'Name, email, phone, and course are required.' },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        name,
        email,
        phone,
        course,
        message,
      },
    });

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
