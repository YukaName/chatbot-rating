// Vercel Serverless Function — SSR for bots + SPA with Yandex Metrika for humans
import fs from 'fs';
import path from 'path';

const BOT_UA = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|facebookexternalhit|twitterbot|linkedinbot|pinterestbot|slackbot|telegrambot|whatsapp|applebot|petalbot|semrushbot|ahrefsbot|mj12bot|dotbot|rogerbot|screaming frog|gptbot|chatgpt|claudebot|anthropic|perplexity|bytespider/i;

const YM_ID = process.env.YM_COUNTER_ID;

// ============ DATA ============
const developers = [
  { slug: 'kts', name: 'KTS', fullName: 'KTS (кодовая разработка)', cases: 6, type: 'Код', site: 'https://kts.tech', brands: ['Сбер (СберКот)', 'VK Праздники', 'VK Video', 'Бургер Кинг', 'Самокат', 'Пятёрочка/X5'], description: 'Digital-продуктовая студия. Разработка PropTech-решений для застройщиков, веб-приложений, игровых механик, LMS и чат-ботов.' },
  { slug: 'just-ai', name: 'Just AI', fullName: 'Just AI (JAICP)', cases: 6, type: 'Код (JAICP)', site: 'https://just-ai.com', brands: ['Альфа-Банк', 'М.Видео', 'Совкомбанк', 'Ozon.travel', 'Мегафон (Вика)', 'DNS (NPS)'], description: 'Платформа для создания разговорного ИИ. JAICP — платформа для разработки чат-ботов корпоративного уровня.' },
  { slug: 'twin', name: 'TWIN', fullName: 'TWIN', cases: 5, type: 'Конструктор', site: 'https://twin24.ai', brands: ['Додо Пицца', 'Ростелеком', 'X5 Group (NPS)', '2ГИС', 'РЖД (ТрансТелеКом)'], description: 'Платформа голосовых и чат-ботов. Конструктор без кода с интеграцией в контакт-центры.' },
  { slug: 'nc-team', name: 'NC Team', fullName: 'NC Team (Smartbot Pro)', cases: 4, type: 'Конструктор', site: 'https://www.smartbotpro.ru', brands: ['Пятёрочка/X5', 'ВкусВилл', 'Flowwow', 'VK Маркет'], description: 'Проектный офис по разработке чат-ботов. С 2025 года развивают направление вайбкодинга.' },
  { slug: 'autofaq', name: 'AutoFAQ', fullName: 'AutoFAQ', cases: 4, type: 'Код', site: 'https://autofaq.ai', brands: ['МТС', 'Газпромбанк', 'Ростелеком', 'РУСАЛ'], description: 'ИИ-платформа для автоматизации клиентской поддержки.' },
  { slug: 'eora', name: 'EORA', fullName: 'EORA (zDialog)', cases: 3, type: 'Код', site: 'https://eora.ru', brands: ['Магнит', 'Додо Пицца', 'S7 Airlines'], description: 'Разработчик диалоговых ИИ-систем. Платформа zDialog.' },
  { slug: 'crt', name: 'ЦРТ', fullName: 'ЦРТ (ChatNavigator)', cases: 3, type: 'Код', site: 'https://www.speechpro.ru', brands: ['Билайн', 'T2/Tele2', 'Ростелеком'], description: 'Центр речевых технологий. ChatNavigator — платформа для текстовых и голосовых ботов.' },
  { slug: 'edna', name: 'edna', fullName: 'edna', cases: 2, type: 'Код', site: 'https://edna.ru', brands: ['М.Видео', 'Додо Пицца'], description: 'Платформа для коммуникаций через мессенджеры и чат-ботов.' },
  { slug: 'sberdevices', name: 'SberDevices', fullName: 'SberDevices', cases: 2, type: 'Код', site: 'https://developers.sber.ru', brands: ['Сбер', 'Альфа-Банк'], description: 'Подразделение Сбера. Платформа SaluteBot и семейство ассистентов Салют.' },
  { slug: 'bss', name: 'BSS', fullName: 'BSS (Digital2Speech)', cases: 1, type: 'Код (RAG)', site: 'https://bssys.com', brands: ['ПСБ (Катюша)'], description: 'Решения для цифрового банкинга. Digital2Speech с RAG-технологией.' },
  { slug: 'yandex-supportai', name: 'Яндекс SupportAI', fullName: 'Яндекс SupportAI', cases: 1, type: 'Код', site: 'https://cloud.yandex.ru/services/supportai', brands: ['Детский мир'], description: 'Облачный сервис Яндекса для автоматизации поддержки.' },
  { slug: 'voxys', name: 'Voxys', fullName: 'Voxys', cases: 1, type: 'Код', site: 'https://www.voxys.ru', brands: ['РЖД'], description: 'Решения для контакт-центров с ИИ-ботами.' },
  { slug: 'chatme', name: 'ChatMe.ai', fullName: 'ChatMe.ai', cases: 1, type: 'Конструктор', site: 'https://chatme.ai', brands: ['Дикси'], description: 'Конструктор чат-ботов с NLU.' },
  { slug: 'personik', name: 'Personik', fullName: 'Personik', cases: 1, type: 'Конструктор', site: 'https://personik.ai', brands: ['Газпром нефть'], description: 'Конструктор HR-ботов.' },
  { slug: 'nanosemantics', name: 'Наносемантика', fullName: 'Наносемантика (Dialog OS)', cases: 1, type: 'Код', site: 'https://nanosemantics.ai', brands: ['ВТБ'], description: 'Платформа Dialog OS для виртуальных ассистентов.' },
  { slug: 'stafory', name: 'Stafory', fullName: 'Stafory', cases: 1, type: 'Код', site: 'https://stafory.com', brands: ['Пятёрочка'], description: 'Робот-рекрутер Вера.' },
  { slug: 'okkam', name: 'Okkam MarTech', fullName: 'Okkam MarTech', cases: 1, type: 'Код', site: 'https://okkam.group', brands: ['Пятёрочка/X5'], description: 'MarTech-подразделение Okkam Group.' },
  { slug: 'webim', name: 'Webim', fullName: 'Webim', cases: 1, type: 'Код', site: 'https://webim.ru', brands: ['Ozon.travel'], description: 'Платформа для онлайн-консультирования.' },
  { slug: 'lia-chat', name: 'Lia.chat', fullName: 'Lia.chat', cases: 1, type: 'Код', site: 'https://lia.chat', brands: ['Додо Пицца'], description: 'ИИ-платформа для автоматизации поддержки.' },
  { slug: 'botcreators', name: 'BotCreators', fullName: 'BotCreators', cases: 1, type: 'Код', site: 'https://botcreators.ru', brands: ['Додо Пицца'], description: 'Студия маркетинговых чат-ботов.' },
  { slug: 'jetstyle', name: 'JetStyle', fullName: 'JetStyle', cases: 1, type: 'Код', site: 'https://jetstyle.ru', brands: ['Почта России'], description: 'Дизайн-студия и разработчик чат-ботов.' },
  { slug: 'kokoc-tech', name: 'Kokoc Tech', fullName: 'Kokoc Tech', cases: 1, type: 'Код', site: 'https://kokoc.tech', brands: ['Лента'], description: 'Разработчик Telegram-ботов для маркетинга.' },
  { slug: 'wehive', name: 'УЛЕЙ', fullName: 'УЛЕЙ (wehive)', cases: 1, type: 'Код', site: 'https://wehive.digital', brands: ['DNS'], description: 'Корпоративные HR-боты с интеграцией 1С.' },
  { slug: 'way2win', name: 'Way2Win Group', fullName: 'Way2Win Group', cases: 1, type: 'Код', site: 'https://way2win.ru', brands: ['Ростелеком'], description: 'Обучающие боты для отделов продаж.' },
  { slug: 'sherlock', name: 'Sherlock Platform', fullName: 'Sherlock Platform', cases: 1, type: 'Код', site: 'https://sherlock.im', brands: ['Золотое яблоко'], description: 'ИИ-боты с человекоподобными аватарами.' },
  { slug: 'salebot', name: 'SaleBot', fullName: 'SaleBot (конструктор)', cases: 1, type: 'Конструктор', site: 'https://salebot.pro', brands: ['Росатом/Гринатом'], description: 'Конструктор чат-ботов для продаж и геймификации.' },
  { slug: 'textback', name: 'TextBack', fullName: 'TextBack', cases: 1, type: 'Конструктор', site: 'https://textback.ru', brands: ['КАМАЗ'], description: 'Конструктор WhatsApp-ботов для B2B-продаж.' },
];

