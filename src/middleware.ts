import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.url; // Можно сделать проверку на авторизацию

    //return NextResponse.redirect(new URL('/home', request.url))
}