import type { SelectableVibeTemplate } from '../types'

export type Language = 'EN' | 'TR'

export type VibeCopy = Record<SelectableVibeTemplate, { label: string; subtitle: string }>

export type TranslationStrings = {
  back: string
  export: string
  exporting: string
  instagram: string
  linkedin: string
  twitter: string
  website: string
  reading: string
  step1Label: string
  step1HeadingLine1: string
  step1HeadingPrimary: string
  step1HeadingSecondary: string
  step1HeadingHighlight: string
  step1HeadingTail: string
  step1Subcopy: string
  firstName: string
  lastName: string
  professionalTitle: string
  socialPresence: string
  socialUsernamePlaceholder: string
  linkedinPlaceholder: string
  websitePlaceholder: string
  nextStep: string
  step2Label: string
  step2HeadingPrefix: string
  step2HeadingVibe: string
  step2Subcopy: string
  chooseStyle: string
  selected: string
  uploadPhotos: string
  dropzoneTitle: string
  dropzoneRelease: string
  dropzoneHint: string
  dropzoneAria: string
  analyzeContinue: string
  analyzingContinue: string
  viewGallery: string
  duplicatePhoto: string
  step3Label: string
  exportSuccess: string
  noImages: string
  analyzing: string
  awaitingAnalysis: string
  errorNoImages: string
  vibes: VibeCopy
}

const vibeCopyEN: VibeCopy = {
  minimalist: { label: 'Minimalist', subtitle: 'Clean lines & negative space' },
  cyberpunk: { label: 'Cyberpunk', subtitle: 'Neon contrasts & futuristic dusk' },
  cinematic: { label: 'Cinematic', subtitle: 'Anamorphic crop & film tones' },
  dramatic: { label: 'Dramatic', subtitle: 'High contrast & deep shadows' },
  editorial: { label: 'Editorial', subtitle: 'High-fashion & magazine layout' },
  street: { label: 'Street', subtitle: 'Raw moments & candid geometry' },
}

const vibeCopyTR: VibeCopy = {
  minimalist: { label: 'Minimalist', subtitle: 'Temiz çizgiler ve negatif alan' },
  cyberpunk: { label: 'Siberpunk', subtitle: 'Neon kontrastlar ve fütürist alacakaranlık' },
  cinematic: { label: 'Sinematik', subtitle: 'Anamorfik kadraj ve film tonları' },
  dramatic: { label: 'Dramatik', subtitle: 'Yüksek kontrast ve derin gölgeler' },
  editorial: { label: 'Editoryal', subtitle: 'Yüksek moda ve dergi düzeni' },
  street: { label: 'Sokak', subtitle: 'Ham anlar ve samimi geometri' },
}

