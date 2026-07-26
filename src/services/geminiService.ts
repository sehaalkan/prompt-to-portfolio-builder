import type { GeminiAnalysisResponse } from '../types'
import type { Language } from '../i18n/translations'
import { getGeminiApiKey } from '../utils/env'
import { cleanDescription } from '../utils/cleanDescription'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

const JSON_FORMAT_GUARANTEE =
  'You must return ONLY a raw JSON object. Do not include any markdown formatting like ```json ... ``` or any conversational text. Just the raw JSON string.'

type RawGeminiPayload = Partial<GeminiAnalysisResponse> & {
  description?: string
  tones?: string[]
  story?: string
  technicalTags?: string[]
}

const FALLBACK_DESCRIPTIONS_EN = [
  'The subject sits in a clean off-center frame with shallow depth of field, while soft ambient light and a restrained palette keep the moment readable and unforced.',
  'Center-weighted placement and crisp foreground detail define the structure, as even exposure and muted color keep the scene grounded in what is visibly present.',
  'Off-center framing and layered depth guide the eye toward the main subject, while balanced daylight and natural saturation preserve the moment\'s honest tone.',
  'Vertical lines and open negative space organize the composition, with diffused light and a neutral palette lending the frame calm observational clarity.',
  'Selective focus and tight cropping isolate the subject, while soft backlight and controlled contrast shape a direct, evidence-based reading of the scene.',
  'Diagonal structure and receding planes hold the frame with editorial restraint, as even exposure keeps the image tied to visible fact rather than invented drama.',
]

const FALLBACK_DESCRIPTIONS_TR = [
  'Özne, temiz bir merkez dışı kadrajda ve sığ alan derinliğiyle konumlanır; yumuşak ortam ışığı ve ölçülü palet ana zorlanmamış ve okunaklı kalmasını sağlar.',
  'Merkeze yakın yerleşim ve net ön plan detayı yapıyı belirler; eşit pozlama ve soluk renkler sahneyi görünür gerçekliğe bağlar.',
  'Merkez dışı kadraj ve katmanlı derinlik gözü ana özneye taşır; dengeli gün ışığı ve doğal doygunluk anın dürüst tonunu korur.',
  'Dikey çizgiler ve açık negatif alan kompozisyonu düzenler; dağılmış ışık ve nötr palet kadraja sakin bir gözlem netliği kazandırır.',
  'Seçici odak ve sıkı kırpma özneyi yalıtır; yumuşak arka ışık ve kontrollü kontrast sahnenin doğrudan, kanıta dayalı okumasını oluşturur.',
  'Çapraz yapı ve gerileyen düzlemler kadrajı editoryal bir ölçüyle tutar; eşit pozlama görüntüyü uydurma dramdan çok görünür gerçeğe bağlar.',
]


export type SelectedStyleTones = {
  en: string[]
  tr: string[]
}

const resolveUserTones = (selectedTones: SelectedStyleTones): { tones_en: string[]; tones_tr: string[] } => ({
  tones_en: selectedTones.en.length > 0 ? [...selectedTones.en] : [],
  tones_tr: selectedTones.tr.length > 0 ? [...selectedTones.tr] : [],
})

const buildStyleAwareFallback = (
  selectedTones: SelectedStyleTones,
  imageIndex: number
): GeminiAnalysisResponse => {
  const { tones_en, tones_tr } = resolveUserTones(selectedTones)

  return {
    description_en: FALLBACK_DESCRIPTIONS_EN[imageIndex % FALLBACK_DESCRIPTIONS_EN.length],
    description_tr: FALLBACK_DESCRIPTIONS_TR[imageIndex % FALLBACK_DESCRIPTIONS_TR.length],
    tones_en,
    tones_tr,
  }
}

export const createFallbackAnalysis = (
  selectedTones: SelectedStyleTones | string[] = { en: [], tr: [] },
  imageIndex = 0,
  _lang: Language = 'EN'
): GeminiAnalysisResponse => {
  const tones: SelectedStyleTones = Array.isArray(selectedTones)
    ? { en: selectedTones, tr: selectedTones }
    : selectedTones

  return buildStyleAwareFallback(tones, imageIndex)
}

const buildBilingualRule = (): string =>
  `Crucial instruction: You must generate the response strictly in BOTH English and Turkish as separate JSON fields.
- "description_en" and "tones_en" must be written in English.
- "description_tr" and "tones_tr" must be written in Turkish.
- Each description must read like a professional photography curator or critic — never generic praise.
- The Turkish and English descriptions must analyze the SAME photograph with the same observations, but must NOT be literal word-for-word translations. Each must read naturally in its language.`

