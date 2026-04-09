import React, { useState, useEffect, useMemo } from 'react';
import { developers, getDeveloperBySlug } from './data/developers';
import { cases, getCasesByDeveloper, industries, botTypes, brands } from './data/cases';
import { chatbotSaas, getSaasBySlug, INTEGRATIONS } from './data/chatbot-saas';
import { omnichannelPlatforms } from './data/omnichannel';

// ============ THEME ============
const THEME = {
  bg: '#0a0d1a',
  bgCard: '#131729',
  bgCardHover: '#1a1f36',
  border: '#1e2440',
  borderLight: '#2a3050',
  accent: '#6366f1',
  accentLight: '#818cf8',
  accentBg: 'rgba(99,102,241,0.1)',
  text: '#e2e8f0',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  gold: '#fbbf24',
  silver: '#94a3b8',
  bronze: '#cd7f32',
};

// ============ STYLES ============
const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${THEME.bg};
    color: ${THEME.text};
    line-height: 1.6;
    min-height: 100vh;
  }
  a { color: ${THEME.accentLight}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  ::selection { background: ${THEME.accent}; color: white; }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: ${THEME.bg}; }
  ::-webkit-scrollbar-thumb { background: ${THEME.borderLight}; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: ${THEME.textMuted}; }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .hero-stats { flex-direction: column; align-items: stretch; }
    .audit-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .col-brands, .col-site, .col-type { display: none !important; }
    .hero-section { padding: 32px 20px !important; }
    .hero-section h1 { font-size: 24px !important; }
  }
  @media (max-width: 480px) {
    .footer-grid { grid-template-columns: 1fr !important; }
  }
`;

// ============ INTEGRATION ICONS ============
const IntIcon = ({ type, size = 16 }) => {
  const s = { width: size, height: size, fill: 'currentColor', flexShrink: 0 };
  switch (type) {
    case 'tg': return <svg viewBox="0 0 24 24" style={s}><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.84.42z"/></svg>;
    case 'vk': return <svg viewBox="0 0 24 24" style={s}><path d="M21.57 7.2s.16-.53 0-.73c-.18-.22-.72-.16-.72-.16h-2.44s-.18-.02-.31.06c-.13.07-.21.24-.21.24s-.38.99-.88 1.83c-1.07 1.79-1.5 1.88-1.67 1.77-.41-.25-.3-1.03-.3-1.58 0-1.72.26-2.44-.5-2.62-.26-.06-.44-.1-1.1-.1-.83 0-1.54 0-1.93.19-.27.13-.47.43-.35.45.16.02.52.1.71.35.25.33.24 1.07.24 1.07s.14 2.02-.33 2.27c-.33.17-.77-.18-1.72-1.77-.5-.82-.88-1.72-.88-1.72s-.07-.17-.2-.26c-.15-.1-.36-.14-.36-.14l-2.05.01s-.3.01-.41.14c-.1.12-.01.37-.01.37s1.67 3.9 3.55 5.87c1.73 1.8 3.69 1.68 3.69 1.68h.89s.27-.03.4-.17c.13-.14.12-.38.12-.38s-.02-1.17.52-1.34c.53-.17 1.22 1.12 1.95 1.61.55.38.97.3.97.3l1.95-.03s1.02-.06.54-.84c-.04-.06-.28-.59-1.43-1.67-1.21-1.14-1.05-.95.41-2.92.89-1.2 1.24-1.93 1.13-2.24z"/></svg>;
    case 'wa': return <svg viewBox="0 0 24 24" style={s}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 13.97c-.24.68-1.41 1.3-1.95 1.38-.5.07-1.13.1-1.83-.11-.42-.13-.96-.32-1.65-.63-2.9-1.26-4.79-4.18-4.93-4.37-.14-.2-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.65.49.24.57.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.3.3-.13.59.17.29.76 1.25 1.63 2.03 1.12.99 2.07 1.3 2.36 1.44.29.14.46.12.63-.07.17-.2.73-.85.93-1.14.2-.29.39-.24.66-.14.27.1 1.7.8 1.99.95.29.14.49.22.56.34.07.12.07.7-.17 1.37z"/></svg>;
    case 'ig': return <svg viewBox="0 0 24 24" style={s}><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.37-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.78.3-1.45.71-2.11 1.37S.93 3.36.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.78.71 1.45 1.37 2.11s1.33 1.07 2.11 1.37c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.78-.3 1.45-.71 2.11-1.37s1.07-1.33 1.37-2.11c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 00-1.37-2.11A5.88 5.88 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>;
    case 'fb': return <svg viewBox="0 0 24 24" style={s}><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.87v2.26h3.32l-.53 3.49h-2.8v8.44C19.61 23.09 24 18.09 24 12.07z"/></svg>;
    case 'avito': return <svg viewBox="0 0 24 24" style={s}><path d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm8 4.5l5 11h-2.4l-1.1-2.5H10.5L9.4 17.5H7l5-11zm0 3.2L10.4 13h3.2L12 9.7z"/></svg>;
    case 'widget': return <svg viewBox="0 0 24 24" style={s}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>;
    case 'max': return <svg viewBox="0 0 24 24" style={s}><path d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm1.5 5h2.2l2.3 4.5L12.3 7h2.2l-3.5 6.2V17h-2v-3.8L5.5 7zm8.5 0h2l1.5 3.8L19 7h2l-2.5 5.5V17h-2v-4.5L14 7z"/></svg>;
    case 'webapp': return <svg viewBox="0 0 24 24" style={s}><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 4v10h16V8H4zm2 2h4v2H6v-2zm6 0h6v2h-6v-2zm-6 4h3v2H6v-2z"/></svg>;
    case 'ozon': return <svg viewBox="0 0 24 24" style={s}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>;
    case 'wb': return <svg viewBox="0 0 24 24" style={s}><path d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm2.5 5h2l1.5 6 1.5-6h2l1.5 6 1.5-6h2l-2.5 10h-2L12 11l-1.5 6h-2L6.5 7z"/></svg>;
    case 'ai': return <svg viewBox="0 0 24 24" style={s}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>;
    default: return null;
  }
};

// ============ ROUTER ============
function useHashRouter() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo(0, 0);
}

// ============ HELPER COMPONENTS ============
function Badge({ children, color = THEME.accent, bg }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: 12,
      fontSize: 12, fontWeight: 600, color,
      background: bg || `${color}18`, border: `1px solid ${color}30`,
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

function Card({ children, style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: THEME.bgCard, border: `1px solid ${THEME.border}`,
      borderRadius: 12, padding: 24, transition: 'all 0.2s',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }} onMouseEnter={e => {
      e.currentTarget.style.background = THEME.bgCardHover;
      e.currentTarget.style.borderColor = THEME.borderLight;
    }} onMouseLeave={e => {
      e.currentTarget.style.background = THEME.bgCard;
      e.currentTarget.style.borderColor = THEME.border;
    }}>{children}</div>
  );
}

function MedalIcon({ place }) {
  if (place === 1) return <span style={{ fontSize: 20 }}>🥇</span>;
  if (place === 2) return <span style={{ fontSize: 20 }}>🥈</span>;
  if (place === 3) return <span style={{ fontSize: 20 }}>🥉</span>;
  return <span style={{ color: THEME.textMuted, fontWeight: 600, fontSize: 14 }}>#{place}</span>;
}

function ExternalLink({ href, children }) {
  if (!href) return <span style={{ color: THEME.textMuted }}>—</span>;
  return <a href={href} target="_blank" rel="noopener noreferrer">{children || href}</a>;
}

function StatBox({ label, value, color }) {
  return (
    <div style={{
      background: THEME.bg, borderRadius: 8, padding: '12px 16px',
      border: `1px solid ${THEME.border}`, textAlign: 'center', flex: '1 1 120px',
    }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: color || THEME.accent }}>{value}</div>
      <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Breadcrumb({ items }) {
  return (
    <nav style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 16 }}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span style={{ margin: '0 6px' }}>/</span>}
          {item.href ? (
            <a href={item.href} style={{ color: THEME.textMuted }}
              onMouseEnter={e => e.target.style.color = THEME.accentLight}
              onMouseLeave={e => e.target.style.color = THEME.textMuted}
            >{item.label}</a>
          ) : (
            <span style={{ color: THEME.textSecondary }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ============ FORM STYLES ============
const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 14,
  border: `1px solid ${THEME.border}`, background: THEME.bg,
  color: THEME.text, outline: 'none', transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 600, color: THEME.textSecondary,
  marginBottom: 6,
};

const btnPrimary = {
  padding: '12px 32px', borderRadius: 8, fontSize: 15, fontWeight: 600,
  border: 'none', background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.accentLight})`,
  color: 'white', cursor: 'pointer', transition: 'opacity 0.2s',
};

