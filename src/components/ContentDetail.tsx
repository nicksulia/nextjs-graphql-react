'use client'

import { useQuery } from '@apollo/client/react'
import { GET_CONTENT } from '@/lib/queries/content'
import { Content } from '@/types/content'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'

interface ContentDetailProps {
  id: number
}

export function ContentDetail({ id }: ContentDetailProps) {
  const { data, loading, error } = useQuery<{ content: Content }>(GET_CONTENT, {
    variables: { id }
  })

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>
  if (!data?.content) return <div className="text-center py-8 text-red-500">Content not found</div>

  const content = data.content

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          ← Back to Content Library
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{content.title}</h1>
          <Link
            href={`/edit/${content.id}`}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </Link>
        </div>

        {content.description && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{content.description}</p>
          </div>
        )}

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">ID:</span>
              <span className="ml-2 text-gray-900">{content.id}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Created:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(content.createdAt)}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Last Updated:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(content.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
