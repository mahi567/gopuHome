// SVG line icons and the logo mark, as HTML strings.
const ICONS = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.5 1.6-1.5h1.7V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.5H7.6V14h2.8v8h3.1z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.2A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 9.5c0 3 2.5 5.500 5.5 5.500" /></svg>'
};

// Line icons (drawn as SVG so they stay sharp at any size and take the text colour).
const svg = (inner) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
Object.assign(ICONS, {
  building: svg('<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>'),
  bed: svg('<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>'),
  sofa: svg('<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z"/><path d="M4 18v2"/><path d="M20 18v2"/>'),
  hotel: svg('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M10 22v-5a2 2 0 0 1 4 0v5"/><path d="M8 7h.01"/><path d="M12 7h.01"/><path d="M16 7h.01"/><path d="M8 11h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/>'),
  wifi: svg('<path d="M12 20h.01"/><path d="M2 8.800a15 15 0 0 1 20 0"/><path d="M5 12.900a10 10 0 0 1 14 0"/><path d="M8.500 16.400a5 5 0 0 1 7 0"/>'),
  utensils: svg('<path d="M3 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6a2 2 0 0 0 2 2h3Zm0 0v7"/>'),
  sparkles: svg('<path d="M12 3l1.900 5.100a2 2 0 0 0 1.200 1.200L20 11l-4.900 1.700a2 2 0 0 0-1.200 1.200L12 19l-1.900-5.100a2 2 0 0 0-1.200-1.200L4 11l4.900-1.700a2 2 0 0 0 1.200-1.200Z"/><path d="M19 3v4"/><path d="M21 5h-4"/><path d="M5 18v3"/><path d="M6.500 19.500h-3"/>'),
  droplet: svg('<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.900-3-5.500s-3.500-4-4-6.500c-.5 2.500-2 4.900-4 6.500S5 13 5 15a7 7 0 0 0 7 7z"/>'),
  car: svg('<path d="M19 17h2a1 1 0 0 0 1-1v-3c0-.9-.7-1.700-1.500-1.900C18.700 10.600 16 10 16 10s-1.300-1.400-2.200-2.300c-.5-.4-1.100-.7-1.800-.7H5c-.6 0-1.100.4-1.400.9l-1.400 2.900A3.700 3.700 0 0 0 2 12v4a1 1 0 0 0 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>'),
  shield: svg('<path d="M20 13c0 5-3.500 7.500-7.700 9a1 1 0 0 1-.6 0C7.500 20.500 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.500-1.200 6.200-2.700a1.200 1.200 0 0 1 1.600 0C14.500 3.800 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
  video: svg('<path d="m16 13 5.200 3.500a.5.5 0 0 0 .8-.4V7.900a.5.5 0 0 0-.8-.4L16 10.500"/><rect x="2" y="6" width="14" height="12" rx="2"/>'),
  message: svg('<path d="M7.900 20A9 9 0 1 0 4 16.100L2 22Z"/>'),
  badge: svg('<path d="M3.900 8.600a4 4 0 0 1 4.700-4.700 4 4 0 0 1 6.800 0 4 4 0 0 1 4.700 4.700 4 4 0 0 1 0 6.800 4 4 0 0 1-4.700 4.700 4 4 0 0 1-6.800 0 4 4 0 0 1-4.700-4.700 4 4 0 0 1 0-6.800Z"/><path d="m9 12 2 2 4-4"/>'),
  search: svg('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.300-4.300"/>'),
  key: svg('<path d="m15.500 7.500 2.300 2.300a1 1 0 0 0 1.400 0l2.100-2.100a1 1 0 0 0 0-1.400L19 4"/><path d="m21 2-9.600 9.600"/><circle cx="7.500" cy="15.500" r="5.500"/>'),
  users: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.900"/><path d="M16 3.100a4 4 0 0 1 0 7.800"/>'),
  check: svg('<path d="M20 6 9 17l-5-5"/>'),
  arrow: svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>')
});

const LOGO_VIEWBOX = "0 0 362 295";
const LOGO_SHAPES = `<defs><linearGradient id="gopu-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--gold-3,#a86f10)"/><stop offset=".22" style="stop-color:var(--gold-1,#f6d977)"/><stop offset=".45" style="stop-color:var(--gold-2,#cf9620)"/><stop offset=".62" style="stop-color:var(--gold-hi,#ffeeb0)"/><stop offset=".8" style="stop-color:var(--gold-2,#cf9620)"/><stop offset="1" style="stop-color:var(--gold-4,#7a4a06)"/></linearGradient></defs><polygon points="5,142 180,7 357,142 180,30" fill="url(#gopu-gold)"/><g style="fill:var(--gold-pane,#f6c84a)"><rect x="162" y="56" width="17" height="17"/><rect x="183" y="56" width="17" height="17"/><rect x="162" y="77" width="17" height="17"/><rect x="183" y="77" width="17" height="17"/></g><path d="M212 139H96Q66 139 66 169V247Q66 277 96 277H206" fill="none" stroke="url(#gopu-gold)" stroke-width="22"/><path d="M130 214H297M206 203V288" fill="none" stroke="url(#gopu-gold)" stroke-width="22"/><rect x="285" y="60" width="24" height="228" fill="url(#gopu-gold)"/>`;
ICONS.sun = svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/>');
ICONS.moon = svg('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>');

export { ICONS, LOGO_SHAPES, LOGO_VIEWBOX };
