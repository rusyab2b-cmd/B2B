# RUSYA2B2 — Ana Sayfa

Türkiye'den Rusya'ya B2B danışmanlık markası **RUSYA2B2** için tek sayfalık tanıtım sitesi.
[Astro](https://astro.build) ile kurulmuştur; Netlify'a statik olarak deploy edilir.

> Marka sabitleri (değişmez): İsim **RUSYA2B2** · Birincil eylem **"Ücretsiz ön görüşme"**.
>
> Onaylı tasarım dili: **"Mürekkep & Kehribar"** — koyu mürekkep zemin (`#101418`),
> tek vurgu rengi kehribar (`#D6A24E`), keskin köşeler, hairline çizgiler,
> editoryal/premium danışmanlık estetiği.

## Nasıl çalıştırırım?

Gereksinim: Node.js 20+ (proje Node 22 ile test edildi).

```bash
npm install        # bağımlılıkları kur
npm run dev        # geliştirme sunucusu → http://localhost:4321
npm run build      # üretim çıktısı → dist/
npm run preview    # dist/ çıktısını yerelde önizle
```

Not: Netlify Forms sadece Netlify üzerinde çalışır; yerelde form gönderimi
`/tesekkurler/` sayfasına yönlenir ama kayıt oluşmaz.

## Nasıl deploy ederim? (Netlify)

1. Bu repoyu GitHub'a push'layın.
2. [Netlify](https://app.netlify.com) → **Add new site → Import an existing project** → bu repoyu seçin.
3. Ayarlar `netlify.toml`'dan otomatik gelir (build: `npm run build`, publish: `dist`). **Deploy**'a basın.

Alternatif, CLI ile:

```bash
npm install -g netlify-cli
netlify login
netlify init      # siteyi bağla
netlify deploy --build --prod
```

### Form bildirimleri (önemli — bir kere yapılır)

İletişim formu Netlify Forms kullanır (`name="on-gorusme"`). İlk deploy'dan sonra:

1. Netlify panel → **Forms** → `on-gorusme` formunun algılandığını doğrulayın.
2. **Forms → Form notifications → Add notification → Email notification** adımından
   bildirim adresini ekleyin: **[DEĞİŞTİR: form-bildirimi@rusya2b2.com]**
3. Test gönderimi yapın; başarılı gönderim ziyaretçiyi `/tesekkurler/`
   ("24 saatte dönüş" onay ekranı) sayfasına götürür, kayıt Forms sekmesine düşer.

Spam koruması: gizli honeypot alanı (`bot-field`) hazırdır; Netlify bunu otomatik kullanır.

## Görselleri değiştirme

Tüm görseller `/public/images` altında **yer tutucu** WebP dosyalarıdır.
Gerçek görselleri aynı ad ve orana sahip WebP dosyalarıyla üzerine yazmanız yeterli — kod değişikliği gerekmez:

| Dosya | Boyut (px) | İçerik |
|---|---|---|
| `hero.webp` | 960×816 (4:3.4) | Türk ürünü + Rus alıcı iş görüşmesi / tokalaşma (yatay, insanlı) |
| `surec-band.webp` | 1440×276 (6:1.15) | Moskova / toplantı / otel lobisi — atmosferik bant |
| `logo-1..3.webp` | 264×104 | Çalışılan firma logoları |
| `logo-ticaret-odasi.webp` | 264×104 | Ticaret Odası rozeti |
| `logo-eac.webp` | 264×104 | EAC sertifika rozeti |

Fotoğraflar CSS ile hafif siyah-beyaza çekilip koyulaştırılır (duotone/premium görünüm);
renkli fotoğraf koymanız sorun değil, filtre otomatik uygulanır.
Yer tutucuları yeniden üretmek isterseniz: `npm run placeholders`

Hero görseli ekran üstü olduğu için `loading="eager"` + `fetchpriority="high"`, kalanlar lazy-load'dur.

## Proje yapısı

```
src/
├── styles/global.css        # design token'lar (CSS değişkenleri) + tüm stiller
├── scripts/animations.js    # scroll reveal + veri barı büyümesi
├── layouts/BaseLayout.astro  # fontlar (Bricolage Grotesque + Inter), meta, skip-link
├── components/               # bölüm sırasıyla:
│   ├── Nav.astro
│   ├── Hero.astro            # asimetrik hero + 4'lü istatistik şeridi
│   ├── Trust.astro           # referans logo bandı
│   ├── Sektor.astro          # numaralı sektör endeksi (01–06)
│   ├── Surec.astro           # yapışkan başlık + 5 adım
│   ├── Paket.astro           # 3 sütunlu paket karşılaştırması
│   ├── Veri.astro            # sektör verisi kartları + rapor içeriği
│   ├── Guven.astro           # EAC / Ticaret Odası / yerel ekip rozetleri
│   ├── Iletisim.astro        # Netlify Forms
│   └── Footer.astro
└── pages/
    ├── index.astro
    └── tesekkurler.astro     # form sonrası "24 saatte dönüş" onayı
```

## Tasarım kuralları (özet)

- Tek uzun sayfa, tek CTA: **"Ücretsiz ön görüşme"**. Self-servis SaaS CTA'sı, yıldız puanı, carousel **yok**.
- Tek tema: koyu mürekkep — bölümler tema değiştirmez, sadece aynı aile içinde ton değişir
  (`--ink` / `--ink-2` / `--ink-3`).
- Tek vurgu rengi: kehribar `#D6A24E`. İkinci vurgu rengi **yok**.
- Köşeler keskin (radius 0), ayrımlar hairline çizgilerle (`--line`), kart gölgesi yok.
- Tipografi: başlıklar **Bricolage Grotesque**, gövde **Inter** — self-hosted
  (`@fontsource`, `display=swap`); çalışma anında dış CDN yoktur.
- Animasyonlar anlatım içindir (scroll reveal + bar büyümesi); `prefers-reduced-motion`
  durumunda tümü kapanır, JavaScript kapalıysa içerik yine tam görünür.
- Sektör endeksi ve veri filtreleri v1'de görsel/statiktir; gerçek filtreleme 2. faz işidir.
