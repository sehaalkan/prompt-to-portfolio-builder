---
# 📌 PROJECT DELIVERY DASHBOARD

* **GitHub Repository:** https://github.com/sehaalkan/prompt-to-portfolio-builder
* **Production Live Link:** https://prompt-to-portfolio-builder.vercel.app

### 💡 Project Overview
**Visual Muse**, ham fotoğraf arşivlerini saniyeler içinde lüks bir editoryal sanat dergisi mantığıyla dijital sergiye dönüştüren, Gemini API destekli minimalist bir portfolyo üretecidir.

### ⚙️ Technology Stack & AI Integration
* **Frontend Architecture:** Vite, React, Tailwind CSS
* **Core AI Integration:** Gemini API (Context-Aware Prompt Engineering & Dynamic Tagging)
* **Co-Programming & Infrastructure:** Cursor AI, Git, Vercel

---

# Visual Muse: AI-Driven Minimalist Editorial Portfolio Generator

**Yönetim Bilişim Sistemleri (MIS) Final Projesi**  
Fotoğrafçılar ve görsel içerik üreticileri için yapay zeka destekli, editoryal portfolyo oluşturma platformu.

---

## Proje Özeti

Visual Muse (Prompt-to-Portfolio Builder); kullanıcının kimlik bilgilerini, estetik tercihlerini ve fotoğraflarını üç adımlı bir sihirbaz (wizard) arayüzü üzerinden toplayan, Google Gemini 2.5 Flash multimodal modeli ile görselleri analiz eden ve sonuçları bağımsız bir HTML dosyası olarak dışa aktaran web tabanlı bir uygulamadır. Proje; teknik uygulama, yapay zeka entegrasyonu ve kullanıcı deneyimi boyutlarında bütünleşik bir MIS çözümü sunmayı hedefler.

---

## 1. Fikir ve Problem Tanımı

### Problem
Görsel içerik üreticileri (fotoğrafçılar, tasarımcılar, dijital sanatçılar) portfolyo web sitelerini oluştururken şu sürtünmelerle karşılaşmaktadır:

| Sorun | Etki |
|-------|------|
| Kodlama ve galeri düzeni | Saatler süren teknik efor |
| Görsel alt metin / açıklama yazımı | Tutarsız veya jenerik içerik |
| Sosyal medya ve kimlik bilgisi entegrasyonu | Parçalı, manuel HTML düzenleme |
| Mobil uyumluluk | Responsive tasarım bilgisi gereksinimi |
| Çok dilli içerik ihtiyacı | TR/EN geçişinde içerik kopukluğu |

### Çözüm Yaklaşımı
Bu proje, **prompt-to-portfolio** paradigmasını benimser: Kullanıcı yalnızca kimliğini, estetik tarzını ve görsellerini girer; sistem yapay zeka ile teknik-analitik açıklamalar üretir, editoryal bir arayüzde sunar ve tek tıkla dışa aktarılabilir HTML çıktısı oluşturur.

### Hedef Kitle
- Bağımsız fotoğrafçılar ve görsel sanatçılar
- Portfolyo ihtiyacı olan öğrenciler ve serbest çalışanlar
- Hızlı, profesyonel ve minimal sunum arayan dijital içerik üreticileri

---

## 2. Teknik Uygulama

### Mimari Genel Bakış

```
┌─────────────────────────────────────────────────────────┐
│                    React SPA (Vite)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Step 01  │→ │ Step 02  │→ │ Step 03  │→ │  Export  │ │
│  │ Kimlik   │  │ Atmosfer │  │ Galeri   │  │  HTML    │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
│         PortfolioContext · LanguageContext · ThemeContext│
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS (REST)
                         ▼
              Google Gemini 2.5 Flash API
              (multimodal · JSON response)
```

### Teknoloji Yığını