// ============ HEADER ============
function Header() {
  const hash = window.location.hash || '#/';
  const links = [
    { label: 'Рейтинг', href: '#/' },
    { label: 'Конструкторы', href: '#/chatbot' },
    { label: 'Чат-платформы', href: '#/omnichannel-chat' },
    { label: 'Кейсы', href: '#/cases' },
    { label: 'Аудит', href: '#/audit' },
    { label: 'О проекте', href: '#/about' },
  ];
  return (
    <header style={{
      background: `linear-gradient(180deg, ${THEME.bgCard} 0%, ${THEME.bg} 100%)`,
      borderBottom: `1px solid ${THEME.border}`,
      padding: '0 16px', position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', height: 56,
        gap: 8,
      }}>
        <a href="#/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', color: THEME.text, flexShrink: 0,
        }}>
          <span style={{
            fontSize: 22, fontWeight: 800,
            background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.accentLight})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>AI</span>
          <span style={{ fontSize: 16, fontWeight: 600 }}>Рейтинги</span>
        </a>
        <nav style={{ display: 'flex', gap: 2, overflow: 'auto' }}>
          {links.map(link => {
            const active = hash === link.href || (link.href === '#/' && (hash === '' || hash === '#/'));
            return (
              <a key={link.href} href={link.href} style={{
                padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                color: active ? THEME.accentLight : THEME.textSecondary,
                background: active ? THEME.accentBg : 'transparent',
                textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>{link.label}</a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${THEME.border}`,
      padding: '48px 24px 32px', marginTop: 64,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Main footer */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{
                fontSize: 20, fontWeight: 800,
                background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.accentLight})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>AI</span>
              <span style={{ fontSize: 16, fontWeight: 600 }}>Рейтинги</span>
            </div>
            <div style={{ fontSize: 13, color: THEME.textMuted, lineHeight: 1.8 }}>
              Независимые рейтинги разработчиков<br />
              ИИ и технологий в России.<br />
              Данные из открытых источников.
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textSecondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Навигация</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a href="#/" style={{ fontSize: 13, color: THEME.textMuted, textDecoration: 'none' }}>Рейтинг разработчиков</a>
              <a href="#/cases" style={{ fontSize: 13, color: THEME.textMuted, textDecoration: 'none' }}>Кейсы внедрения</a>
              <a href="#/submit" style={{ fontSize: 13, color: THEME.textMuted, textDecoration: 'none' }}>Добавить кейс</a>
              <a href="#/audit" style={{ fontSize: 13, color: THEME.textMuted, textDecoration: 'none' }}>Аудит и подбор решения</a>
              <a href="#/about" style={{ fontSize: 13, color: THEME.textMuted, textDecoration: 'none' }}>О проекте</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textSecondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Разработчик рейтинга</div>
            <a href="https://aimap.am" target="_blank" rel="noopener noreferrer" style={{
              fontSize: 18, fontWeight: 700, color: THEME.accentLight, textDecoration: 'none',
              display: 'block', marginBottom: 8,
            }}>AI Map</a>
            <div style={{ fontSize: 12, color: THEME.textMuted, lineHeight: 1.8 }}>
              Ереван, Армения<br />
              пр. Саят-Новы, 40 (Fabula Coworking)
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textSecondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Контакты</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a href="mailto:info@aimap.am" style={{ fontSize: 13, color: THEME.textMuted, textDecoration: 'none' }}>info@aimap.am</a>
              <a href="tel:+37441041640" style={{ fontSize: 13, color: THEME.textMuted, textDecoration: 'none' }}>+374 41 041 640</a>
              <a href="https://t.me/aimap_sla" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: THEME.textMuted, textDecoration: 'none' }}>Telegram: @aimap_sla</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: `1px solid ${THEME.border}`, paddingTop: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontSize: 12, color: THEME.textMuted }}>
            {'\u00A9'} {new Date().getFullYear()} AI Map (ИП Леон Николаев). ՀՎՀՀ 28154419
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#/privacy" style={{ fontSize: 12, color: THEME.textMuted, textDecoration: 'none' }}>Политика обработки данных</a>
            <a href="https://aimap.am" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: THEME.textMuted, textDecoration: 'none' }}>aimap.am</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ RATING PAGE ============
function RatingPage() {
  const [sortBy, setSortBy] = useState('cases');
  const [filterType, setFilterType] = useState('all');

  const sorted = useMemo(() => {
    if (filterType === 'inhouse') return []; // handled separately
    let list = [...developers];
    if (filterType === 'code') list = list.filter(d => !d.type.includes('Конструктор'));
    else if (filterType === 'nocode') list = list.filter(d => d.type.includes('Конструктор'));

    if (sortBy === 'cases') list.sort((a, b) => b.cases - a.cases);
    else if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    return list;
  }, [sortBy, filterType]);

  // In-house: brands that built bots themselves, ranked by number of in-house cases
  const inhouseBrands = useMemo(() => {
    const map = {};
    cases.filter(c => !c.developerSlug).forEach(c => {
      if (!map[c.brand]) map[c.brand] = { brand: c.brand, industry: c.industry, brandRank: c.brandRank, cases: [], count: 0 };
      map[c.brand].cases.push(c);
      map[c.brand].count++;
    });
    return Object.values(map).sort((a, b) => b.count - a.count || a.brandRank - b.brandRank);
  }, []);

  const totalCases = cases.length;
  const totalBrands = 100; // Топ-100 брендов России

  return (
    <div>
      {/* Hero */}
      <div className="hero-section" style={{
        background: `linear-gradient(135deg, ${THEME.bgCard} 0%, ${THEME.bg} 100%)`,
        border: `1px solid ${THEME.border}`, borderRadius: 16,
        padding: '48px 32px', marginBottom: 32, textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
          Рейтинг разработчиков чат-ботов
        </h1>
        <p style={{ fontSize: 16, color: THEME.textSecondary, maxWidth: 700, margin: '0 auto 24px' }}>
          Рейтинг компаний по количеству публичных кейсов внедрения чат-ботов
          для брендов из <strong style={{ color: THEME.text }}>Топ-100 крупнейших брендов России</strong> (BrandLab 2025)
        </p>
        <div className="hero-stats" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <StatBox label="Разработчиков" value={developers.length} />
          <StatBox label="Кейсов" value={totalCases} color={THEME.success} />
          <StatBox label="Брендов" value={totalBrands} color={THEME.warning} />
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { key: 'all', label: 'Все' },
            { key: 'code', label: 'Code' },
            { key: 'nocode', label: 'No-Code' },
            { key: 'inhouse', label: 'Внутренняя' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilterType(f.key)} style={{
              padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
              border: `1px solid ${filterType === f.key ? THEME.accent : THEME.border}`,
              background: filterType === f.key ? THEME.accentBg : 'transparent',
              color: filterType === f.key ? THEME.accentLight : THEME.textSecondary,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>{f.label}</button>
          ))}
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
          padding: '6px 12px', borderRadius: 8, fontSize: 13,
          border: `1px solid ${THEME.border}`, background: THEME.bgCard,
          color: THEME.textSecondary, cursor: 'pointer',
        }}>
          <option value="cases">По кейсам</option>
          <option value="name">По имени</option>
        </select>
      </div>

      {/* Rating Table or In-house */}
      {filterType === 'inhouse' ? (
        <>
          <div style={{ marginBottom: 16, fontSize: 14, color: THEME.textSecondary }}>
            Бренды из Топ-100, которые разработали чат-ботов силами собственных команд
          </div>
          <div className="rating-table-wrap" style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${THEME.border}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: THEME.bgCard }}>
                  <th style={thStyle}>#</th>
                  <th style={{ ...thStyle, textAlign: 'left' }}>Бренд</th>
                  <th style={thStyle}>Ботов</th>
                  <th className="col-type" style={{ ...thStyle, textAlign: 'left' }}>Отрасль</th>
                  <th className="col-brands" style={{ ...thStyle, textAlign: 'left' }}>Проекты</th>
                </tr>
              </thead>
              <tbody>
                {inhouseBrands.map((b, i) => (
                  <tr key={b.brand}
                    style={{
                      background: i % 2 === 0 ? 'transparent' : `${THEME.bgCard}60`,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = THEME.accentBg}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : `${THEME.bgCard}60`}
                  >
                    <td style={{ ...tdStyle, textAlign: 'center', width: 50 }}>
                      <MedalIcon place={i + 1} />
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>
                      <div>{b.brand}</div>
                      <div style={{ fontSize: 12, color: THEME.textMuted, fontWeight: 400 }}>
                        #{b.brandRank} в Топ-100
                      </div>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block', padding: '4px 12px', borderRadius: 8,
                        fontSize: 16, fontWeight: 700,
                        color: b.count >= 3 ? THEME.success : b.count >= 2 ? THEME.warning : THEME.textSecondary,
                        background: b.count >= 3 ? `${THEME.success}15` : b.count >= 2 ? `${THEME.warning}15` : 'transparent',
                      }}>{b.count}</span>
                    </td>
                    <td className="col-type" style={{ ...tdStyle, fontSize: 13, color: THEME.textSecondary }}>
                      {b.industry}
                    </td>
                    <td className="col-brands" style={{ ...tdStyle, fontSize: 13, color: THEME.textSecondary }}>
                      {b.cases.map(c => c.botName).join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="rating-table-wrap" style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${THEME.border}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: THEME.bgCard }}>
                <th style={thStyle}>#</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Разработчик</th>
                <th style={thStyle}>Кейсы</th>
                <th className="col-type" style={{ ...thStyle, textAlign: 'left' }}>Тип</th>
                <th className="col-brands" style={{ ...thStyle, textAlign: 'left', minWidth: 200 }}>Бренды</th>
                <th className="col-site" style={thStyle}>Сайт</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((dev, i) => (
                <tr key={dev.id}
                  style={{
                    background: i % 2 === 0 ? 'transparent' : `${THEME.bgCard}60`,
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onClick={() => navigate(`/developer/${dev.slug}`)}
                  onMouseEnter={e => e.currentTarget.style.background = THEME.accentBg}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : `${THEME.bgCard}60`}
                >
                  <td style={{ ...tdStyle, textAlign: 'center', width: 50 }}>
                    <MedalIcon place={i + 1} />
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>
                    <div>{dev.name}</div>
                    {dev.name !== dev.fullName && (
                      <div style={{ fontSize: 12, color: THEME.textMuted, fontWeight: 400 }}>
                        {dev.fullName}
                      </div>
                    )}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block', padding: '4px 12px', borderRadius: 8,
                      fontSize: 16, fontWeight: 700,
                      color: dev.cases >= 4 ? THEME.success : dev.cases >= 2 ? THEME.warning : THEME.textSecondary,
                      background: dev.cases >= 4 ? `${THEME.success}15` : dev.cases >= 2 ? `${THEME.warning}15` : 'transparent',
                    }}>{dev.cases}</span>
                  </td>
                  <td className="col-type" style={tdStyle}>
                    <Badge color={dev.type.includes('Конструктор') ? THEME.warning : THEME.accent}>
                      {dev.type.includes('Конструктор') ? 'No-Code' : 'Code'}
                    </Badge>
                  </td>
                  <td className="col-brands" style={{ ...tdStyle, fontSize: 13, color: THEME.textSecondary }}>
                    {dev.brands.slice(0, 3).join(', ')}
                    {dev.brands.length > 3 && ` +${dev.brands.length - 3}`}
                  </td>
                  <td className="col-site" style={{ ...tdStyle, textAlign: 'center' }}>
                    <a href={dev.site} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ fontSize: 13 }}>
                      {new URL(dev.site).hostname.replace('www.', '')}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SEO text */}
      <div style={{ marginTop: 48, padding: 32, background: THEME.bgCard, borderRadius: 12, border: `1px solid ${THEME.border}` }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>О рейтинге разработчиков чат-ботов</h2>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8 }}>
          Рейтинг основан на количестве публичных кейсов внедрения чат-ботов для компаний из списка
          «Топ-100 самых дорогих брендов России 2025» по версии BrandLab. Учитываются только подтверждённые
          кейсы с публичными источниками. Рейтинг включает как компании, разрабатывающие ботов на заказ (Code),
          так и платформы-конструкторы (No-Code). Внутренние разработки компаний (in-house)
          выделены в отдельную вкладку.
        </p>
      </div>
    </div>
  );
}

// ============ CASES PAGE ============
function CasesPage() {
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('developer');

  // Build developer rank map for sorting
  const devRankMap = useMemo(() => {
    const sorted = [...developers].sort((a, b) => b.cases - a.cases);
    const map = {};
    sorted.forEach((d, i) => { map[d.slug] = i + 1; });
    return map;
  }, []);

  const filtered = useMemo(() => {
    let list = [...cases];
    if (filterIndustry !== 'all') list = list.filter(c => c.industry === filterIndustry);
    if (filterType !== 'all') list = list.filter(c => c.botType === filterType);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.brand.toLowerCase().includes(q) ||
        c.botName.toLowerCase().includes(q) ||
        c.developer.toLowerCase().includes(q) ||
        c.details.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'developer') {
      list.sort((a, b) => {
        const rankA = a.developerSlug ? (devRankMap[a.developerSlug] || 999) : 1000;
        const rankB = b.developerSlug ? (devRankMap[b.developerSlug] || 999) : 1000;
        return rankA - rankB || a.brandRank - b.brandRank;
      });
    } else {
      list.sort((a, b) => a.brandRank - b.brandRank);
    }
    return list;
  }, [filterIndustry, filterType, search, sortBy, devRankMap]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Кейсы чат-ботов</h1>
          <p style={{ color: THEME.textSecondary }}>
            {cases.length} кейсов внедрения для компаний из Топ-100 крупнейших брендов России
          </p>
        </div>
        <a href="#/submit" style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600,
          border: `1px solid ${THEME.accent}`, color: THEME.accentLight,
          background: THEME.accentBg, textDecoration: 'none', whiteSpace: 'nowrap',
        }}>+ Добавить кейс</a>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center',
      }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по бренду, боту, разработчику..."
          style={{
            padding: '10px 16px', borderRadius: 8, fontSize: 14, flex: '1 1 200px', minWidth: 0,
            border: `1px solid ${THEME.border}`, background: THEME.bgCard,
            color: THEME.text, outline: 'none',
          }}
        />
        <select value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)} style={{ ...selectStyle, flex: '0 1 auto', minWidth: 0 }}>
          <option value="all">Все отрасли</option>
          {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ ...selectStyle, flex: '0 1 auto', minWidth: 0 }}>
          <option value="all">Все типы ботов</option>
          {botTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 13, color: THEME.textMuted }}>
          Найдено: {filtered.length} кейсов
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
          <option value="developer">По рейтингу разработчика</option>
          <option value="brand">По позиции бренда</option>
        </select>
      </div>

      {/* Cases Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', gap: 16 }}>
        {filtered.map((c, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 13, color: THEME.textMuted }}>#{c.brandRank} в Топ-100</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{c.brand}</h3>
              </div>
              <Badge color={THEME.textMuted}>{c.industry}</Badge>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: THEME.accentLight, marginBottom: 8 }}>
              {c.botName}
            </div>
            <div style={{ fontSize: 13, color: THEME.textSecondary, marginBottom: 12, lineHeight: 1.6 }}>
              {c.details}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
              <Badge>{c.botType}</Badge>
              <Badge color={c.techType.includes('Конструктор') ? THEME.warning : THEME.accent}>
                {c.techType.includes('Конструктор') ? 'No-Code' : 'Code'}
              </Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, flexWrap: 'wrap', gap: 4 }}>
              <span>
                {c.developerSlug ? (
                  <><a href={`#/developer/${c.developerSlug}`} style={{ fontWeight: 600 }}>{c.developer}</a>
                  <span style={{ color: THEME.textMuted }}> #{devRankMap[c.developerSlug]} в рейтинге</span></>
                ) : (
                  <span style={{ color: THEME.textMuted }}>{c.developer}</span>
                )}
              </span>
              {c.source && (
                <a href={c.source} target="_blank" rel="noopener noreferrer"
                  style={{ color: THEME.textMuted, fontSize: 12 }}>
                  Источник
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ============ DEVELOPER PAGE ============
function DeveloperPage({ slug }) {
  const dev = getDeveloperBySlug(slug);
  if (!dev) return <div style={{ textAlign: 'center', padding: 64 }}><h2>Разработчик не найден</h2><a href="#/">Вернуться к рейтингу</a></div>;

  const devCases = getCasesByDeveloper(slug);
  const rank = [...developers].sort((a, b) => b.cases - a.cases).findIndex(d => d.id === dev.id) + 1;

  // Calculate category rank (Code or Constructor)
  const isConstructor = dev.type.includes('Конструктор');
  const codeDevs = [...developers].filter(d => !d.type.includes('Конструктор')).sort((a, b) => b.cases - a.cases);
  const constructorDevs = [...developers].filter(d => d.type.includes('Конструктор')).sort((a, b) => b.cases - a.cases);
  const codeRank = codeDevs.findIndex(d => d.id === dev.id) + 1;
  const constructorRank = constructorDevs.findIndex(d => d.id === dev.id) + 1;

  // Pick the best category rank
  let categoryRank, categoryLabel, categoryColor;
  if (isConstructor) {
    categoryRank = constructorRank;
    categoryLabel = `Топ No-Code`;
    categoryColor = THEME.warning;
  } else {
    categoryRank = codeRank;
    categoryLabel = `Топ Code`;
    categoryColor = THEME.accent;
  }

  return (
    <div>
      <Breadcrumb items={[
        { label: 'Рейтинг', href: '#/' },
        { label: dev.name },
      ]} />

      {/* Developer Header */}
      <div style={{
        background: THEME.bgCard, border: `1px solid ${THEME.border}`, borderRadius: 16,
        padding: 32, marginBottom: 32,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800 }}>{dev.name}</h1>
              <Badge color={isConstructor ? THEME.warning : THEME.accent}>
                {isConstructor ? 'No-Code' : 'Code'}
              </Badge>
            </div>
            {dev.name !== dev.fullName && (
              <div style={{ fontSize: 14, color: THEME.textMuted, marginBottom: 8 }}>{dev.fullName}</div>
            )}
            <p style={{ fontSize: 14, color: THEME.textSecondary, maxWidth: 600, marginBottom: 16 }}>
              {dev.description}
            </p>
            <ExternalLink href={dev.site}>{dev.site}</ExternalLink>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <StatBox label="Общий рейтинг" value={`#${rank}`} color={rank <= 3 ? THEME.gold : THEME.accent} />
            <StatBox label={categoryLabel} value={`#${categoryRank}`} color={categoryColor} />
            <StatBox label="Кейсов" value={dev.cases} color={THEME.success} />
          </div>
        </div>
      </div>

      {/* Brands */}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Бренды-клиенты</h2>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        {dev.brands.map(b => (
          <span key={b} style={{
            padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
            background: THEME.bgCard, border: `1px solid ${THEME.border}`,
          }}>{b}</span>
        ))}
      </div>

      {/* Cases */}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Кейсы ({devCases.length})</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        {devCases.map((c, i) => (
          <Card key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 13, color: THEME.textMuted }}>#{c.brandRank} в Топ-100 • {c.industry}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>
                  {c.brand} — {c.botName}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Badge>{c.botType}</Badge>
              </div>
            </div>
            <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.6, marginBottom: 12 }}>
              {c.details}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge color={c.techType.includes('Конструктор') ? THEME.warning : THEME.accent}>
                {c.techType.replace(/Конструктор/g, 'No-Code')}
              </Badge>
              {c.source && <ExternalLink href={c.source}>Источник</ExternalLink>}
            </div>
          </Card>
        ))}
      </div>

      {/* JSON-LD for developer */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": dev.fullName,
        "url": dev.site,
        "description": dev.description,
        "knowsAbout": ["chatbot development", "AI", "NLP"],
      })}} />
    </div>
  );
}

