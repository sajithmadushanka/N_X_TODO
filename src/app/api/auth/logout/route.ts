import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function GET() {
  // Clear cookies by setting them with an expired date
  const response = NextResponse.json({ message: 'Logged out successfully' });

    (await cookies()).delete("userId")
    return response;
}