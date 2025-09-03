'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { CREATE_CONTENT, UPDATE_CONTENT, GET_CONTENTS } from '@/lib/queries/content'
import { CreateContentInput, UpdateContentInput, Content } from '@/types/content'
import { useRouter } from 'next/navigation'

interface ContentFormProps {
  content?: Content
  isEditing?: boolean
}

export function ContentForm({ content, isEditing = false }: ContentFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(content?.title || '')
  const [description, setDescription] = useState(content?.description || '')
  const [errors, setErrors] = useState<{ title?: string }>({})

  const [createContent, { loading: creating }] = useMutation<
    { createContent: Content },
    { input: CreateContentInput }
  >(CREATE_CONTENT)

  const [updateContent, { loading: updating }] = useMutation<
    { updateContent: Content },
    { id: number; input: UpdateContentInput }
  >(UPDATE_CONTENT)

  const loading = creating || updating

  const validateForm = () => {
    const newErrors: { title?: string } = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      if (isEditing && content) {
        await updateContent({
          variables: {
            id: content.id,
            input: {
              title: title.trim(),
              description: description.trim() || undefined
            }
          },
          refetchQueries: [{ query: GET_CONTENTS }]
        })
        router.push(`/content/${content.id}`)
      } else {
        const result = await createContent({
          variables: {
            input: {
              title: title.trim(),
              description: description.trim() || undefined
            }
          },
          refetchQueries: [{ query: GET_CONTENTS }]
        })
        
        if (result.data?.createContent) {
          router.push(`/content/${result.data.createContent.id}`)
        }
      }
    } catch (error) {
      console.error('Error saving content:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? 'Edit Content' : 'Create New Content'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter content title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter content description (optional)"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Content' : 'Create Content'}
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
