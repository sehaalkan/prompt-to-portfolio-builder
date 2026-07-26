# Product Requirement Document (PRD): Prompt-to-Portfolio Builder

## 1. Ürün Genel Bakış (Overview)

* **Ürün Adı:** Prompt-to-Portfolio Builder

* **Problem:** Fotoğrafçılar, tasarımcılar ve dijital içerik üreticileri işlerini sergilemek için hızlı, şık ve anlamlı hikayelerle süslenmiş portfolyo sitelerine ihtiyaç duyar. Ancak kodlama bilmemek, galeri tasarımlarıyla saatlerce uğraşmak, fotoğraflara etkileyici açıklamalar yazmak ve SEO optimizasyonu yapmak ciddi bir zaman kaybıdır.

* **Çözüm:** Kullanıcının sadece fotoğraflarını yükleyip portfolyonun "havasını/tarzını" (vibe) kelimelerle tarif ettiği, yapay zekanın (Gemini 2.5 Flash) ise görselleri analiz ederek sanatsal hikayeler, teknik etiketler ve dinamik bir arayüz tasarımı ürettiği tek sayfalık otonom bir portfolyo oluşturucu.

* **Hedef Kitle:** Fotoğrafçılar, tasarımcılar, sanata ve görsel üretime ilgi duyan bağımsız profesyoneller.

---

## 2. Teknik Mimari & Teknolojik Yığın (Tech Stack)

Projenin 24 saat içinde sıfırdan canlıya alınabilmesi ve sunucu maliyetlerinden kaçınılması için tamamen **Client-Side (İstemci Taraflı)** bir mimari tercih edilmiştir.

* **Frontend Framework:** React.js (Vite altyapısı ile hızlı kurulum)

* **Styling (Tasarım):** Tailwind CSS (Modern, temiz ve hızlı bileşen mimarisi için)

* **AI Engine (Yapay Zeka Motoru):** Google Gemini 2.5 Flash API (Multimodal/Vizyon yetenekleri yüksek ve ücretsiz/uygun fiyatlı olduğu için)

* **Deployment (Canlıya Alma):** Vercel (GitHub entegrasyonu ile otomatik CI/CD)

* **State Management (Veri Yönetimi):** React Context API veya Local State (Harici veritabanı kurulumu gerekmez, veriler tarayıcı oturumunda tutulur)

---

## 3. Özellik Seti & Fonksiyonel Gereksinimler (Functional Requirements)

### 3.1. Konfigürasyon ve Profil Yönetimi (Giriş Paneli)

 *Kullanıcı adını, soyadını, profesyonel unvanını (örn.* Sokak Fotoğrafçısı*) ve sosyal medya bağlantılarını (Instagram, LinkedIn vb.) girebilmelidir.

* Kullanıcı, portfolyonun stilini belirlemek için bir metin alanına "dramatik ve minimalist", "cyberpunk ve neon", "retro ve sıcak" gibi promptlar yazabilmelidir veya hazır şablon butonlarından seçim yapabilmelidir.

### 3.2. Multimodal AI Görsel Analizi (AI Sihirbazı)

* Kullanıcı sürükle-bırak yöntemiyle veya dosya seçerek birden fazla görsel yükleyebilmelidir.

* Görsel yüklendiği an client-side üzerinde bir `FileReader` ile `base64` formatına dönüştürülmeli ve Gemini API'ye gönderilmelidir.

* **Gemini Prompt Stratejisi:** Yapay zekaya şu görevler verilmelidir:

  1. Fotoğrafın kompozisyonunu, renk paletini ve duygusunu analiz et.

  2. Fotoğraf için 2-3 cümlelik sanatsal/etkileyici bir arka plan hikayesi yaz.

  3. Fotoğraf için teknik etiketler (örn. *Siyah-Beyaz, Mimari, Altın Saat*) ve SEO uyumlu alt-etiketler (alt-text) üret.

* Analiz sırasında arayüzde şık bir yapay zeka yükleniyor (skeleton/loading) animasyonu gösterilmelidir.

### 3.3. Canlı Önizleme & Dinamik Tema Yönetimi (Live Preview)

* Yapay zekadan dönen verilere ve kullanıcının seçtiği "vibe" promptuna göre sağ taraftaki önizleme ekranı anlık olarak güncellenmelidir.

 *Seçilen tarza göre (örneğin* Minimalist* seçildiyse geniş boşluklar ve ince fontlar; *Cyberpunk* seçildiyse koyu arka plan ve neon kenarlıklar) Tailwind sınıfları dinamik olarak önizleme kartlarına enjekte edilmelidir.

### 3.4. Dışa Aktarma (Export) Modülü

* Kullanıcı oluşturulan portfolyoyu beğendiğinde, "Export Portfolio" butonuna basarak tek bir `.html` dosyası (içerisinde Tailwind CDN bağlantısı ve tüm AI tarafından üretilmiş içeriklerin gömülü olduğu saf kod) halinde bilgisayarına indirebilmelidir.

---

## 4. Kullanıcı Deneyimi & Tasarım (UI/UX)

* **Tema:** Varsayılan olarak Koyu Tema (Dark Mode) benimsenecektir. `#0B0F19` gibi derin gece mavisi/gri tonlar arka planda kullanılacaktır.

* **Düzen (Layout):** Ekran büyük monitörlerde iki dikey sütuna ayrılacaktır:

  * **Sol Sütun (Kontrol Paneli):** Girdiler, görsel yükleme alanları ve AI tetikleyicileri.

  * **Sağ Sütun (Canlı Önizleme):** Kullanıcının nihai web sitesinin tam olarak nasıl görüneceğini gösteren interaktif alan.

* **Mobil Uyumluluk:** Mobil cihazlarda düzen dikey olarak üst üste binecektir (Önce kontrol, altında önizleme).

---

## 5. Güvenlik & Performans (Security & Performance)

* **API Key Güvenliği:** API anahtarı kesinlikle kaynak koda doğrudan yazılmayacaktır. Proje kök dizinindeki `.env` dosyasından `VITE_GEMINI_API_KEY`) okunacaktır. GitHub reposuna yüklenmemesi için `.gitignore` dosyasına `.env` satırı eklenecektir. Vercel üzerinde canlıya alınırken "Environment Variables" sekmesinden tanımlanacaktır.

* **Görsel Optimizasyonu:** Tarayıcı tarafında büyük fotoğrafların API'yi yormaması veya hata vermemesi için yüklenen görseller Gemini'ye gönderilmeden önce canvas yardımıyla maksimum 1024px genişliğe optimize edilerek sıkıştırılacaktır.

---

## 6. Proje Teslimat & Dokümantasyon Gereksinimleri

* **GitHub Reposu:** Temiz bir klasör yapısı, anlamlı commit mesajları.

* **[README.md](http://README.md) Dosyası:**

  * Projenin adı ve çözdüğü problemin kısa tanımı.

  * Ekran görüntüleri veya canlı uygulama linki.

  * Kurulum adımları `npm install`, `npm run dev`).

  * Kullanılan yapay zeka istemleri (prompt) örnekleri ve AI'ın projeye kattığı değerin açıklaması.