// ============ RENDER HELPERS ============
function escHtml(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function meta(title, desc, url) {
  return `<title>${escHtml(title)}</title>
<meta name="description" content="${escHtml(desc)}"/>
<link rel="canonical" href="${escHtml(url)}"/>
<meta property="og:title" content="${escHtml(title)}"/>
<meta property="og:description" content="${escHtml(desc)}"/>
<meta property="og:url" content="${escHtml(url)}"/>
<meta property="og:type" content="website"/>
<meta property="og:locale" content="ru_RU"/>
<meta property="og:site_name" content="AI Рейтинги"/>
<meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="${escHtml(title)}"/>
<meta name="twitter:description" content="${escHtml(desc)}"/>`;
}

function ymScript() {
  if (!YM_ID) return '';
  return `<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});</script><noscript><div><img src="https://mc.yandex.ru/watch/${YM_ID}" style="position:absolute;left:-9999px;" alt=""/></div></noscript>`;
}

function shell(headContent, bodyContent) {
  return `<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">${headContent}${ymScript()}<style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:1200px;margin:0 auto;padding:20px;color:#333;line-height:1.6}table{width:100%;border-collapse:collapse;margin:20px 0}th,td{padding:10px 14px;border:1px solid #e2e8f0;text-align:left}th{background:#f7fafc;font-weight:600}a{color:#6366f1}h1{font-size:28px;margin-bottom:8px}h2{font-size:22px;margin:24px 0 12px}.badge{display:inline-block;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:600;background:#f0f0ff;color:#6366f1;margin:2px}.nav{margin-bottom:24px;font-size:14px;color:#64748b}.card{border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:12px 0}.footer{border-top:1px solid #e2e8f0;margin-top:48px;padding-top:24px;font-size:13px;color:#64748b}</style></head><body>${bodyContent}<div class="footer"><p>AI Рейтинги — независимый проект <a href="https://aimap.am">AI Map</a> (Ереван, Армения)</p><p>ИП Леон Николаев, ՀՎՀՀ 28154419 | <a href="mailto:info@aimap.am">info@aimap.am</a> | <a href="tel:+37441041640">+374 41 041 640</a></p></div></body></html>`;
}

// ============ PAGE RENDERERS ============
function renderRating() {
  const sorted = [...developers].sort((a, b) => b.cases - a.cases);
  const rows = sorted.map((d, i) => `<tr><td>${i + 1}</td><td><a href="/developer/${d.slug}">${escHtml(d.fullName || d.name)}</a></td><td>${d.cases}</td><td>${escHtml(d.type)}</td><td>${d.brands.map(b => escHtml(b)).join(', ')}</td><td><a href="${escHtml(d.site)}">${escHtml(d.site)}</a></td></tr>`).join('');

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Рейтинги",
    "url": "https://devrating.ru/",
    "description": "Независимые рейтинги разработчиков чат-ботов, ИИ-решений и технологий для бизнеса в России",
    "inLanguage": "ru"
  });

  return shell(
    meta('Рейтинг разработчиков чат-ботов — AI Рейтинги', `Рейтинг ${sorted.length} компаний-разработчиков чат-ботов по количеству публичных кейсов для Топ-100 крупнейших брендов России (BrandLab 2025). ${sorted.slice(0, 5).map(d => d.name).join(', ')} и другие.`, 'https://devrating.ru/') + `<script type="application/ld+json">${jsonLd}</script>`,
    `<h1>Рейтинг разработчиков чат-ботов</h1>
<p>${sorted.length} компаний-разработчиков с публичными кейсами внедрения чат-ботов для брендов из <strong>Топ-100 крупнейших брендов России</strong> (BrandLab 2025).</p>
<table><thead><tr><th>#</th><th>Разработчик</th><th>Кейсы</th><th>Тип</th><th>Бренды</th><th>Сайт</th></tr></thead><tbody>${rows}</tbody></table>
<h2>О рейтинге</h2>
<p>Рейтинг основан на количестве публичных кейсов внедрения чат-ботов для компаний из списка «Топ-100 самых дорогих брендов России 2025» по версии BrandLab. Учитываются только подтверждённые кейсы с публичными источниками. Внутренние разработки компаний (in-house) не входят в рейтинг подрядчиков.</p>
<h2>Все разработчики</h2>
<ul>${sorted.map(d => `<li><a href="/developer/${d.slug}">${escHtml(d.fullName || d.name)}</a> — ${d.cases} кейсов (${d.brands.map(b=>escHtml(b)).join(', ')})</li>`).join('')}</ul>`
  );
}