| Katman | Teknoloji | Gerekçe |
|--------|-----------|---------|
| Frontend | React 19 + TypeScript + Vite | Tip güvenliği, hızlı geliştirme |
| Styling | Tailwind CSS | Utility-first, responsive tasarım |
| AI Engine | Google Gemini 2.5 Flash | Multimodal görsel analiz, JSON çıktı |
| State Yönetimi | React Context API | Wizard adımları arası global durum |
| i18n | Özel LanguageContext (TR/EN) | Çift dilli arayüz ve AI çıktısı |
| Görsel İşleme | Client-side optimizer (max 1024px) | API payload optimizasyonu |
| Dağıtım | Vercel | Statik SPA hosting |

### Temel Modüller

| Modül | Dosya / Konum | Sorumluluk |
|-------|---------------|------------|
| Gemini Servisi | `src/services/geminiService.ts` | Prompt oluşturma, API çağrısı, parse & fallback |
| Sosyal Linkler | `src/utils/socialLinks.ts` | URL normalizasyonu, conditional rendering |
| Lokalizasyon | `src/utils/localizedAnalysis.ts` | TR/EN çift dilli AI açıklama seçimi |
| HTML Export | `src/utils/exportPortfolio.ts` | Bağımsız, tıklanabilir linkli HTML üretimi |
| Wizard Adımları | `src/components/wizard/` | Step1Profile, Step2VibeUpload, Step3BentoGallery |

### Veri Akışı

1. **Step 01** — Profil (ad, unvan) ve sosyal medya alanları `PortfolioContext`'e yazılır.
2. **Step 02** — Estetik tarz(lar) seçilir; görseller client-side optimize edilerek yüklenir.
3. **Analiz** — Seçili tarzlar (`selectedTones`) ve dil state'i ile Gemini API'ye çift dilli istek gönderilir.
4. **Step 03** — Masonry galeri; `description_en` / `description_tr` dil toggle ile anında değişir.
5. **Export** — Tüm veriler self-contained HTML'e gömülür; sosyal linkler tıklanabilir kalır.

---

## 3. Yapay Zeka (AI) Kullanımı ve Değer Katımı

### AI'ın Rolü
Google Gemini 2.5 Flash, yüklenen her fotoğraf için:

- **Kompozisyon & geometri** — çizgiler, perspektif, alan derinliği, öge yerleşimi
- **Renk & ışık** — baskın palet, ışık yönü, atmosfer
- **Hikaye & duygu** — sahnedeki gerçek içeriğe (portre, doğa, makro, etkinlik vb.) dayalı editoryal özet

üreten maksimum **2 cümlelik** editoryal açıklamalar oluşturur.

### Prompt Engineering — Kritik Tasarım Kararları

Projede yaşanan **jenerik AI çıktısı** problemi (ör. her görsele "botanik samimiyet", "sinematik ritim", "sokak sahnesi" yapıştırılması) sistematik prompt mühendisliği ve kod tarafı zorlaması ile çözülmüştür:

| Kural | Uygulama |
|-------|----------|
| **selectedTones zorunluluğu** | `tones_en` / `tones_tr` dizileri yalnızca kullanıcının arayüzde seçtiği tarzlardan oluşur; AI'ın uydurduğu "Kompozisyon", "Işık", "Street" gibi ek etiketler kod tarafında override edilir |
| **Görsel kanıt zorunluluğu** | Prompt; portre, makro, doğa, etkinlik ayrımını zorunlu kılar; insan/çocuk içeren sahnelerde botanik veya sokak anlatısı yasaklanır |
| **Klişe yasağı** | "Harika fotoğraf", "botanik samimiyet", "sinematik ritim" gibi ezbere şablonlar açıkça yasaklanmıştır |
| **Çift dilli çıktı** | Tek API çağrısında `description_en`, `description_tr`, `tones_en`, `tones_tr` üretilir; dil toggle anında çalışır |
| **Graceful fallback** | API hatası veya parse hatasında stil-bilinçli yerel fallback devreye girer; uygulama çökmez |

### Örnek Prompt Yapısı (Özet)

```
Crucial: tones arrays must contain ONLY user-selected styles: [Minimalist]
Do NOT invent keywords. Look at what is INSIDE the photo.
If people/children are visible → describe human subject and natural emotion.
If macro/nature → discuss shallow DOF, organic geometry — NOT street vocabulary.
Maximum 2 sentences. Professional curator tone. No generic praise.
```

### AI Değer Katkısı

