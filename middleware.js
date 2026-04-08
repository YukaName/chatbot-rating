// Vercel Edge Middleware — redirect bots to SSR
const BOT_UA = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|facebookexternalhit|twitterbot|linkedinbot|pinterestbot|slackbot|telegrambot|whatsapp|applebot|petalbot|semrushbot|ahrefsbot|mj12bot|dotbot|rogerbot|screaming.frog|gptbot|chatgpt|claudebot|anthropic|perplexity|bytespider/i;

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const url = new URL(request.url);

  // Only rewrite root path for bots (other paths handled by vercel.json rewrites)
  if (url.pathname === '/' && BOT_UA.test(ua)) {
    return Response.redirect(new URL('/api/ssr', request.url), 307);
  }
}

export const config = {
  matcher: '/',
};