export const translations: Record<Language, TranslationStrings> = {
  EN: {
    back: 'BACK',
    export: 'EXPORT PORTFOLIO',
    exporting: 'EXPORTING...',
    instagram: 'INSTAGRAM:',
    linkedin: 'LINKEDIN',
    twitter: 'TWITTER',
    website: 'WEBSITE',
    reading: 'AI IS READING LIGHT, SHADOW, AND STORY...',
    step1Label: 'Step 01 — Identity',
    step1HeadingLine1: 'Who are you',
    step1HeadingPrimary: '',
    step1HeadingSecondary: 'behind the',
    step1HeadingHighlight: 'lens?',
    step1HeadingTail: '',
    step1Subcopy: 'Tell us your name and craft. This becomes the soul of your portfolio.',
    firstName: 'First Name',
    lastName: 'Last Name',
    professionalTitle: 'Professional Title',
    socialPresence: 'Social Presence',
    socialUsernamePlaceholder: 'username',
    linkedinPlaceholder: 'linkedin.com/in/username',
    websitePlaceholder: 'yoursite.com',
    nextStep: 'Next Step',
    step2Label: 'Step 02 — Atmosphere',
    step2HeadingPrefix: 'What is your',
    step2HeadingVibe: 'vibe',
    step2Subcopy: 'Choose one or more aesthetics to shape the unique atmosphere of your portfolio.',
    chooseStyle: 'Choose Your Style',
    selected: 'SELECTED',
    uploadPhotos: 'Upload Photographs',
    dropzoneTitle: 'Bring Your Visual Stories Into the Frame',
    dropzoneRelease: 'Release Into the Frame',
    dropzoneHint: 'Drag & drop or click to browse · PNG, JPG, WebP',
    dropzoneAria: 'Drag and drop images here or click to browse',
    analyzeContinue: 'Analyze & Continue',
    analyzingContinue: 'ANALYZING...',
    viewGallery: 'View Gallery',
    duplicatePhoto: 'This photograph is already in your frame.',
    step3Label: 'Step 03 — Gallery',
    exportSuccess: 'Portfolio exported successfully',
    noImages: 'No images yet',
    analyzing: 'Analyzing...',
    awaitingAnalysis: 'Awaiting AI analysis',
    errorNoImages: 'Upload at least one image to analyze.',
    vibes: vibeCopyEN,
  },
  TR: {
    back: 'GERİ',
    export: 'PORTFOLYOYU DIŞA AKTAR',
    exporting: 'DIŞA AKTARILIYOR...',
    instagram: 'INSTAGRAM:',
    linkedin: 'LINKEDIN',
    twitter: 'TWITTER',
    website: 'WEBSITE',
    reading: 'YAPAY ZEKA IŞIĞI, GÖLGEYİ VE HİKAYEYİ OKUYOR...',
    step1Label: 'Adım 01 — Kimlik',
    step1HeadingLine1: '',
    step1HeadingPrimary: 'Objektifin',
    step1HeadingSecondary: 'ardındaki',
    step1HeadingHighlight: 'sen,',
    step1HeadingTail: ' kimsin?',
    step1Subcopy: 'Adını ve ustalığını anlat. Portfolyonun ruhu burada şekillenir.',
    firstName: 'Ad',
    lastName: 'Soyad',
    professionalTitle: 'Mesleki Unvan',
    socialPresence: 'Sosyal Varlık',
    socialUsernamePlaceholder: 'kullaniciadi',
    linkedinPlaceholder: 'linkedin.com/in/kullaniciadi',
    websitePlaceholder: 'websiteniz.com',
    nextStep: 'Sonraki Adım',
    step2Label: 'Adım 02 — Atmosfer',
    step2HeadingPrefix: 'Senin',
    step2HeadingVibe: 'tarzın',
    step2Subcopy: 'Portfolyonun benzersiz atmosferini şekillendirmek için bir veya daha fazla estetik seç.',
    chooseStyle: 'Tarzını Seç',
    selected: 'SEÇİLDİ',
    uploadPhotos: 'Fotoğrafları Yükle',
    dropzoneTitle: 'Görsel Hikayelerini Kadraja Taşı',
    dropzoneRelease: 'Kadraja Bırak',
    dropzoneHint: 'Sürükle bırak veya gözat · PNG, JPG, WebP',
    dropzoneAria: 'Görselleri buraya sürükleyin veya göz atmak için tıklayın',
    analyzeContinue: 'Analiz Et ve Devam Et',
    analyzingContinue: 'ANALİZ EDİLİYOR...',
    viewGallery: 'Galeriyi Gör',
    duplicatePhoto: 'Bu fotoğraf zaten kadrajında.',
    step3Label: 'Adım 03 — Galeri',
    exportSuccess: 'Portfolyo başarıyla dışa aktarıldı',
    noImages: 'Henüz fotoğraf yok',
    analyzing: 'Analiz ediliyor...',
    awaitingAnalysis: 'Yapay zeka analizi bekleniyor',
    errorNoImages: 'Analiz için en az bir görsel yükleyin.',
    vibes: vibeCopyTR,
  },
}
