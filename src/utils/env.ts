const maskKey = (key: string): string => {
  if (key.length <= 8) return '****'
  return `${key.slice(0, 4)}...${key.slice(-4)}`
}

export const getGeminiApiKey = (): string => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined

  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    console.error('[Env] VITE_GEMINI_API_KEY bulunamadı veya geçersiz.')
    console.error('[Env] Proje kökünde .env dosyası oluşturup VITE_GEMINI_API_KEY=... ekleyin.')
    console.error('[Env] Değişiklikten sonra dev sunucusunu yeniden başlatın (npm run dev).')
    return ''
  }

  console.log('[Env] API Key yüklendi:', maskKey(apiKey.trim()))
  return apiKey.trim()
}

export const validateGeminiApiKeyOnStartup = (): void => {
  const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined

  if (!key || key.trim() === '' || key === 'your_gemini_api_key_here') {
    console.warn('[Env] ⚠ VITE_GEMINI_API_KEY tanımlı değil — AI analizi çalışmayacak.')
    return
  }

  console.log('[Env] ✓ VITE_GEMINI_API_KEY yüklendi:', maskKey(key.trim()))
}