// ============ SUBMIT CASE PAGE ============
function SubmitCasePage() {
  const [form, setForm] = useState({
    brand: '', botName: '', developer: '', developerSite: '',
    botType: '', techType: '', details: '', source: '',
    contactName: '', contactTg: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [sending, setSending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const r = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'case', ...form }),
      });
      if (r.ok) setSubmitted(true);
    } catch { alert('Ошибка отправки. Попробуйте позже.'); }
    setSending(false);
  };

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '64px 0' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Спасибо!</h2>
        <p style={{ fontSize: 14, color: THEME.textSecondary, marginBottom: 24 }}>
          Ваш кейс отправлен на рассмотрение. Мы проверим данные и добавим его в рейтинг.
        </p>
        <button onClick={() => { setSubmitted(false); setForm({ brand: '', botName: '', developer: '', developerSite: '', botType: '', techType: '', details: '', source: '', contactName: '', contactTg: '' }); }}
          style={{ ...btnPrimary, background: THEME.bgCard, border: `1px solid ${THEME.border}`, color: THEME.textSecondary }}>
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Добавить кейс</h1>
      <p style={{ color: THEME.textSecondary, marginBottom: 32 }}>
        Мы что-то упустили? Расскажите нам о кейсе внедрения чат-бота, и мы добавим его в рейтинг после проверки.
      </p>

      <form onSubmit={handleSubmit}>
        <Card style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Информация о кейсе</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Бренд / Компания *</label>
              <input required value={form.brand} onChange={update('brand')} placeholder="Например: Сбер" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Название бота *</label>
              <input required value={form.botName} onChange={update('botName')} placeholder="Например: Салют" style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Разработчик *</label>
              <input required value={form.developer} onChange={update('developer')} placeholder="Название компании-разработчика" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Сайт разработчика</label>
              <input value={form.developerSite} onChange={update('developerSite')} placeholder="https://..." style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Тип бота</label>
              <select value={form.botType} onChange={update('botType')} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Выберите тип</option>
                <option value="Поддержка клиентов">Поддержка клиентов</option>
                <option value="HR">HR / Найм</option>
                <option value="Продажи">Продажи</option>
                <option value="Маркетинг">Маркетинг / Геймификация</option>
                <option value="Голосовой ассистент">Голосовой ассистент</option>
                <option value="Внутренний">Внутренний / Корпоративный</option>
                <option value="B2B">B2B</option>
                <option value="Другое">Другое</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Технология</label>
              <select value={form.techType} onChange={update('techType')} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Выберите тип</option>
                <option value="Код">Кодовая разработка</option>
                <option value="Конструктор">No-Code</option>
                <option value="Гибрид">Гибрид</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Детали кейса *</label>
            <textarea required value={form.details} onChange={update('details')}
              placeholder="Опишите кейс: что делает бот, какие результаты, метрики..."
              rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div>
            <label style={labelStyle}>Ссылка на источник *</label>
            <input required value={form.source} onChange={update('source')} placeholder="https://..." style={inputStyle} />
          </div>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Контактные данные</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Ваше имя</label>
              <input value={form.contactName} onChange={update('contactName')} placeholder="Имя" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Telegram</label>
              <input value={form.contactTg} onChange={update('contactTg')} placeholder="@username" style={inputStyle} />
            </div>
          </div>
        </Card>

        <button type="submit" disabled={sending} style={{ ...btnPrimary, opacity: sending ? 0.6 : 1 }}>
          {sending ? 'Отправка...' : 'Отправить кейс'}
        </button>
      </form>
    </div>
  );
}

