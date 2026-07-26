import { usePortfolio } from '../context/PortfolioContext'
import { generatePortfolioHtml, downloadPortfolioHtml } from '../utils/exportPortfolio'
import { Button } from './ui/Button'

export const ExportButton = () => {
  const { profile, images, exportStatus, setExportStatus } = usePortfolio()

  const handleExport = async () => {
    setExportStatus('exporting')

    try {
      const html = generatePortfolioHtml({ profile, images })
      const filename = `${profile.firstName || 'portfolio'}-${profile.lastName || 'export'}.html`
        .toLowerCase()
        .replace(/\s+/g, '-')

      downloadPortfolioHtml(html, filename)
      setExportStatus('success')
      setTimeout(() => setExportStatus('idle'), 3000)
    } catch {
      setExportStatus('error')
      setTimeout(() => setExportStatus('idle'), 3000)
    }
  }

  const statusMessage = {
    idle: null,
    exporting: 'Generating HTML...',
    success: 'Portfolio exported successfully!',
    error: 'Export failed. Please try again.',
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleExport}
        isLoading={exportStatus === 'exporting'}
        disabled={exportStatus === 'exporting'}
        variant="primary"
        size="lg"
        className="w-full"
        aria-label="Export portfolio as HTML file"
      >
        Export Portfolio
      </Button>

      {statusMessage[exportStatus] && (
        <p
          className={`text-xs text-center ${
            exportStatus === 'success' ? 'text-green-400' :
            exportStatus === 'error' ? 'text-red-400' : 'text-gray-400'
          }`}
          role="status"
          aria-live="polite"
        >
          {statusMessage[exportStatus]}
        </p>
      )}
    </div>
  )
}
