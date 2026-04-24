import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Companies API' });
}

export async function POST() {
  return NextResponse.json({ message: 'Create company' });
}

export async function PUT() {
  return NextResponse.json({ message: 'Update company' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Delete company' });
}