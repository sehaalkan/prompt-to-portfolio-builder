# Prompt-to-Portfolio Builder — Task Listesi

> PRD kaynağı: `prd.md`  
> Son güncelleme: 26 Temmuz 2026

---

## Faz 0 — Proje Kurulumu & Altyapı

### TASK-001: Vite + React projesi oluştur
- [ ] `npm create vite@latest` ile React (TypeScript) projesi kur
- [ ] Temel klasör yapısını oluştur: `src/components`, `src/context`, `src/hooks`, `src/utils`, `src/services`, `src/types`
- [ ] Geliştirme sunucusunun çalıştığını doğrula (`npm run dev`)

### TASK-002: Tailwind CSS entegrasyonu
- [ ] Tailwind CSS ve PostCSS bağımlılıklarını kur
- [ ] `tailwind.config.js` ve `postcss.config.js` dosyalarını yapılandır
- [ ] Varsayılan koyu tema renk paletini tanımla (`#0B0F19` arka plan vb.)
- [ ] Global stilleri `src/index.css` içinde ayarla

### TASK-003: Ortam değişkenleri & güvenlik yapılandırması
- [ ] `.env.example` dosyası oluştur (`VITE_GEMINI_API_KEY=`)
- [ ] `.env` dosyasını `.gitignore`'a ekle
- [ ] API anahtarının kaynak koda yazılmadığını doğrula
- [ ] Vercel deployment için environment variable notunu README'ye ekle

### TASK-004: State yönetimi altyapısı
- [ ] React Context API ile `PortfolioContext` oluştur
- [ ] Profil, vibe, görseller, AI analiz sonuçları ve tema state'lerini tanımla
- [ ] Context provider'ı uygulama köküne (`main.tsx` / `App.tsx`) bağla

---

## Faz 1 — UI/UX Layout & Ana Sayfa Yapısı

### TASK-005: İki sütunlu ana layout
- [ ] `App.tsx` içinde sol (Kontrol Paneli) ve sağ (Canlı Önizleme) sütun düzenini kur
- [ ] Koyu tema arka planını uygula (`bg-[#0B0F19]`)
- [ ] Masaüstünde yan yana, mobilde dikey (kontrol üstte, önizleme altta) responsive düzen
- [ ] Tailwind breakpoint'leri ile mobil uyumluluğu sağla

### TASK-006: Ortak UI bileşenleri
- [ ] `Button`, `Input`, `Textarea`, `Label` gibi temel bileşenleri oluştur
- [ ] Loading skeleton / AI analiz animasyonu bileşeni (`LoadingSkeleton.tsx`) oluştur
- [ ] Sürükle-bırak alanı bileşeni (`DropZone.tsx`) oluştur

---

## Faz 2 — Konfigürasyon & Profil Yönetimi (Giriş Paneli)

### TASK-007: Profil formu
- [ ] Kullanıcı adı, soyadı, profesyonel unvan alanlarını ekle
- [ ] Sosyal medya bağlantıları alanları ekle (Instagram, LinkedIn vb.)
- [ ] Form verilerini Context state'e bağla
- [ ] Erişilebilirlik: `aria-label`, `tabIndex`, klavye navigasyonu

### TASK-008: Vibe / stil seçimi
- [ ] Serbest metin vibe prompt alanı ekle ("dramatik ve minimalist", "cyberpunk ve neon" vb.)
- [ ] Hazır şablon butonları ekle (Minimalist, Cyberpunk, Retro vb.)
- [ ] Seçilen vibe'ı Context'e kaydet
- [ ] Şablon seçildiğinde metin alanını otomatik doldur

---

## Faz 3 — Görsel Yükleme & Optimizasyon

### TASK-009: Çoklu görsel yükleme
- [ ] Sürükle-bırak ile görsel yükleme desteği
- [ ] Dosya seçici (file input) ile görsel yükleme desteği
- [ ] Birden fazla görsel yükleme ve önizleme listesi
- [ ] Yüklenen görselleri kaldırma özelliği

### TASK-010: Client-side görsel optimizasyonu
- [ ] Canvas ile görselleri maksimum 1024px genişliğe yeniden boyutlandır
- [ ] Sıkıştırma uygula (JPEG/WebP kalite ayarı)
- [ ] `FileReader` ile base64 formatına dönüştür
- [ ] Optimizasyon utility fonksiyonunu `src/utils/imageOptimizer.ts` içinde yaz

---

## Faz 4 — Multimodal AI Görsel Analizi (Gemini)

### TASK-011: Gemini API servisi
- [ ] `src/services/geminiService.ts` dosyasını oluştur
- [ ] Gemini 2.5 Flash API entegrasyonu
- [ ] `VITE_GEMINI_API_KEY` ortam değişkeninden anahtar okuma
- [ ] Hata yönetimi ve kullanıcıya anlamlı hata mesajları

### TASK-012: AI prompt stratejisi
- [ ] Gemini'ye gönderilecek sistem prompt'unu tasarla:
  - Kompozisyon, renk paleti ve duygu analizi
  - 2-3 cümlelik sanatsal arka plan hikayesi
  - Teknik etiketler (Siyah-Beyaz, Mimari, Altın Saat vb.)
  - SEO uyumlu alt-text üretimi
