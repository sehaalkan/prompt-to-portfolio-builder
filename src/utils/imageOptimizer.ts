const MAX_DIMENSION = 1024
const JPEG_QUALITY = 0.85

type OptimizedImage = {
  base64: string
  mimeType: string
  originalWidth: number
  originalHeight: number
  outputWidth: number
  outputHeight: number
}

const calculateDimensions = (
  width: number,
  height: number
): { width: number; height: number } => {
  if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
    return { width, height }
  }

  if (width >= height) {
    return {
      width: MAX_DIMENSION,
      height: Math.round((height * MAX_DIMENSION) / width),
    }
  }

  return {
    width: Math.round((width * MAX_DIMENSION) / height),
    height: MAX_DIMENSION,
  }
}

export const optimizeImage = (file: File): Promise<OptimizedImage> => {
  return new Promise((resolve, reject) => {
    console.log(`[Image] İşleniyor: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`)

    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        const originalWidth = img.width
        const originalHeight = img.height
        const { width, height } = calculateDimensions(originalWidth, originalHeight)

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas context could not be created'))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
        const dataUrl = canvas.toDataURL(mimeType, JPEG_QUALITY)
        const base64 = dataUrl.split(',')[1]

        const compressedKb = (base64.length * 0.75) / 1024

        console.log(
          `[Image] Görsel sıkıştırıldı: ${file.name} | ` +
          `${originalWidth}×${originalHeight} → ${width}×${height} | ` +
          `~${compressedKb.toFixed(1)} KB`
        )

        resolve({
          base64,
          mimeType,
          originalWidth,
          originalHeight,
          outputWidth: width,
          outputHeight: height,
        })
      }

      img.onerror = () => {
        console.error(`[Image] Yüklenemedi: ${file.name}`)
        reject(new Error(`Failed to load image: ${file.name}`))
      }

      img.src = event.target?.result as string
    }

    reader.onerror = () => {
      console.error(`[Image] Okunamadı: ${file.name}`)
      reject(new Error(`Failed to read file: ${file.name}`))
    }

    reader.readAsDataURL(file)
  })
}

export const processImageFiles = async (
  files: File[]
): Promise<Array<{ base64: string; mimeType: string; name: string }>> => {
  const imageFiles = files.filter((file) => file.type.startsWith('image/'))

  if (imageFiles.length === 0) {
    throw new Error('No valid image files selected')
  }

  console.log(`[Image] ${imageFiles.length} görsel sıkıştırılıyor...`)

  const results = await Promise.all(
    imageFiles.map(async (file) => {
      const optimized = await optimizeImage(file)
      return {
        base64: optimized.base64,
        mimeType: optimized.mimeType,
        name: file.name,
      }
    })
  )

  console.log(`[Image] ${results.length} görsel hazır.`)
  return results
}