function renderDeveloper(slug) {
  const dev = developers.find(d => d.slug === slug);
  if (!dev) return null;
  const rank = [...developers].sort((a, b) => b.cases - a.cases).findIndex(d => d.slug === slug) + 1;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": dev.fullName || dev.name,
    "url": dev.site,
    "description": dev.description
  });

  return shell(
    meta(
      `${dev.fullName || dev.name} — Разработчик чат-ботов #${rank} — AI Рейтинги`,
      `${dev.fullName || dev.name}: ${dev.cases} кейсов для Топ-100 брендов России. Клиенты: ${dev.brands.join(', ')}. ${dev.description}`,
      `https://devrating.ru/developer/${slug}`
    ) + `<script type="application/ld+json">${jsonLd}</script>`,
    `<div class="nav"><a href="/">AI Рейтинги</a> / <a href="/">Рейтинг</a> / ${escHtml(dev.fullName || dev.name)}</div>
<h1>${escHtml(dev.fullName || dev.name)}</h1>
<p><span class="badge">#${rank} в рейтинге</span> <span class="badge">${dev.cases} кейсов</span> <span class="badge">${escHtml(dev.type)}</span></p>
<p>${escHtml(dev.description)}</p>
<p>Сайт: <a href="${escHtml(dev.site)}">${escHtml(dev.site)}</a></p>
<h2>Бренды-клиенты</h2>
<ul>${dev.brands.map(b => `<li>${escHtml(b)}</li>`).join('')}</ul>
<p><a href="/">← Вернуться к рейтингу</a></p>`
  );
}