const buildAnalysisPrompt = (selectedTones: SelectedStyleTones, imageIndex: number): string => {
  const selectedEn = selectedTones.en.length > 0 ? selectedTones.en : ['Minimalist']
  const selectedTr = selectedTones.tr.length > 0 ? selectedTones.tr : ['Minimalist']
  const styleListEn = selectedEn.join(', ')
  const styleListTr = selectedTr.join(', ')

  return `${buildBilingualRule()}

You are an expert photography curator and critic writing portfolio captions.

The user uploaded this photograph for their personal portfolio.
User-selected portfolio styles (English): ${styleListEn}
User-selected portfolio styles (Turkish): ${styleListTr}

Analyze THIS SPECIFIC photograph (image ${imageIndex + 1} in the series). Your caption must describe what is visibly inside THIS image — not abstract filler or rehearsed templates.

Write a maximum of TWO editorial sentences that weave together ALL THREE pillars using concrete, image-specific observations:

1. GEOMETRY & COMPOSITION — visible lines, perspective, depth of field, subject placement, framing.
2. COLOR & LIGHT — dominant palette, light direction, quality, and atmosphere on the scene.
3. STORY & EMOTION — identify what is actually in the frame (people, children, event, portrait, object, landscape, etc.) and describe the honest emotional read.

CONTENT ANALYSIS RULES (critical — obey strictly):
- Do NOT use generic, fake artistic templates such as "botanik samimiyet", "botanical intimacy", "sinematik ritim", or "cinematic rhythm" unless the image clearly shows that subject matter.
- Look at what is INSIDE the photo before writing a single word.
- If there are people, children, families, or groups smiling or interacting: describe composition, lighting, and focus in relation to the human subject and the natural emotion of the moment or event. Do NOT ignore people and invent nature, macro, or botanical narratives.
- If the scene is an event or celebration: reflect the social energy, grouping, and light on faces — not an unrelated genre.
- Ensure vocabulary naturally reflects the user-selected style(s): ${styleListEn}. For "Minimalist", focus on clean framing, lines, negative space, or isolated focus — without heavy artistic jargon or invented extra genres.
- Every sentence must cite visual evidence from THIS photograph.

TONES / KEYWORDS RULE (critical — highest priority):
- Do NOT invent any keywords. Do NOT add technical tags such as Composition, Light, Texture, Kompozisyon, Işık, Doku, Macro, Street, or any label the user did not select.
- You must strictly use ONLY the styles/tones chosen by the user.
- "tones_en" must contain EXACTLY these English style labels in this order, with no additions or omissions: [${selectedEn.map((t) => `"${t}"`).join(', ')}]
- "tones_tr" must contain EXACTLY these Turkish style labels in this order, with no additions or omissions: [${selectedTr.map((t) => `"${t}"`).join(', ')}]
- If the user only selected one style (e.g. "Minimalist"), each tones array must contain exactly one entry: ["Minimalist"] and ["Minimalist"] respectively — nothing else.

Strict prohibitions:
- NEVER write generic praise ("great photo", "beautiful moment", "harika bir fotoğraf", "çok güzel bir an").
- NEVER mention filenames, camera models, EXIF data, or file metadata.
- NEVER list the vibe/style names inside the description sentences — styles guide tone only; they belong in tones arrays only.
- Do not reuse the same sentence structure across images in a series.

Return a valid JSON object with EXACTLY these fields:
{
  "description_en": "Maximum 2 sentences in English. Grounded in visible content and user style tone.",
  "description_tr": "Maximum 2 sentences in Turkish. Grounded in visible content and user style tone.",
  "tones_en": ${JSON.stringify(selectedEn)},
  "tones_tr": ${JSON.stringify(selectedTr)}
}

Rules:
- Each description field: 1–2 sentences maximum.
- tones_en and tones_tr must match the arrays above EXACTLY — copy them verbatim.
- Do not include any extra fields.

${JSON_FORMAT_GUARANTEE}`
}

