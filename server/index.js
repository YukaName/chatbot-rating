import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ============ DATA (same as frontend, for SSR) ============
const developers = [
  { slug: 'kts', name: 'KTS', fullName: 'KTS (кодовая разработка)', cases: 6, type: 'Код', site: 'https://kts.tech', brands: ['Сбер (СберКот)', 'VK Праздники', 'VK Video', 'Бургер Кинг', 'Самокат', 'Пятёрочка/X5'] },
  { slug: 'just-ai', name: 'Just AI', fullName: 'Just AI (JAICP)', cases: 6, type: 'Код (JAICP)', site: 'https://just-ai.com', brands: ['Альфа-Банк', 'М.Видео', 'Совкомбанк', 'Ozon.travel', 'Мегафон (Вика)', 'DNS (NPS)'] },
  { slug: 'twin', name: 'TWIN', fullName: 'TWIN', cases: 5, type: 'Конструктор', site: 'https://twin24.ai', brands: ['Додо Пицца', 'Ростелеком', 'X5 Group (NPS)', '2ГИС', 'РЖД'] },
  { slug: 'nc-team', name: 'NC Team', fullName: 'NC Team (Smartbot Pro)', cases: 4, type: 'Конструктор', site: 'https://www.smartbotpro.ru', brands: ['Пятёрочка/X5', 'ВкусВилл', 'Flowwow', 'VK Маркет'] },
  { slug: 'autofaq', name: 'AutoFAQ', fullName: 'AutoFAQ', cases: 4, type: 'Код', site: 'https://autofaq.ai', brands: ['МТС', 'Газпромбанк', 'Ростелеком', 'РУСАЛ'] },
  { slug: 'eora', name: 'EORA', fullName: 'EORA (zDialog)', cases: 3, type: 'Код', site: 'https://eora.ru', brands: ['Магнит', 'Додо Пицца', 'S7 Airlines'] },
  { slug: 'crt', name: 'ЦРТ', fullName: 'ЦРТ (ChatNavigator)', cases: 3, type: 'Код', site: 'https://www.speechpro.ru', brands: ['Билайн', 'T2/Tele2', 'Ростелеком'] },
  { slug: 'edna', name: 'edna', cases: 2, type: 'Код', site: 'https://edna.ru', brands: ['М.Видео', 'Додо Пицца'] },
  { slug: 'sberdevices', name: 'SberDevices', cases: 2, type: 'Код', site: 'https://developers.sber.ru', brands: ['Сбер', 'Альфа-Банк'] },
];

// ============ BOT DETECTION ============
const BOT_UA = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|facebookexternalhit|twitterbot|linkedinbot|pinterestbot|slackbot|telegrambot|whatsapp|applebot|petalbot|semrushbot|ahrefsbot|mj12bot|dotbot|rogerbot|screaming frog/i;

function isBot(ua) {
  return BOT_UA.test(ua || '');
}

// ============ SSR PAGES ============
function renderMeta(title, description, url) {
  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:site_name" content="AI Рейтинги" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
  `;
}

function renderRatingPage() {
  const sorted = [...developers].sort((a, b) => b.cases - a.cases);
  const rows = sorted.map((d, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><a href="/developer/${d.slug}">${d.fullName || d.name}</a></td>
      <td>${d.cases}</td>
      <td>${d.type}</td>
      <td>${d.brands.join(', ')}</td>
      <td><a href="${d.site}">${d.site}</a></td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${renderMeta(
    'Рейтинг разработчиков чат-ботов — AI Рейтинги',
    'Рейтинг компаний-разработчиков чат-ботов по количеству публичных кейсов для Топ-100 крупнейших брендов России. KTS, Just AI, TWIN, AutoFAQ и другие.',
    'https://airatings.ru/'
  )}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Рейтинги",
    "url": "https://airatings.ru/",
    "description": "Независимые рейтинги разработчиков ИИ и чат-ботов в России"
  }
  </script>
  <style>body{font-family:sans-serif;max-width:1200px;margin:0 auto;padding:20px}table{width:100%;border-collapse:collapse}th,td{padding:8px 12px;border:1px solid #ddd;text-align:left}th{background:#f5f5f5}</style>
</head>
<body>
  <h1>Рейтинг разработчиков чат-ботов</h1>
  <p>Рейтинг компаний по количеству публичных кейсов внедрения чат-ботов для брендов из Топ-100 крупнейших брендов России (BrandLab 2025).</p>
  <table>
    <thead><tr><th>#</th><th>Разработчик</th><th>Кейсы</th><th>Тип</th><th>Бренды</th><th>Сайт</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <h2>О рейтинге</h2>
  <p>Рейтинг основан на количестве публичных кейсов внедрения чат-ботов для компаний из списка «Топ-100 самых дорогих брендов России 2025» по версии BrandLab.</p>
</body>
</html>`;
}

function renderDeveloperPage(slug) {
  const dev = developers.find(d => d.slug === slug);
  if (!dev) return null;

  const rank = developers.sort((a, b) => b.cases - a.cases).findIndex(d => d.slug === slug) + 1;

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${renderMeta(
    `${dev.fullName || dev.name} — Разработчик чат-ботов #${rank} — AI Рейтинги`,
    `${dev.fullName || dev.name}: ${dev.cases} кейсов для Топ-100 брендов России. Клиенты: ${dev.brands.join(', ')}. Тип: ${dev.type}.`,
    `https://airatings.ru/developer/${slug}`
  )}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "${dev.fullName || dev.name}",
    "url": "${dev.site}",
    "description": "Разработчик чат-ботов. ${dev.cases} кейсов для Топ-100 брендов России."
  }
  </script>
  <style>body{font-family:sans-serif;max-width:1200px;margin:0 auto;padding:20px}</style>
</head>
<body>
  <nav><a href="/">Рейтинг</a> / ${dev.fullName || dev.name}</nav>
  <h1>${dev.fullName || dev.name}</h1>
  <p>Место в рейтинге: #${rank} | Кейсов: ${dev.cases} | Тип: ${dev.type}</p>
  <p>Сайт: <a href="${dev.site}">${dev.site}</a></p>
  <h2>Бренды-клиенты</h2>
  <ul>${dev.brands.map(b => `<li>${b}</li>`).join('')}</ul>
</body>
</html>`;
}

// ============ ROUTES ============

// API endpoints
app.get('/api/developers', (req, res) => {
  res.json(developers);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============ PRODUCTION: STATIC + SSR ============
const distPath = path.join(__dirname, '..', 'dist');

if (fs.existsSync(distPath)) {
  // Serve static assets
  app.use(express.static(distPath, { index: false }));

  // All routes — check bot or serve SPA
  app.get('*', (req, res) => {
    const ua = req.headers['user-agent'];

    if (isBot(ua)) {
      // SSR for bots
      if (req.path.startsWith('/developer/')) {
        const slug = req.path.replace('/developer/', '');
        const html = renderDeveloperPage(slug);
        if (html) return res.send(html);
      }
      return res.send(renderRatingPage());
    }

    // SPA for humans
    const indexPath = path.join(distPath, 'index.html');
    let html = fs.readFileSync(indexPath, 'utf-8');

    // Inject Yandex Metrika
    const ymCode = process.env.YM_COUNTER_ID ? `
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   ym(${process.env.YM_COUNTER_ID}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/${process.env.YM_COUNTER_ID}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->` : '';

    html = html.replace('</head>', `${ymCode}\n</head>`);
    res.send(html);
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
