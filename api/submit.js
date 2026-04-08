const TG_TOKEN = '8532251052:AAGXsFa78-a4aX4MZIorOxA4XZbVoPC3bpA';
const CHAT_ID = '5635906137';

async function sendTelegram(text) {
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body;

    if (data.type === 'case') {
      const msg =
        `📋 <b>Новый кейс</b>\n\n` +
        `<b>Бренд:</b> ${data.brand || '—'}\n` +
        `<b>Бот:</b> ${data.botName || '—'}\n` +
        `<b>Разработчик:</b> ${data.developer || '—'}\n` +
        `<b>Сайт:</b> ${data.developerSite || '—'}\n` +
        `<b>Тип бота:</b> ${data.botType || '—'}\n` +
        `<b>Технология:</b> ${data.techType || '—'}\n` +
        `<b>Детали:</b> ${data.details || '—'}\n` +
        `<b>Источник:</b> ${data.source || '—'}\n\n` +
        `👤 <b>Контакт:</b> ${data.contactName || '—'}\n` +
        `📱 <b>Telegram:</b> ${data.contactTg || '—'}`;
      await sendTelegram(msg);
    }

    if (data.type === 'audit') {
      const msg =
        `🔍 <b>Заявка на аудит</b>\n\n` +
        `<b>Компания:</b> ${data.company || '—'}\n` +
        `<b>Отрасль:</b> ${data.industry || '—'}\n` +
        `<b>Задача:</b> ${data.task || '—'}\n` +
        `<b>Бюджет:</b> ${data.budget || '—'}\n` +
        `<b>Комментарий:</b> ${data.message || '—'}\n\n` +
        `👤 <b>Имя:</b> ${data.contactName || '—'}\n` +
        `📱 <b>Telegram:</b> ${data.contactTg || '—'}\n` +
        `📞 <b>Телефон:</b> ${data.contactPhone || '—'}`;
      await sendTelegram(msg);
    }

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' });
  }
}