| Geleneksel Süreç | Bu Proje ile |
|------------------|--------------|
| Manuel caption yazımı (~5 dk/görsel) | Otomatik, görsele özel analiz (~3 sn/görsel) |
| Tutarsız etiketleme | Kullanıcı tarz seçimine bağlı tutarlı tones |
| Tek dilde içerik | TR/EN eş zamanlı üretim |
| SEO/erişilebilirlik ihmal | Yapılandırılmış alt metin ve semantik HTML export |

---

## 4. Kullanıcı Deneyimi (UI/UX) Tasarım Kararları

Proje boyunca iteratif UI/UX iyileştirmeleri uygulanmış; aşağıdaki başlıklar final sürümün temel tasarım ilkelerini yansıtmaktadır.

### 4.1 Editoryal Minimalizm — Vogue Çizgisine Geçiş

**Problem:** İlk sürümde kaba kutu formları, ağır gölgeler ve teknik spinner'lar arayüzü "demo" hissi veriyordu.

**Çözüm:**
- Step 01 form alanları `camera-body` kutu stiline geçirildi: mat arka plan, ince border, minimal etiketler
- Sosyal medya alanlarında `@` / prefix sabitlenerek Instagram ve Twitter için tutarlı giriş deneyimi sağlandı
- Step 02 analiz ekranındaki beyaz kutu kaldırıldı; sinematik loading bar (`w-48 h-[1px]`, vizör kırmızısı ilerleme) eklendi
- Step 03 galeri krem zemin (`#fcfbf9`), masonry düzen ve editoryal tipografi ile tamamlandı

### 4.2 Dinamik Sanatçı Künyesi (Artist Credits Line)

**Problem:** Sosyal medya alanları doldurulsa bile yalnızca Instagram görünüyordu; linkler tıklanabilir değildi.

**Çözüm:** `src/utils/socialLinks.ts` modülü ile:

- Yalnızca **doldurulmuş** alanlar render edilir (conditional rendering); boş alanlar arayüzü kirletmez
- Ham input (`@kullanici`, `linkedin.com/in/slug`, `yoursite.com`) gerçek URL'lere normalize edilir
- Başlık altında premium künye formatı:

  ```
  IG: @kullanici / LN: @kullanici / X: @kullanici / WEB
  ```

- Stil: `font-mono text-[11px] tracking-[0.15em] text-neutral-500`, hover'da `underline-offset-4`
- Export HTML'de aynı yapı korunur; linkler tıklanabilir kalır

### 4.3 Milimetrik Hizalama Düzeltmeleri (Align-Left Fix)

**Problem:** Masonry galeride sağ sütundaki açıklama metinleri fotoğraf sol kenarından kayıyordu; form alanları arasında tipografi uyumsuzluğu vardı.

**Çözüm:**
- Masonry kartları `inline-block` yerine `block break-inside-avoid` yapısına geçirildi
- Fotoğraf, açıklama (`mt-3`) ve etiket (`mt-2 mb-8`) dikey boşlukları standartlaştırıldı
- LinkedIn / Website input'ları aynı `plainRow` editoryal satır stiline eşitlendi
- Tüm metin blokları `text-left w-full` ile fotoğraf sol kenarına hizalandı

### 4.4 Responsive Tasarım (Mobil & Masaüstü)

Tüm wizard adımları mobil öncelikli grid yapısına geçirildi:

| Ekran | Düzenleme |
|-------|-----------|
| **Step 01** | `grid-cols-1 md:grid-cols-2`, mobil `px-4` |
| **Step 02** | Alt bar `flex-col-reverse sm:flex-row`; butonlar mobilde tam genişlik |
| **Step 03** | Üst kontrol barı `flex-col md:flex-row`; masonry `columns-1 md:columns-2` |
| **Export HTML** | Tailwind responsive sınıfları ile aynı kırılım noktaları |

### 4.5 Çok Dilli Deneyim (i18n)

- Arayüz metinleri TR/EN toggle ile anında değişir
- AI açıklamaları çift dilli üretilir; galeri dil değişiminde yeniden analiz gerektirmez
- Loading, buton ve form placeholder metinleri dil state'ine bağlıdır

