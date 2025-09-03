'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { GET_CONTENTS, DELETE_CONTENT } from '@/lib/queries/content'
import { Content } from '@/types/content'
import Link from 'next/link'
import { useState } from 'react'
import { formatDate } from '@/lib/utils'

export function ContentList() {
  const { data, loading, error, refetch } = useQuery<{ contents: Content[] }>(GET_CONTENTS)
  const [deleteContent] = useMutation(DELETE_CONTENT)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setDeletingId(id)
      try {
        await deleteContent({
          variables: { id },
          onCompleted: () => {
            refetch()
            setDeletingId(null)
          }
        })
      } catch (error) {
        console.error('Error deleting content:', error)
        setDeletingId(null)
      }
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>

  const contents: Content[] = data?.contents || []

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Library</h1>
        <Link
          href="/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Content
        </Link>
      </div>

      {contents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No content found. <Link href="/create" className="text-blue-500 hover:underline">Create your first content item</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {contents.map((content) => (
            <div key={content.id} className="border rounded-lg p-4 shadow-sm bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/content/${content.id}`} className="text-blue-600 hover:text-blue-800">
                      {content.title}
                    </Link>
                  </h2>
                  {content.description && (
                    <p className="text-gray-600 mb-2">{content.description}</p>
                  )}
                  <div className="text-sm text-gray-500">
                    <p>ID: {content.id}</p>
                    <p>Created: {formatDate(content.createdAt)}</p>
                    <p>Updated: {formatDate(content.updatedAt)}</p>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link
                    href={`/edit/${content.id}`}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(content.id)}
                    disabled={deletingId === content.id}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm disabled:opacity-50"
                  >
                    {deletingId === content.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
