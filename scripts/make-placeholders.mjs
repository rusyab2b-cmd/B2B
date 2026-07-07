// Yer tutucu WebP görselleri üretir (public/images altına) — koyu tema tonlarında.
// Gerçek görseller geldiğinde aynı dosya adlarıyla üzerine yazmanız yeterli.
// Çalıştırma: npm run placeholders
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = new URL('../public/images/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

const IMAGES = [
  { name: 'hero.webp', w: 960, h: 816, label: 'GÖRSEL · HERO — Türk ürünü + Rus alıcı iş görüşmesi' },
  { name: 'surec-band.webp', w: 1440, h: 276, label: 'GÖRSEL · ATMOSFER — Moskova / toplantı / otel lobisi' },
  { name: 'logo-1.webp', w: 264, h: 104, label: 'Firma logosu' },
  { name: 'logo-2.webp', w: 264, h: 104, label: 'Firma logosu' },
  { name: 'logo-3.webp', w: 264, h: 104, label: 'Firma logosu' },
  { name: 'logo-ticaret-odasi.webp', w: 264, h: 104, label: 'Ticaret Odası rozeti' },
  { name: 'logo-eac.webp', w: 264, h: 104, label: 'EAC sertifika rozeti' },
];

function svgPlaceholder(w, h, label) {
  const fs = Math.max(12, Math.min(w, h) / 16);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="#1b212a"/>
    <rect x="4" y="4" width="${w - 8}" height="${h - 8}" fill="none" stroke="#3a4250" stroke-width="2" stroke-dasharray="10 8"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
      font-family="system-ui, sans-serif" font-size="${fs}" fill="#a3aab2">${label
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>
  </svg>`);
}

for (const img of IMAGES) {
  await sharp(svgPlaceholder(img.w, img.h, img.label))
    .webp({ quality: 80 })
    .toFile(OUT + img.name);
  console.log('✓', img.name, `${img.w}x${img.h}`);
}
console.log('Tamam — public/images altındaki dosyaları gerçek görsellerle değiştirin.');