const stripFilenameArtifacts = (text: string): string =>
  text
    .replace(/["']?[A-Za-z0-9_-]+\.(jpe?g|png|webp|gif|heic|avif)["']?/gi, 'the frame')
    .replace(/\s{2,}/g, ' ')
    .trim()

const normalizeParsedResponse = (
  parsed: RawGeminiPayload,
  selectedTones: SelectedStyleTones,
  imageIndex: number
): GeminiAnalysisResponse => {
  const fallback = buildStyleAwareFallback(selectedTones, imageIndex)
  const enforcedTones = resolveUserTones(selectedTones)

  const legacyDescription = parsed.description?.trim() || parsed.story?.trim() || ''

  const descriptionEn = cleanDescription(
    stripFilenameArtifacts(parsed.description_en?.trim() || legacyDescription)
  ) || fallback.description_en

  const descriptionTr = cleanDescription(
    stripFilenameArtifacts(parsed.description_tr?.trim() || '')
  ) || fallback.description_tr

  return {
    description_en: descriptionEn,
    description_tr: descriptionTr,
    tones_en: enforcedTones.tones_en,
    tones_tr: enforcedTones.tones_tr,
  }
}

const parseGeminiResponse = (
  responseText: string,
  selectedTones: SelectedStyleTones,
  imageIndex: number,
  imageLabel: string
): GeminiAnalysisResponse => {
  let clean = responseText.replace(/```json/g, '').replace(/```/g, '').trim()

  const firstBracket = clean.indexOf('{')
  const lastBracket = clean.lastIndexOf('}')
  if (firstBracket !== -1 && lastBracket !== -1) {
    clean = clean.substring(firstBracket, lastBracket + 1)
  }

  try {
    const parsedData = JSON.parse(clean) as RawGeminiPayload
    const normalized = normalizeParsedResponse(parsedData, selectedTones, imageIndex)
    console.log(`[Gemini] Parse başarılı (${imageLabel}):`, normalized)
    return normalized
  } catch (error) {
    console.warn('Gemini parse hatası yaptı, yedek plan (fallback) devreye giriyor:', error)
    console.warn('Temizlenmiş ham metin:', clean)
    return createFallbackAnalysis(selectedTones, imageIndex)
  }
}

export const analyzeImage = async (
  base64: string,
  mimeType: string,
  selectedTones: SelectedStyleTones,
  imageIndex: number,
  imageLabel = 'image',
  lang: Language = 'EN'
): Promise<GeminiAnalysisResponse> => {
  const apiKey = getGeminiApiKey()
  const hasValidKey = Boolean(apiKey)

  if (!hasValidKey) {
    console.warn('[Gemini] API anahtarı bulunamadı — stil bazlı fallback kullanılıyor.')
    return createFallbackAnalysis(selectedTones, imageIndex, lang)
  }

  const payloadSizeKb = (base64.length * 0.75) / 1024
  console.log(
    `[Gemini] İstek gönderiliyor: ${imageLabel} | çift dil | tonlar EN: ${selectedTones.en.join(', ') || '—'} | TR: ${selectedTones.tr.join(', ') || '—'} | ~${payloadSizeKb.toFixed(1)} KB`
  )

  let response: Response

  try {
    response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: buildAnalysisPrompt(selectedTones, imageIndex) },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 768,
          responseMimeType: 'application/json',
        },
      }),
    })
  } catch (networkError) {
    console.warn('[Gemini] Bağlantı hatası — stil bazlı fallback kullanılıyor:', networkError)
    return createFallbackAnalysis(selectedTones, imageIndex, lang)
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    const message = errorData?.error?.message ?? `API request failed (${response.status})`
    console.warn(`[Gemini] API hatası (${response.status}) — stil bazlı fallback:`, message)
    return createFallbackAnalysis(selectedTones, imageIndex, lang)
  }

  let data: unknown

  try {
    data = await response.json()
  } catch (jsonError) {
    console.warn('[Gemini] Yanıt JSON okunamadı — stil bazlı fallback:', jsonError)
    return createFallbackAnalysis(selectedTones, imageIndex, lang)
  }

  const text = (data as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> })
    ?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) {
    console.warn('[Gemini] Boş yanıt — stil bazlı fallback:', data)
    return createFallbackAnalysis(selectedTones, imageIndex, lang)
  }

  console.log(`[Gemini] Ham yanıt (${imageLabel}):`, text)
  return parseGeminiResponse(text, selectedTones, imageIndex, imageLabel)
}

export const analyzeAllImages = async (
  images: Array<{ id: string; base64: string; mimeType: string; name?: string }>,
  selectedTones: SelectedStyleTones,
  lang: Language = 'EN',
  onProgress?: (completed: number, total: number) => void
): Promise<Map<string, GeminiAnalysisResponse>> => {
  console.log(
    `[Gemini] ${images.length} görsel için çift dilli analiz başlatılıyor... Tonlar EN: ${selectedTones.en.join(', ') || '—'} | TR: ${selectedTones.tr.join(', ') || '—'}`
  )

  const results = new Map<string, GeminiAnalysisResponse>()

  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    const label = image.name ?? `image-${i + 1}`

    console.log(`[Gemini] Analiz ${i + 1}/${images.length}: ${label}`)

    try {
      const analysis = await analyzeImage(
        image.base64,
        image.mimeType,
        selectedTones,
        i,
        label,
        lang
      )
      results.set(image.id, analysis)
    } catch (unexpectedError) {
      console.warn(`[Gemini] Beklenmeyen hata — stil bazlı fallback (${label}):`, unexpectedError)
      results.set(image.id, createFallbackAnalysis(selectedTones, i, lang))
    }

    onProgress?.(i + 1, images.length)
  }

  console.log('[Gemini] Tüm analizler tamamlandı.')
  return results
}
