import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Функция Middleware
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Защищаем только маршруты, начинающиеся с /profile
  if (pathname.startsWith('/profile')) {
    const token = req.cookies.get('token')?.value;

    // Если токен отсутствует, перенаправляем на страницу логина
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      // Верификация токена
      await jwtVerify(token, secret);
      // Если токен валиден, продолжаем обработку запроса
      return NextResponse.next();
    } catch (err) {
      console.error('Token verification failed:', err);
      // Если токен недействителен, перенаправляем на страницу логина
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Для остальных маршрутов продолжаем обработку запроса
  return NextResponse.next();
}

// Конфигурация Middleware
export const config = {
  matcher: ['/profile/:path*'], // Применяем Middleware только к /profile и его подмаршрутам
};
