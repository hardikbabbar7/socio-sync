'use client'

import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import { useEffect, useState } from 'react'

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const [fileType, setFileType] = useState<'image' | 'pdf' | null>(null)

  // Detect file type when value changes
  useEffect(() => {
    const detectFileType = async () => {
      if (!value) return
      
      try {
        const response = await fetch(value, { method: 'HEAD' })
        const contentType = response.headers.get('content-type')
        
        if (contentType?.includes('application/pdf')) {
          setFileType('pdf')
        } else if (contentType?.startsWith('image/')) {
          setFileType('image')
        } else {
          setFileType(null)
        }
      } catch (error) {
        console.error('Error detecting file type:', error)
        setFileType(null)
      }
    }

    detectFileType()
  }, [value])

  if (value && fileType === 'image') {
    return (
      <div className='relative h-20 w-20'>
        <Image
          fill
          sizes='(max-width: 40px), (max-height: 40px)'
          alt='Upload'
          src={value}
          className='rounded-full'
          onError={() => setFileType(null)} // Fallback if image fails to load
        />
        <button
          onClick={() => onChange('')}
          className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm'
          type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    )
  }

  if (value && fileType === 'pdf') {
    return (
      <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
        <FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-500' />
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='ml-2 text-sm text-indigo-500 dark:text-indigo-500 hover:underline'
        >
          View your pdf file
        </a>
        <button
          onClick={() => onChange('')}
          className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
          type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        // Use UploadThing's MIME type detection from response
        const uploadedFileType = res?.[0].type
        if (uploadedFileType === 'pdf' || uploadedFileType?.startsWith('image/')) {
          onChange(res?.[0].url)
        } else {
          console.error('Unsupported file type')
          onChange(undefined)
        }
      }}
      onUploadError={(error: Error) => {
        console.error('Upload error:', error)
      }}
    />
  )
}