- [ ] Kullanıcının vibe prompt'unu AI isteğine dahil et
- [ ] Yanıtı yapılandırılmış JSON formatında parse et

### TASK-013: AI analiz akışı & loading durumu
- [ ] "Analyze with AI" tetikleyici butonu ekle
- [ ] Analiz sırasında skeleton/loading animasyonu göster
- [ ] Her görsel için analiz sonuçlarını Context'e kaydet
- [ ] Analiz tamamlandığında önizlemeyi otomatik güncelle

### TASK-014: TypeScript tipleri
- [ ] `PortfolioProfile`, `ImageAnalysis`, `VibeTheme`, `SocialLinks` tiplerini tanımla
- [ ] Gemini API yanıt tipini tanımla

---

## Faz 5 — Canlı Önizleme & Dinamik Tema Yönetimi

### TASK-015: Portfolio önizleme bileşeni
- [ ] `LivePreview.tsx` bileşenini oluştur
- [ ] Profil bilgilerini (ad, unvan, sosyal linkler) göster
- [ ] AI tarafından üretilen hikayeleri ve etiketleri göster
- [ ] Görselleri galeri/grid düzeninde render et

### TASK-016: Dinamik tema enjeksiyonu
- [ ] Vibe prompt'una göre Tailwind sınıflarını dinamik uygula
- [ ] Minimalist tema: geniş boşluklar, ince fontlar
- [ ] Cyberpunk tema: koyu arka plan, neon kenarlıklar
- [ ] Retro tema: sıcak tonlar, vintage font hissi
- [ ] Tema haritasını `src/utils/themeMapper.ts` içinde merkezi yönet

### TASK-017: Anlık önizleme güncellemesi
- [ ] Profil, vibe veya analiz verisi değiştiğinde önizlemeyi reaktif güncelle
- [ ] Context state değişikliklerini önizleme bileşenine bağla

---

## Faz 6 — Dışa Aktarma (Export) Modülü

### TASK-018: HTML export fonksiyonu
- [ ] `src/utils/exportPortfolio.ts` dosyasını oluştur
- [ ] Tüm profil, görsel (base64), AI içerik ve tema stillerini tek HTML'e göm
- [ ] Tailwind CDN bağlantısını export HTML'ine ekle
- [ ] SEO meta etiketleri ve alt-text'leri HTML'e dahil et

### TASK-019: Export UI
- [ ] "Export Portfolio" butonu ekle
- [ ] Tek `.html` dosyası olarak indirme (`Blob` + `URL.createObjectURL`)
- [ ] Export sırasında loading durumu göster
- [ ] Export başarı/hata bildirimi

---

## Faz 7 — Deployment & Dokümantasyon

### TASK-020: Vercel deployment
- [ ] GitHub reposuna projeyi push et
- [ ] Vercel ile GitHub entegrasyonunu kur
- [ ] `VITE_GEMINI_API_KEY` environment variable'ını Vercel'de tanımla
- [ ] Canlı URL'yi doğrula

### TASK-021: README.md
- [ ] Proje adı ve çözdüğü problem tanımı
- [ ] Ekran görüntüleri ve/veya canlı uygulama linki
- [ ] Kurulum adımları (`npm install`, `npm run dev`, `.env` yapılandırması)
- [ ] Kullanılan AI prompt örnekleri
- [ ] AI'ın projeye kattığı değerin açıklaması
- [ ] Tech stack özeti

### TASK-022: Kod kalitesi & son kontroller
- [ ] Tüm bileşenlerde erişilebilirlik kontrolü
- [ ] Mobil responsive son test
- [ ] API key'in repoda sızmadığını doğrula
- [ ] Büyük görsellerin 1024px optimizasyonunu test et
- [ ] Export edilen HTML'in bağımsız çalıştığını doğrula

---

## Özet

| Faz | Task Sayısı | Açıklama |
|-----|-------------|----------|
| Faz 0 | 4 | Proje kurulumu & altyapı |
| Faz 1 | 2 | UI/UX layout |
| Faz 2 | 2 | Profil & vibe yönetimi |
| Faz 3 | 2 | Görsel yükleme & optimizasyon |
| Faz 4 | 4 | Gemini AI entegrasyonu |
| Faz 5 | 3 | Canlı önizleme & tema |
| Faz 6 | 2 | HTML export |
| Faz 7 | 3 | Deployment & dokümantasyon |
| **Toplam** | **22 task** | |

---

## Önerilen Uygulama Sırası

```
TASK-001 → TASK-002 → TASK-003 → TASK-004
    ↓
TASK-005 → TASK-006
    ↓
TASK-007 → TASK-008
    ↓
TASK-009 → TASK-010
    ↓
TASK-011 → TASK-012 → TASK-014 → TASK-013
    ↓
TASK-015 → TASK-016 → TASK-017
    ↓
TASK-018 → TASK-019
    ↓
TASK-020 → TASK-021 → TASK-022
```