// ============ AUDIT PAGE ============
function AuditPage() {
  const [form, setForm] = useState({
    company: '', industry: '', task: '', budget: '',
    contactName: '', contactTg: '', contactPhone: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const r = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'audit', ...form }),
      });
      if (r.ok) setSubmitted(true);
    } catch { alert('Ошибка отправки. Попробуйте позже.'); }
    setSending(false);
  };

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '64px 0' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Заявка отправлена!</h2>
        <p style={{ fontSize: 14, color: THEME.textSecondary, marginBottom: 24 }}>
          Мы свяжемся с вами в течение 1-2 рабочих дней для обсуждения деталей.
        </p>
        <a href="#/" style={{ ...btnPrimary, display: 'inline-block', textDecoration: 'none' }}>Вернуться к рейтингу</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="audit-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        {/* Left: info */}
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Аудит и подбор решения</h1>
          <p style={{ fontSize: 15, color: THEME.textSecondary, lineHeight: 1.8, marginBottom: 32 }}>
            Поможем разобраться в рынке чат-ботов и подобрать оптимальное решение для вашего бизнеса.
          </p>

          <div style={{ display: 'grid', gap: 16 }}>
            <Card>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: THEME.accent }}>Анализ задачи</h3>
              <p style={{ fontSize: 13, color: THEME.textSecondary, lineHeight: 1.6 }}>
                Изучим ваши бизнес-процессы и определим, где чат-бот принесёт максимальную пользу:
                поддержка, продажи, HR, внутренние коммуникации.
              </p>
            </Card>
            <Card>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: THEME.success }}>Подбор технологии</h3>
              <p style={{ fontSize: 13, color: THEME.textSecondary, lineHeight: 1.6 }}>
                Код или конструктор? AI/NLP или сценарный бот? Голосовой или текстовый?
                Подберём подход под ваш бюджет и задачи.
              </p>
            </Card>
            <Card>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: THEME.warning }}>Рекомендация подрядчика</h3>
              <p style={{ fontSize: 13, color: THEME.textSecondary, lineHeight: 1.6 }}>
                На основе нашей базы из {developers.length}+ разработчиков и {cases.length}+ кейсов
                порекомендуем подрядчиков с релевантным опытом в вашей отрасли.
              </p>
            </Card>
          </div>

          <div style={{ marginTop: 24, padding: 16, background: THEME.accentBg, borderRadius: 8, border: `1px solid ${THEME.accent}30` }}>
            <div style={{ fontSize: 13, color: THEME.accentLight, fontWeight: 600, marginBottom: 4 }}>
              Почему мы независимы
            </div>
            <p style={{ fontSize: 13, color: THEME.textSecondary, lineHeight: 1.6 }}>
              AI Map — армянская компания. Мы не работаем на российском рынке как подрядчики,
              но хорошо знаем его изнутри. Наши рекомендации основаны на данных, а не на партнёрских интересах.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div>
          <form onSubmit={handleSubmit}>
            <Card>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Оставить заявку</h3>

              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Компания *</label>
                  <input required value={form.company} onChange={update('company')} placeholder="Название компании" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Отрасль</label>
                  <select value={form.industry} onChange={update('industry')} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Выберите отрасль</option>
                    {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    <option value="Другое">Другое</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Задача *</label>
                  <textarea required value={form.task} onChange={update('task')} rows={3}
                    placeholder="Опишите задачу: какую проблему хотите решить с помощью чат-бота?"
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={labelStyle}>Ориентировочный бюджет</label>
                  <select value={form.budget} onChange={update('budget')} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Не определён</option>
                    <option value="до 500к">до 500 000 ₽</option>
                    <option value="500к-2М">500 000 — 2 000 000 ₽</option>
                    <option value="2М-5М">2 000 000 — 5 000 000 ₽</option>
                    <option value="5М+">от 5 000 000 ₽</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Комментарий</label>
                  <textarea value={form.message} onChange={update('message')} rows={2}
                    placeholder="Дополнительная информация"
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                <div style={{ borderTop: `1px solid ${THEME.border}`, paddingTop: 16, marginTop: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textSecondary, marginBottom: 12 }}>Контактные данные</div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Имя *</label>
                      <input required value={form.contactName} onChange={update('contactName')} placeholder="Ваше имя" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Telegram *</label>
                      <input required value={form.contactTg} onChange={update('contactTg')} placeholder="@username" style={inputStyle} />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={sending} style={{ ...btnPrimary, width: '100%', marginTop: 20, opacity: sending ? 0.6 : 1 }}>
                {sending ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}

// ============ ABOUT PAGE ============
function AboutPage() {
  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>О проекте</h1>

      {/* AI Map */}
      <Card style={{ marginBottom: 24, borderColor: THEME.accent + '40' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Разработчик рейтинга — <span style={{ color: THEME.accentLight }}>AI Map</span>
            </h2>
            <Badge color={THEME.accent}>Ереван, Армения</Badge>
          </div>
        </div>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8, marginTop: 16 }}>
          AI Map — армянская компания, специализирующаяся на аналитике рынка ИИ и технологий.
          Мы не работаем на российском рынке как подрядчики, но хорошо знакомы с его экосистемой.
          Это позволяет нам составлять объективные и независимые рейтинги, основанные исключительно
          на публичных данных, без конфликта интересов.
        </p>
        <div style={{ marginTop: 12 }}>
          <ExternalLink href="https://aimap.am">aimap.am</ExternalLink>
        </div>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>AI Рейтинги</h2>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
          AI Рейтинги — портал независимых рейтингов в сфере искусственного интеллекта,
          разработки и технологий в России. Мы собираем и систематизируем данные из открытых
          источников, чтобы помочь бизнесу выбрать подрядчика, а разработчикам — оценить рынок.
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Рейтинг разработчиков чат-ботов</h3>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
          Первый рейтинг портала — рейтинг компаний-разработчиков чат-ботов по количеству
          публичных кейсов для брендов из Топ-100 крупнейших брендов России (BrandLab 2025).
          Рейтинг учитывает только подтверждённые кейсы с публичными источниками.
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Методология</h3>
        <ul style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 2, paddingLeft: 20 }}>
          <li>Источник списка брендов — BrandLab «Топ-100 самых дорогих брендов России 2025»</li>
          <li>Учитываются только кейсы с публичным подтверждением (ссылка на источник)</li>
          <li>Внутренние разработки компаний (in-house) не входят в рейтинг подрядчиков</li>
          <li>Разделение на «Code» и «No-Code» — по основному подходу разработчика</li>
          <li>Один бренд может иметь несколько кейсов от разных разработчиков</li>
        </ul>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Планируемые рейтинги</h2>
        <ul style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 2, paddingLeft: 20 }}>
          <li>Рейтинг конструкторов чат-ботов</li>
          <li>Рейтинг ИИ-платформ для бизнеса</li>
          <li>Рейтинг голосовых ассистентов</li>
          <li>Рейтинг NLP-решений</li>
        </ul>
      </Card>

      <Card>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Хотите дополнить рейтинг?</h2>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
          Если мы упустили кейс или вы хотите предложить дополнение — заполните форму,
          и мы добавим информацию после проверки.
        </p>
        <a href="#/submit" style={{
          ...btnPrimary, display: 'inline-block', textDecoration: 'none',
          padding: '10px 24px', fontSize: 14,
        }}>Добавить кейс</a>
      </Card>
    </div>
  );
}

