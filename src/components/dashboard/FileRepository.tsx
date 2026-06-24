'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import type { SessionFile } from '@/types'

interface Props {
  files: SessionFile[]
  bookingId: string
}

export function FileRepository({ files, bookingId }: Props) {
  const [lightbox, setLightbox] = useState<{ url: string; name: string } | null>(null)
  const [loadingSignedUrls, setLoadingSignedUrls] = useState(false)
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({})

  async function getSignedUrl(path: string): Promise<string> {
    if (signedUrls[path]) return signedUrls[path]

    const supabase = createClient()
    const { data } = await supabase.storage
      .from('session-files')
      .createSignedUrl(path, 3600)

    const url = data?.signedUrl ?? ''
    setSignedUrls(prev => ({ ...prev, [path]: url }))
    return url
  }

  async function openLightbox(file: SessionFile) {
    const url = await getSignedUrl(file.storage_path)
    setLightbox({ url, name: file.filename })
  }

  async function downloadFile(file: SessionFile) {
    const url = await getSignedUrl(file.storage_path)
    const a = document.createElement('a')
    a.href = url
    a.download = file.filename
    a.click()
  }

  async function downloadAll() {
    setLoadingSignedUrls(true)
    for (const file of files) {
      await downloadFile(file)
      await new Promise(r => setTimeout(r, 300))
    }
    setLoadingSignedUrls(false)
  }

  if (files.length === 0) {
    return (
      <div className="border border-border p-12 text-center">
        <p className="text-muted text-sm">Tus archivos aparecerán aquí una vez que sean entregados.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-label text-muted">{files.length} ARCHIVO{files.length !== 1 ? 'S' : ''}</p>
        <Button
          size="sm"
          variant="outline"
          onClick={downloadAll}
          loading={loadingSignedUrls}
        >
          DESCARGAR TODO
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {files.map(file => (
          <button
            key={file.id}
            onClick={() => openLightbox(file)}
            className="relative aspect-square bg-card border border-border overflow-hidden group hover:border-white/40 transition-colors"
          >
            {file.mime_type?.startsWith('image/') ? (
              <img
                src={signedUrls[file.storage_path] ?? ''}
                alt={file.filename}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Load signed URL on first visibility
                  getSignedUrl(file.storage_path).then(url => {
                    ;(e.target as HTMLImageElement).src = url
                  })
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-xs text-white truncate w-full">{file.filename}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="absolute top-6 right-6 flex gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); downloadFile(files.find(f => f.filename === lightbox.name)!) }}
              className="text-label text-white hover:text-muted transition-colors bg-card border border-border px-4 py-2"
            >
              DESCARGAR
            </button>
            <button
              onClick={() => setLightbox(null)}
              className="text-label text-white hover:text-muted transition-colors"
            >
              CERRAR ✕
            </button>
          </div>
          <img
            src={lightbox.url}
            alt={lightbox.name}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={e => e.stopPropagation()}
          />
          <p className="text-label text-muted mt-4">{lightbox.name}</p>
        </div>
      )}
    </div>
  )
}
