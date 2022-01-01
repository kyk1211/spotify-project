import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next/types';

export async function middleware(req: NextApiRequest) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET as string,
  });

  const url = req.url as string;

  if (url.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!token && url !== '/login') {
    return NextResponse.redirect('/login');
  }
}
