# RUSYA2B2 — Ana Sayfa

Türkiye'den Rusya'ya B2B danışmanlık markası **RUSYA2B2** için tek sayfalık tanıtım sitesi.
[Astro](https://astro.build) ile kurulmuştur; Netlify'a statik olarak deploy edilir.

> Marka sabitleri (değişmez): İsim **RUSYA2B2** · Birincil renk **#1E5FA6** · Birincil eylem **"Ücretsiz ön görüşme"**.

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

| Dosya | Boyut (px) | İçerik (brief §6) |
|---|---|---|
| `hero.webp` | 960×816 (4:3.4) | Türk ürünü + Rus alıcı iş görüşmesi / tokalaşma (yatay, sıcak, insanlı) |
| `surec-band.webp` | 1440×276 (6:1.15) | Moskova / toplantı / otel lobisi — atmosferik bant |
| `iletisim-siluet.webp` | 1440×900 | Şehir silüeti (CSS %14 opaklıkla basar, düz görsel koyun) |
| `logo-1..3.webp` | 264×104 | Çalışılan firma logoları |
| `logo-ticaret-odasi.webp` | 264×104 | Ticaret Odası rozeti |
| `logo-eac.webp` | 264×104 | EAC sertifika rozeti |

Yer tutucuları yeniden üretmek isterseniz: `npm run placeholders`

Tüm görseller lazy-load'dur (hero hariç — ekran üstü olduğu için `loading="eager"` + `fetchpriority="high"`).

## Proje yapısı

```
src/
├── styles/global.css        # design token'lar (CSS değişkenleri) + tüm stiller
├── scripts/animations.js    # count-up, scroll reveal, stagger, bar büyümesi
├── layouts/BaseLayout.astro  # fontlar (Sora + Inter), meta, skip-link
├── components/               # bölüm sırasıyla:
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── Trust.astro
│   ├── Sektor.astro
│   ├── Surec.astro
│   ├── Paket.astro
│   ├── Veri.astro
│   ├── Iletisim.astro        # Netlify Forms
│   └── Footer.astro
└── pages/
    ├── index.astro
    └── tesekkurler.astro     # form sonrası "24 saatte dönüş" onayı
```

## Tasarım kuralları (özet)

Ayrıntı için `RUSYA2B2-tasarim-brief.md` kaynağına bakın. Kısaca:

- Tek uzun sayfa, tek CTA: **"Ücretsiz ön görüşme"**. Self-servis SaaS CTA'sı, yıldız puanı, carousel **yok**.
- Renk: mavi ailesi + nötr; beyazdan koyu laciverte tek dikey gradient. İkiden fazla vurgu rengi **yok**.
- Tipografi: başlıklar **Sora**, gövde **Inter** — self-hosted (`@fontsource`, `display=swap`); ikonlar Tabler'dan derlemede gömülür, çalışma anında dış CDN yoktur.
- Animasyonlar anlatım içindir; `prefers-reduced-motion` durumunda tümü kapanır.
- Sektör/veri filtreleri v1'de görsel/statiktir; gerçek filtreleme 2. faz işidir.