---

## 5. Gen-AI Akademik Dürüstlük Beyanı

Bu proje kapsamında yapay zeka araçlarının kullanımı aşağıda şeffaf biçimde beyan edilmektedir:

| Kategori | Araç / Yöntem | Kullanım Amacı |
|----------|---------------|----------------|
| **Üretken AI (Runtime)** | Google Gemini 2.5 Flash API | Yüklenen fotoğrafların multimodal analizi; editoryal açıklama ve tarz etiketi üretimi |
| **Kod Geliştirme Desteği** | Cursor IDE + AI asistan | Bileşen yapısı, prompt mühendisliği, UI iterasyonları, hata ayıklama |
| **Tasarım Kararları** | İnsan (proje sahibi) + AI öneri | Editoryal minimalizm yönü, renk hiyerarşisi, UX akış onayı |

### Beyan
1. **Gemini API çıktıları** son kullanıcıya sunulmadan önce prompt kuralları ve kod tarafı `selectedTones` zorlaması ile filtrelenmektedir; AI tek başına nihai içerik kontrolörü değildir.
2. **Proje mimarisi, state yönetimi, export mantığı ve güvenlik** (API key `.env` yönetimi) insan tasarımıdır.
3. **UI/UX iterasyonları** (editorial künye, hizalama, responsive grid) kullanıcı geri bildirimi ve tasarım prensipleri doğrultusunda bilinçli olarak uygulanmıştır.
4. Bu README dosyasının hazırlanmasında AI asistan desteklenmiş; içerik proje sahibi tarafından doğrulanmış ve akademik teslim amacına uygun hale getirilmiştir.
5. Üçüncü taraf API (Google Gemini) kullanımı, Google AI Terms of Service kapsamındadır; API anahtarı kaynak kod deposuna commit edilmemektedir.

---

## Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 18+
- [Google Gemini API anahtarı](https://aistudio.google.com/apikey)

### Kurulum

```bash
npm install
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

> **Güvenlik:** `.env` dosyası `.gitignore` kapsamındadır; API anahtarı asla commit edilmemelidir.

### Geliştirme Sunucusu

```bash
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

### Production Build

```bash
npm run build
```

### Vercel Dağıtımı

1. Depoyu GitHub'a push edin
2. [Vercel](https://vercel.com) üzerinde projeyi import edin
3. **Settings → Environment Variables** altına `VITE_GEMINI_API_KEY` ekleyin
4. Deploy

---

## Proje Yapısı

```
src/
├── components/
│   ├── wizard/           # Step1Profile, Step2VibeUpload, Step3BentoGallery
│   └── ui/               # MinimalInput, SocialLinksLine, DashDropZone, ...
├── context/              # PortfolioContext, LanguageContext, ThemeContext
├── i18n/                 # TR/EN çeviri sözlüğü
├── services/             # geminiService.ts — prompt & API entegrasyonu
├── types/                # TypeScript tip tanımları
└── utils/
    ├── socialLinks.ts    # Dinamik sanatçı künyesi & URL normalizasyonu
    ├── localizedAnalysis.ts  # TR/EN açıklama seçimi
    ├── exportPortfolio.ts    # HTML export
    └── imageOptimizer.ts     # Client-side görsel sıkıştırma
```

---

## Wizard Akışı

| Adım | Ekran | İşlev |
|------|-------|-------|
| **01 — Kimlik** | Profil formu + viewfinder kart | Ad, unvan, sosyal medya (editorial kutu stili) |
| **02 — Atmosfer** | Tarz seçimi + fotoğraf yükleme | Vibe grid, drag-drop, sinematik AI analiz bar |
| **03 — Galeri** | Masonry portfolyo + export | Çift dilli açıklamalar, sanatçı künyesi, HTML indirme |

---

## Lisans

MIT

---

*Bu dokümantasyon, Yönetim Bilişim Sistemleri final projesi teslim kriterlerine (Fikir ve Problem Tanımı · Teknik Uygulama · AI Kullanımı ve Değer Katımı · UI/UX · Gen-AI Akademik Dürüstlük Beyanı) uygun olarak hazırlanmıştır.*
