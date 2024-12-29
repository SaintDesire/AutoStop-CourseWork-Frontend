import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Middleware для защиты маршрутов
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Проверяем, защищаем ли текущий путь
  if (pathname.startsWith('/profile') || pathname.startsWith('/marketplace/car/add')) {
    const token = req.cookies.get('token')?.value;

    // Если токен отсутствует, перенаправляем на страницу логина
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      // Проверяем валидность токена
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
  matcher: ['/profile/:path*', '/marketplace/car/add'], // Применяем Middleware для указанных маршрутов
};