// ============ CHATBOT SAAS PAGE ============
function ChatbotSaasPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('constructor');
  const [sortBy, setSortBy] = useState('frequency');
  const [intFilters, setIntFilters] = useState([]);

  const toggleInt = (key) => {
    setIntFilters(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const sorted = useMemo(() => {
    let list = [...chatbotSaas];
    if (filter === 'constructor') list = list.filter(s => s.category === 'constructor');
    else if (filter === 'other') list = list.filter(s => s.category === 'other');
    if (intFilters.length > 0) {
      list = list.filter(s => s.integrations && intFilters.every(k => s.integrations[k]));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || (s.comment && s.comment.toLowerCase().includes(q)));
    }
    if (sortBy === 'revenue') list.sort((a, b) => (b.revenue2025 || 0) - (a.revenue2025 || 0));
    else if (sortBy === 'employees') list.sort((a, b) => (b.employees || 0) - (a.employees || 0));
    else list.sort((a, b) => (b.frequency || 0) - (a.frequency || 0));
    return list;
  }, [search, filter, sortBy, intFilters]);

  const withFreq = sorted.filter(s => s.frequency);

  return (
    <div>
      <div className="hero-section" style={{
        background: `linear-gradient(135deg, ${THEME.bgCard} 0%, ${THEME.bg} 100%)`,
        border: `1px solid ${THEME.border}`, borderRadius: 16,
        padding: '48px 32px', marginBottom: 32, textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
          Рейтинг конструкторов чат-ботов
        </h1>

        <p style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 8 }}>Данные на 09.04.2026</p>
        <p style={{ fontSize: 16, color: THEME.textSecondary, maxWidth: 700, margin: '0 auto 24px' }}>
          Рейтинг SaaS-платформ для создания чат-ботов в России и СНГ
          по <strong style={{ color: THEME.text }}>частоте брендовых запросов</strong> в Яндексе (данные Топвизор)
        </p>
        <div className="hero-stats" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <StatBox label="Платформ" value={chatbotSaas.length} />
          <StatBox label="С данными" value={withFreq.length} color={THEME.success} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { key: 'constructor', label: 'Конструкторы ботов' },
            { key: 'other', label: 'Боты не основной продукт' },
            { key: 'all', label: 'Все' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
              border: `1px solid ${filter === f.key ? THEME.accent : THEME.border}`,
              background: filter === f.key ? THEME.accentBg : 'transparent',
              color: filter === f.key ? THEME.accentLight : THEME.textSecondary,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>{f.label}</button>
          ))}
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
          <option value="frequency">По запросам</option>
          <option value="revenue">По выручке</option>
          <option value="employees">По сотрудникам</option>
        </select>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Поиск..."
          style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 14, flex: '1 1 200px', minWidth: 0,
            border: `1px solid ${THEME.border}`, background: THEME.bgCard,
            color: THEME.text, outline: 'none',
          }}
        />
      </div>

      {/* Integration filters */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: THEME.textMuted, marginRight: 4 }}>Интеграции:</span>
        {INTEGRATIONS.map(int => {
          const active = intFilters.includes(int.key);
          return (
            <button key={int.key} onClick={() => toggleInt(int.key)} title={int.label} style={{
              padding: '5px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4,
              border: `1px solid ${active ? THEME.accent : THEME.border}`,
              background: active ? THEME.accentBg : 'transparent',
              color: active ? THEME.accentLight : THEME.textMuted,
              cursor: 'pointer', transition: 'all 0.15s', fontSize: 11,
            }}><IntIcon type={int.key} size={16} /><span className="col-type">{int.label}</span></button>
          );
        })}
        {intFilters.length > 0 && (
          <button onClick={() => setIntFilters([])} style={{
            padding: '4px 10px', borderRadius: 6, fontSize: 11,
            border: 'none', background: 'transparent',
            color: THEME.textMuted, cursor: 'pointer', textDecoration: 'underline',
          }}>сбросить</button>
        )}
      </div>

      <div className="rating-table-wrap" style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${THEME.border}` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: THEME.bgCard }}>
              <th style={thStyle}>#</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Платформа</th>
              <th style={thStyle}>Частота запросов</th>
              <th className="col-brands" style={{ ...thStyle, textAlign: 'left' }}>Комментарий</th>
              <th className="col-site" style={thStyle}>Сайт</th>
              <th className="col-site" style={thStyle}>Выручка</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => (
              <tr key={s.name}
                style={{
                  background: i % 2 === 0 ? 'transparent' : `${THEME.bgCard}60`,
                  cursor: s.slug ? 'pointer' : 'default', transition: 'background 0.15s',
                }}
                onClick={() => s.slug && navigate(`/chatbot/${s.slug}`)}
                onMouseEnter={e => e.currentTarget.style.background = THEME.accentBg}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : `${THEME.bgCard}60`}
              >
                <td style={{ ...tdStyle, textAlign: 'center', width: 50 }}>
                  <MedalIcon place={i + 1} />
                </td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>
                  <div>{s.name}</div>
                  {s.integrations && (
                    <div style={{ display: 'flex', gap: 3, marginTop: 4, flexWrap: 'wrap' }}>
                      {INTEGRATIONS.filter(int => s.integrations[int.key]).map(int => (
                        <span key={int.key} title={int.label} style={{
                          display: 'inline-flex', padding: '2px', borderRadius: 3,
                          background: intFilters.includes(int.key) ? THEME.accentBg : `${THEME.border}80`,
                          color: intFilters.includes(int.key) ? THEME.accentLight : THEME.textMuted,
                          border: `1px solid ${intFilters.includes(int.key) ? THEME.accent + '40' : 'transparent'}`,
                        }}><IntIcon type={int.key} size={12} /></span>
                      ))}
                    </div>
                  )}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  {s.frequency ? (
                    <span style={{
                      display: 'inline-block', padding: '4px 12px', borderRadius: 8,
                      fontSize: 14, fontWeight: 700,
                      color: s.frequency >= 2000 ? THEME.success : s.frequency >= 500 ? THEME.warning : THEME.textSecondary,
                      background: s.frequency >= 2000 ? `${THEME.success}15` : s.frequency >= 500 ? `${THEME.warning}15` : 'transparent',
                    }}>{s.frequency.toLocaleString('ru-RU')}</span>
                  ) : (
                    <span style={{ color: THEME.textMuted }}>—</span>
                  )}
                </td>
                <td className="col-brands" style={{ ...tdStyle, fontSize: 13, color: THEME.textSecondary }}>
                  {s.comment || '—'}
                </td>
                <td className="col-site" style={{ ...tdStyle, textAlign: 'center' }}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13 }}>
                    {(() => { try { return new URL(s.url).hostname.replace('www.',''); } catch { return s.url; } })()}
                  </a>
                </td>
                <td className="col-site" style={{ ...tdStyle, textAlign: 'center', fontSize: 12, color: THEME.textMuted }}>
                  {s.revenue2025 ? `${(s.revenue2025 / 1e6).toFixed(0)} млн` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 48, padding: 32, background: THEME.bgCard, borderRadius: 12, border: `1px solid ${THEME.border}` }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Методология и цель рейтинга</h2>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8, marginBottom: 12 }}>
          Цель рейтинга — показать <strong style={{ color: THEME.text }}>стабильность платформ</strong>, а не определить лучшего.
        </p>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8, marginBottom: 12 }}>
          Частота брендовых запросов в Яндексе отвечает как минимум за два параметра:
        </p>
        <ul style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 2, paddingLeft: 20, marginBottom: 12 }}>
          <li><strong style={{ color: THEME.text }}>Обнаруживаемость</strong> — платформа позаботилась о том, чтобы её в принципе можно было найти, и ресурс адекватен</li>
          <li><strong style={{ color: THEME.text }}>Популярность</strong> — показывает реальный интерес пользователей. Платформа с большой базой клиентов с малой вероятностью закроется</li>
        </ul>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8 }}>
          Источник данных: Топвизор, частота брендовых запросов в Яндексе (Россия). Дата: 09.04.2026.
          Учитываются только работающие SaaS-сервисы, доступные в России и СНГ.
        </p>
      </div>
    </div>
  );
}

// ============ CHATBOT SAAS DETAIL PAGE ============
function ChatbotSaasDetailPage({ slug }) {
  const s = getSaasBySlug(slug);
  if (!s) return <div style={{ textAlign: 'center', padding: 64 }}><h2>Платформа не найдена</h2><a href="#/chatbot">Вернуться к рейтингу</a></div>;

  const allSorted = [...chatbotSaas].sort((a, b) => (b.frequency || 0) - (a.frequency || 0));
  const rank = allSorted.findIndex(x => x.slug === slug) + 1;
  const catSorted = allSorted.filter(x => x.category === s.category);
  const catRank = catSorted.findIndex(x => x.slug === slug) + 1;

  const fmtMoney = (v) => {
    if (!v) return '—';
    if (Math.abs(v) >= 1e9) return `${(v / 1e9).toFixed(1)} млрд`;
    if (Math.abs(v) >= 1e6) return `${(v / 1e6).toFixed(0)} млн`;
    return `${(v / 1e3).toFixed(0)} тыс`;
  };
  const fmtGrowth = (cur, prev) => {
    if (!cur || !prev) return null;
    const pct = ((cur - prev) / Math.abs(prev) * 100).toFixed(0);
    return pct > 0 ? `+${pct}%` : `${pct}%`;
  };

  const revenueGrowth = fmtGrowth(s.revenue2025, s.revenue2024);
  const profitGrowth = fmtGrowth(s.profit2025, s.profit2024);

  return (
    <div>
      <Breadcrumb items={[
        { label: 'Конструкторы', href: '#/chatbot' },
        { label: s.name },
      ]} />

      {/* Header */}
      <div style={{
        background: THEME.bgCard, border: `1px solid ${THEME.border}`, borderRadius: 16,
        padding: 32, marginBottom: 32,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800 }}>{s.name}</h1>
              <Badge color={s.category === 'constructor' ? THEME.accent : THEME.warning}>
                {s.category === 'constructor' ? s.focus : `Основное — ${s.focus}`}
              </Badge>
            </div>
            {s.comment && <p style={{ fontSize: 14, color: THEME.textSecondary, marginBottom: 12 }}>{s.comment}</p>}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <ExternalLink href={s.url}>{s.url}</ExternalLink>
              {s.parentUrl && <ExternalLink href={s.parentUrl}>Компания: {s.parentUrl}</ExternalLink>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <StatBox label="Общий рейтинг" value={`#${rank}`} color={rank <= 3 ? THEME.gold : THEME.accent} />
            <StatBox label={s.category === 'constructor' ? 'Среди конструкторов' : 'Среди прочих'} value={`#${catRank}`} color={THEME.warning} />
            <StatBox label="Запросов/мес" value={s.frequency ? s.frequency.toLocaleString('ru-RU') : '—'} color={THEME.success} />
          </div>
        </div>
      </div>

      {/* Financial */}
      {/* Integrations */}
      {s.integrations && (
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Поддерживаемые каналы</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
            {INTEGRATIONS.map(int => {
              const supported = s.integrations[int.key];
              return (
                <div key={int.key} style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                  background: supported ? THEME.accentBg : THEME.bg,
                  border: `1px solid ${supported ? THEME.accent + '40' : THEME.border}`,
                  color: supported ? THEME.accentLight : THEME.textMuted,
                  opacity: supported ? 1 : 0.4,
                }}>
                  <IntIcon type={int.key} size={14} /> {int.label}
                </div>
              );
            })}
          </div>
        </>
      )}

      {(s.revenue2025 || s.employees || s.legalName) && (
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Финансовые показатели</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 16, marginBottom: 32 }}>
            {s.revenue2025 != null && (
              <Card>
                <div style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 4 }}>Выручка 2025</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: THEME.success }}>{fmtMoney(s.revenue2025)} ₽</div>
                {revenueGrowth && <div style={{ fontSize: 13, color: revenueGrowth.startsWith('+') ? THEME.success : THEME.danger, marginTop: 4 }}>{revenueGrowth} к 2024</div>}
              </Card>
            )}
            {s.profit2025 != null && (
              <Card>
                <div style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 4 }}>Прибыль 2025</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: s.profit2025 >= 0 ? THEME.success : THEME.danger }}>{fmtMoney(s.profit2025)} ₽</div>
                {profitGrowth && <div style={{ fontSize: 13, color: profitGrowth.startsWith('+') ? THEME.success : THEME.danger, marginTop: 4 }}>{profitGrowth} к 2024</div>}
              </Card>
            )}
            {s.employees && (
              <Card>
                <div style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 4 }}>Сотрудников</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: THEME.accent }}>{s.employees}</div>
              </Card>
            )}
          </div>
        </>
      )}

      {/* Company info */}
      {(s.legalName || s.inn || s.city) && (
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>О компании</h2>
          <Card style={{ marginBottom: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px 16px', fontSize: 14, color: THEME.textSecondary }}>
              {s.legalName && <><span style={{ color: THEME.textMuted }}>Юрлицо:</span><span>{s.legalName}</span></>}
              {s.inn && <><span style={{ color: THEME.textMuted }}>ИНН:</span><span>{s.inn}</span></>}
              {s.city && <><span style={{ color: THEME.textMuted }}>Город:</span><span>{s.city}</span></>}
              {s.focus && <><span style={{ color: THEME.textMuted }}>Направление:</span><span>{s.focus}</span></>}
            </div>
          </Card>
        </>
      )}

      {/* Historical */}
      {s.revenue2024 && (
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Динамика</h2>
          <div className="rating-table-wrap" style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${THEME.border}`, marginBottom: 32 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: THEME.bgCard }}>
                  <th style={{ ...thStyle, textAlign: 'left' }}>Показатель</th>
                  <th style={thStyle}>2024</th>
                  <th style={thStyle}>2025</th>
                  <th style={thStyle}>Рост</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>Выручка</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>{fmtMoney(s.revenue2024)} ₽</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>{fmtMoney(s.revenue2025)} ₽</td>
                  <td style={{ ...tdStyle, textAlign: 'center', color: revenueGrowth && revenueGrowth.startsWith('+') ? THEME.success : THEME.danger }}>{revenueGrowth || '—'}</td>
                </tr>
                <tr style={{ background: `${THEME.bgCard}60` }}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>Прибыль</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>{fmtMoney(s.profit2024)} ₽</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>{fmtMoney(s.profit2025)} ₽</td>
                  <td style={{ ...tdStyle, textAlign: 'center', color: profitGrowth && profitGrowth.startsWith('+') ? THEME.success : THEME.danger }}>{profitGrowth || '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      <p style={{ fontSize: 13, color: THEME.textMuted }}>Источник финансовых данных: открытые данные ФНС. Дата рейтинга: 09.04.2026.</p>
    </div>
  );
}

// ============ OMNICHANNEL CHAT PAGE ============
function OmnichannelChatPage() {
  const [search, setSearch] = useState('');

  const sorted = useMemo(() => {
    let list = [...omnichannelPlatforms];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || (s.comment && s.comment.toLowerCase().includes(q)));
    }
    list.sort((a, b) => (b.frequency || 0) - (a.frequency || 0));
    return list;
  }, [search]);

  return (
    <div>
      <div className="hero-section" style={{
        background: `linear-gradient(135deg, ${THEME.bgCard} 0%, ${THEME.bg} 100%)`,
        border: `1px solid ${THEME.border}`, borderRadius: 16,
        padding: '48px 32px', marginBottom: 32, textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
          Рейтинг омниканальных чат-платформ
        </h1>
        <p style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 8 }}>Данные на 09.04.2026</p>
        <p style={{ fontSize: 16, color: THEME.textSecondary, maxWidth: 700, margin: '0 auto 24px' }}>
          Рейтинг платформ для омниканальных коммуникаций в России и СНГ
          по <strong style={{ color: THEME.text }}>частоте брендовых запросов</strong> в Яндексе (данные Топвизор)
        </p>
        <div className="hero-stats" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <StatBox label="Платформ" value={omnichannelPlatforms.length} />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по названию..."
          style={{
            padding: '10px 16px', borderRadius: 8, fontSize: 14, width: '100%', maxWidth: 400,
            border: `1px solid ${THEME.border}`, background: THEME.bgCard,
            color: THEME.text, outline: 'none',
          }}
        />
      </div>

      <div className="rating-table-wrap" style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${THEME.border}` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: THEME.bgCard }}>
              <th style={thStyle}>#</th>
              <th style={{ ...thStyle, textAlign: 'left' }}>Платформа</th>
              <th style={thStyle}>Частота запросов</th>
              <th className="col-brands" style={{ ...thStyle, textAlign: 'left' }}>Комментарий</th>
              <th className="col-site" style={thStyle}>Сайт</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => (
              <tr key={s.name}
                style={{
                  background: i % 2 === 0 ? 'transparent' : `${THEME.bgCard}60`,
                  cursor: s.slug ? 'pointer' : 'default', transition: 'background 0.15s',
                }}
                onClick={() => s.slug && navigate(`/chatbot/${s.slug}`)}
                onMouseEnter={e => e.currentTarget.style.background = THEME.accentBg}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : `${THEME.bgCard}60`}
              >
                <td style={{ ...tdStyle, textAlign: 'center', width: 50 }}>
                  <MedalIcon place={i + 1} />
                </td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{s.name}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  {s.frequency ? (
                    <span style={{
                      display: 'inline-block', padding: '4px 12px', borderRadius: 8,
                      fontSize: 14, fontWeight: 700,
                      color: s.frequency >= 500 ? THEME.success : s.frequency >= 100 ? THEME.warning : THEME.textSecondary,
                      background: s.frequency >= 500 ? `${THEME.success}15` : s.frequency >= 100 ? `${THEME.warning}15` : 'transparent',
                    }}>{s.frequency.toLocaleString('ru-RU')}</span>
                  ) : (
                    <span style={{ color: THEME.textMuted }}>—</span>
                  )}
                </td>
                <td className="col-brands" style={{ ...tdStyle, fontSize: 13, color: THEME.textSecondary }}>
                  {s.comment || '—'}
                </td>
                <td className="col-site" style={{ ...tdStyle, textAlign: 'center' }}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13 }}>
                    {(() => { try { return new URL(s.url).hostname.replace('www.',''); } catch { return s.url; } })()}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 48, padding: 32, background: THEME.bgCard, borderRadius: 12, border: `1px solid ${THEME.border}` }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Методология и цель рейтинга</h2>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8, marginBottom: 12 }}>
          Цель рейтинга — показать <strong style={{ color: THEME.text }}>стабильность платформ</strong>, а не определить лучшего.
        </p>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8, marginBottom: 12 }}>
          Частота брендовых запросов в Яндексе отвечает как минимум за два параметра:
        </p>
        <ul style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 2, paddingLeft: 20, marginBottom: 12 }}>
          <li><strong style={{ color: THEME.text }}>Обнаруживаемость</strong> — платформа позаботилась о том, чтобы её в принципе можно было найти, и ресурс адекватен</li>
          <li><strong style={{ color: THEME.text }}>Популярность</strong> — показывает реальный интерес пользователей. Платформа с большой базой клиентов с малой вероятностью закроется</li>
        </ul>
        <p style={{ fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8 }}>
          Источник данных: Топвизор, частота брендовых запросов в Яндексе (Россия). Дата: 09.04.2026.
        </p>
      </div>
    </div>
  );
}

