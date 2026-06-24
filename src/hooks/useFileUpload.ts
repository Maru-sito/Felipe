'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface UploadOptions {
  bookingId: string
  file: File
  onProgress?: (pct: number) => void
}

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function upload({ bookingId, file }: UploadOptions) {
    setUploading(true)
    setError(null)

    const supabase = createClient()
    const path = `${bookingId}/${Date.now()}_${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('session-files')
      .upload(path, file, { upsert: false })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return null
    }

    const { error: dbError } = await supabase.from('files').insert({
      booking_id: bookingId,
      storage_path: path,
      filename: file.name,
      size_bytes: file.size,
      mime_type: file.type,
    })

    if (dbError) {
      setError(dbError.message)
      setUploading(false)
      return null
    }

    setUploading(false)
    return path
  }

  return { upload, uploading, error }
}
