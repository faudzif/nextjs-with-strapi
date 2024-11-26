import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { i18n } from "../i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  //Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value: any, key: any) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  return matchLocale(languages, locales, i18n.defaultLocale);
}
const redirects:any = {
  '/link': '/ar/links',
  
};
export default function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname;
  pathname = pathname.replace(/\/+/g, '/');
  if (pathname.startsWith('/rides')) {
    return ;
  }

  if (
    [
      '/favicon.ico',
    ].includes(pathname)
  )
    return;

  // / Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  if (pathname in redirects) {
    const targetUrl = redirects[pathname]; 
    return NextResponse.redirect(new URL(targetUrl, request.url), 301); // Perform 301 redirection
  }
  // Redirect to locale if missing
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    } else {
      return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }
  }
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
  default-src 'self' https://storage.googleapis.com/;
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: 'unsafe-inline' https://www.google.com/ ${
    process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
  };
  connect-src 'self' https://www.googletagmanager.com/ https://www.google-analytics.com/ https://nkbvzouotnggnkhpeh7xodu2eu.appsync-api.us-east-1.amazonaws.com/ wss://nkbvzouotnggnkhpeh7xodu2eu.appsync-realtime-api.us-east-1.amazonaws.com/ https://www.google-analytics.com https://*.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/ https://www.googletagmanager.com/;
  img-src 'self' blob: data: https://fonts.gstatic.com/ https://www.googletagmanager.com/ https://storage.googleapis.com/;
  font-src 'self' https://fonts.gstatic.com/ https://fonts.googleapis.com https://fonts.googleapis.com/ data:;
  frame-src 'self' https://www.google.com/ youtube.com www.youtube.com https://youtube.com/ https://www.youtube.com/;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  requestHeaders.set("x-url", request.url);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  return response;
}

export const config = {
  matcher: [
    // Matcher ignoring `/_next/` and `/api/`
    "/((?!_next).*)",
    // Nonce Config
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}