// ============ PRIVACY PAGE ============
function PrivacyPage() {
  const S = { h2: { fontSize: 18, fontWeight: 700, marginTop: 32, marginBottom: 12 }, p: { fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8, marginBottom: 12 }, li: { fontSize: 14, color: THEME.textSecondary, lineHeight: 1.8 } };
  return (
    <div style={{ maxWidth: 800 }}>
      <Breadcrumb items={[{ label: 'Главная', href: '#/' }, { label: 'Политика обработки данных' }]} />
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Политика обработки персональных данных</h1>
      <p style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 32 }}>Дата вступления в силу: 8 апреля 2026 г.</p>

      <Card>
        <h2 style={S.h2}>1. Общие положения</h2>
        <p style={S.p}>
          Настоящая Политика обработки персональных данных (далее — Политика) определяет порядок обработки
          и защиты персональных данных пользователей сайта AI Рейтинги (далее — Сайт).
        </p>
        <p style={S.p}>
          Оператором персональных данных является: ИП Леон Николаев (ИП Леон Николаев),
          ՀՎՀՀ 28154419, Республика Армения, г. Ереван, пр. Саят-Новы, д. 40 (Fabula Coworking).
        </p>
        <p style={S.p}>
          Используя Сайт и/или заполняя формы на Сайте, пользователь выражает своё согласие
          с условиями настоящей Политики.
        </p>

        <h2 style={S.h2}>2. Какие данные мы собираем</h2>
        <p style={S.p}>Мы можем собирать следующие персональные данные, предоставленные пользователем добровольно:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          <li style={S.li}>Имя и фамилия</li>
          <li style={S.li}>Адрес электронной почты</li>
          <li style={S.li}>Номер телефона</li>
          <li style={S.li}>Наименование компании</li>
          <li style={S.li}>Описание проекта или задачи</li>
        </ul>
        <p style={S.p}>Также автоматически собираются технические данные:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          <li style={S.li}>IP-адрес</li>
          <li style={S.li}>Тип и версия браузера</li>
          <li style={S.li}>Данные cookie-файлов</li>
          <li style={S.li}>Данные Яндекс.Метрики (обезличенные)</li>
        </ul>

        <h2 style={S.h2}>3. Цели обработки данных</h2>
        <p style={S.p}>Персональные данные обрабатываются для следующих целей:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          <li style={S.li}>Обработка заявок на аудит и подбор решения</li>
          <li style={S.li}>Обработка предложений о дополнении рейтинга (форма добавления кейса)</li>
          <li style={S.li}>Связь с пользователем по его запросу</li>
          <li style={S.li}>Улучшение работы Сайта и анализ посещаемости</li>
        </ul>

        <h2 style={S.h2}>4. Правовые основания обработки</h2>
        <p style={S.p}>
          Обработка персональных данных осуществляется на основании добровольного согласия пользователя,
          выраженного путём заполнения форм на Сайте. Пользователь может отозвать своё согласие
          в любой момент, направив запрос на адрес info@aimap.am.
        </p>

        <h2 style={S.h2}>5. Хранение и защита данных</h2>
        <p style={S.p}>
          Персональные данные хранятся не дольше, чем это необходимо для целей обработки.
          Данные, переданные через формы Сайта, отправляются на электронную почту оператора
          и не хранятся в базах данных Сайта.
        </p>
        <p style={S.p}>
          Оператор принимает необходимые организационные и технические меры для защиты
          персональных данных от неправомерного или случайного доступа, уничтожения,
          изменения, блокирования, копирования, распространения.
        </p>

        <h2 style={S.h2}>6. Передача данных третьим лицам</h2>
        <p style={S.p}>
          Оператор не передаёт персональные данные третьим лицам без согласия пользователя,
          за исключением случаев, предусмотренных законодательством Республики Армения.
        </p>
        <p style={S.p}>
          На Сайте используется сервис веб-аналитики Яндекс.Метрика (ООО «Яндекс», Россия),
          который собирает обезличенные данные о посещении Сайта в соответствии
          с собственной политикой конфиденциальности.
        </p>

        <h2 style={S.h2}>7. Cookie-файлы</h2>
        <p style={S.p}>
          Сайт использует cookie-файлы для обеспечения корректной работы и сбора аналитики.
          Пользователь может отключить cookie-файлы в настройках браузера, однако это может
          повлиять на функциональность Сайта.
        </p>

        <h2 style={S.h2}>8. Права пользователя</h2>
        <p style={S.p}>Пользователь имеет право:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
          <li style={S.li}>Получить информацию об обработке своих персональных данных</li>
          <li style={S.li}>Потребовать уточнения, блокирования или уничтожения своих данных</li>
          <li style={S.li}>Отозвать согласие на обработку персональных данных</li>
          <li style={S.li}>Обжаловать действия оператора в уполномоченный орган</li>
        </ul>
        <p style={S.p}>
          Для реализации указанных прав направьте запрос на адрес:{' '}
          <a href="mailto:info@aimap.am">info@aimap.am</a>
        </p>

        <h2 style={S.h2}>9. Контактная информация оператора</h2>
        <div style={{ background: THEME.bg, borderRadius: 8, padding: 20, border: `1px solid ${THEME.border}`, marginTop: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '8px 16px', fontSize: 14, color: THEME.textSecondary }}>
            <span style={{ color: THEME.textMuted }}>Оператор:</span>
            <span>Ա/Ձ ԼԵՎՈՆ ՆԻdelays Հdelays (ИП Леон Николаев)</span>
            <span style={{ color: THEME.textMuted }}>ՀՎՀՀ:</span>
            <span>28154419</span>
            <span style={{ color: THEME.textMuted }}>Адрес:</span>
            <span>Республика Армения, г. Ереван, пр. Саят-Новы, д. 40</span>
            <span style={{ color: THEME.textMuted }}>Email:</span>
            <a href="mailto:info@aimap.am">info@aimap.am</a>
            <span style={{ color: THEME.textMuted }}>Телефон:</span>
            <a href="tel:+37441041640">+374 41 041 640</a>
            <span style={{ color: THEME.textMuted }}>Telegram:</span>
            <a href="https://t.me/aimap_sla" target="_blank" rel="noopener noreferrer">@aimap_sla</a>
          </div>
        </div>

        <h2 style={S.h2}>10. Изменения в Политике</h2>
        <p style={S.p}>
          Оператор оставляет за собой право вносить изменения в настоящую Политику.
          Актуальная версия Политики размещена на данной странице Сайта.
          Продолжение использования Сайта после внесения изменений означает согласие
          пользователя с обновлённой Политикой.
        </p>
      </Card>
    </div>
  );
}

