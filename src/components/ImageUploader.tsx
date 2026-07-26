import { usePortfolio } from '../context/PortfolioContext'
import { DropZone } from './ui/DropZone'
import { Button } from './ui/Button'
import { LoadingSkeleton } from './ui/LoadingSkeleton'

export const ImageUploader = () => {
  const {
    images,
    isAnalyzing,
    analysisProgress,
    addImages,
    removeImage,
    analyzeImages,
  } = usePortfolio()

  return (
    <section aria-labelledby="images-heading" className="space-y-4">
      <h2 id="images-heading" className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
        Images
      </h2>

      <DropZone onFilesSelected={addImages} disabled={isAnalyzing} />

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((image) => (
            <div key={image.id} className="relative group aspect-square rounded-lg overflow-hidden border border-night-100">
              <img
                src={`data:${image.mimeType};base64,${image.base64}`}
                alt={image.analysis?.description_en ?? image.name}
                className="w-full h-full object-cover"
              />
              {image.analysis && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              {!isAnalyzing && (
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  aria-label={`Remove ${image.name}`}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {isAnalyzing && (
        <LoadingSkeleton
          message="AI is crafting stories for your images..."
          progress={analysisProgress}
        />
      )}

      <Button
        onClick={analyzeImages}
        disabled={isAnalyzing || images.length === 0}
        isLoading={isAnalyzing}
        className="w-full"
        aria-label="Analyze images with AI"
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
      </Button>
    </section>
  )
}
