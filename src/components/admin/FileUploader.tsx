'use client'

import { useRef, useState } from 'react'
import { useFileUpload } from '@/hooks/useFileUpload'
import { Button } from '@/components/ui/Button'

interface Props {
  bookingId: string
  onUploaded?: () => void
}

export function FileUploader({ bookingId, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { upload, uploading, error } = useFileUpload()
  const [uploadedCount, setUploadedCount] = useState(0)
  const [dragOver, setDragOver] = useState(false)

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList)
    let count = 0
    for (const file of files) {
      const result = await upload({ bookingId, file })
      if (result) count++
    }
    setUploadedCount(c => c + count)
    onUploaded?.()
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed p-10 text-center transition-colors cursor-pointer ${
          dragOver ? 'border-white bg-card' : 'border-border hover:border-white/40'
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        <p className="text-muted text-sm mb-2">Arrastrá archivos aquí o hacé clic para seleccionar</p>
        <p className="text-label text-muted/50">JPG · PNG · WEBP · TIFF · Máx. 50MB por archivo</p>
      </div>

      {uploading && (
        <div className="mt-4 flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-sm text-muted">Subiendo...</p>
        </div>
      )}

      {uploadedCount > 0 && !uploading && (
        <p className="mt-4 text-sm text-green-400">
          {uploadedCount} archivo{uploadedCount !== 1 ? 's' : ''} subido{uploadedCount !== 1 ? 's' : ''} correctamente.
        </p>
      )}

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </div>
  )
}