// ============ TABLE STYLES ============
const thStyle = {
  padding: '12px 16px', fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
  letterSpacing: '0.05em', color: THEME.textMuted, textAlign: 'center',
  borderBottom: `1px solid ${THEME.border}`,
};

const tdStyle = {
  padding: '12px 16px', fontSize: 14, borderBottom: `1px solid ${THEME.border}20`,
  verticalAlign: 'middle',
};

const selectStyle = {
  padding: '8px 12px', borderRadius: 8, fontSize: 13,
  border: `1px solid ${THEME.border}`, background: THEME.bgCard,
  color: THEME.textSecondary, cursor: 'pointer',
};

// ============ APP ============
export default function App() {
  const hash = useHashRouter();

  let page;
  if (hash.startsWith('#/developer/')) {
    const slug = hash.replace('#/developer/', '');
    page = <DeveloperPage slug={slug} />;
  } else if (hash.startsWith('#/chatbot/')) {
    const slug = hash.replace('#/chatbot/', '');
    page = <ChatbotSaasDetailPage slug={slug} />;
  } else if (hash === '#/chatbot') {
    page = <ChatbotSaasPage />;
  } else if (hash === '#/omnichannel-chat') {
    page = <OmnichannelChatPage />;
  } else if (hash === '#/cases') {
    page = <CasesPage />;
  } else if (hash === '#/submit') {
    page = <SubmitCasePage />;
  } else if (hash === '#/audit') {
    page = <AuditPage />;
  } else if (hash === '#/privacy') {
    page = <PrivacyPage />;
  } else if (hash === '#/about') {
    page = <AboutPage />;
  } else {
    page = <RatingPage />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <Header />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {page}
      </main>
      <Footer />
    </>
  );
}