function renderCases() {
  return shell(
    meta('Кейсы внедрения чат-ботов — AI Рейтинги', '81 кейс внедрения чат-ботов для компаний из Топ-100 крупнейших брендов России: Сбер, Яндекс, ВТБ, Wildberries, Т-Банк, РЖД, Ozon, МТС и другие.', 'https://devrating.ru/cases'),
    `<div class="nav"><a href="/">AI Рейтинги</a> / Кейсы</div>
<h1>Кейсы внедрения чат-ботов</h1>
<p>81 кейс внедрения для компаний из Топ-100 крупнейших брендов России (BrandLab 2025).</p>
<p>Перейдите на <a href="/">главную страницу</a> для интерактивного просмотра с фильтрами и поиском.</p>
<h2>Разработчики с наибольшим числом кейсов</h2>
<ul>${[...developers].sort((a,b) => b.cases - a.cases).map(d => `<li><a href="/developer/${d.slug}">${escHtml(d.name)}</a> — ${d.cases} кейсов: ${d.brands.map(b=>escHtml(b)).join(', ')}</li>`).join('')}</ul>`
  );
}

function renderAbout() {
  return shell(
    meta('О проекте — AI Рейтинги', 'AI Рейтинги — независимый проект армянской компании AI Map. Рейтинги разработчиков чат-ботов, ИИ-решений и технологий для бизнеса в России.', 'https://devrating.ru/about'),
    `<div class="nav"><a href="/">AI Рейтинги</a> / О проекте</div>
<h1>О проекте AI Рейтинги</h1>
<h2>Разработчик рейтинга — AI Map</h2>
<p>AI Map — армянская компания (Ереван), специализирующаяся на аналитике рынка ИИ и технологий. Мы не работаем на российском рынке как подрядчики, но хорошо знакомы с его экосистемой. Это позволяет нам составлять объективные и независимые рейтинги.</p>
<p>Сайт: <a href="https://aimap.am">aimap.am</a> | Email: <a href="mailto:info@aimap.am">info@aimap.am</a> | Тел: <a href="tel:+37441041640">+374 41 041 640</a></p>
<h2>Методология</h2>
<ul>
<li>Источник списка брендов — BrandLab «Топ-100 самых дорогих брендов России 2025»</li>
<li>Учитываются только кейсы с публичным подтверждением (ссылка на источник)</li>
<li>Внутренние разработки компаний (in-house) не входят в рейтинг подрядчиков</li>
<li>Один бренд может иметь несколько кейсов от разных разработчиков</li>
</ul>
<p><a href="/">← Вернуться к рейтингу</a></p>`
  );
}

// ============ HANDLER ============
export default function handler(req, res) {
  const ua = req.headers['user-agent'] || '';
  const p = req.url.replace(/\?.*$/, '');

  // Always serve SSR to bots
  if (BOT_UA.test(ua)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (p.startsWith('/developer/')) {
      const slug = p.replace('/developer/', '').replace(/\/$/, '');
      const html = renderDeveloper(slug);
      if (html) return res.status(200).send(html);
    }
    if (p === '/cases') return res.status(200).send(renderCases());
    if (p === '/about') return res.status(200).send(renderAbout());
    return res.status(200).send(renderRating());
  }

  // For humans — read dist/index.html and inject YM
  try {
    const distDir = path.join(process.cwd(), 'dist');
    const indexPath = path.join(distDir, 'index.html');
    let html = fs.readFileSync(indexPath, 'utf-8');
    if (YM_ID) {
      html = html.replace('</head>', ymScript() + '</head>');
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch {
    // Fallback: redirect to root (static file)
    res.writeHead(302, { Location: '/' });
    res.end();
  }
}
