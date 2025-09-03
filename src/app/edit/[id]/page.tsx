'use client'

import { useQuery } from '@apollo/client/react'
import { GET_CONTENT } from '@/lib/queries/content'
import { Content } from '@/types/content'
import { ContentForm } from '@/components/ContentForm'
import { use } from 'react'

interface EditContentPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditContentPage({ params }: EditContentPageProps) {
  const resolvedParams = use(params)
  const id = parseInt(resolvedParams.id, 10)

  const { data, loading, error } = useQuery<{ content: Content }>(GET_CONTENT, {
    variables: { id },
    skip: isNaN(id),
  })

  if (isNaN(id)) {
    return <div className="text-center py-8 text-red-500">Invalid content ID</div>
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>
  if (!data?.content) return <div className="text-center py-8 text-red-500">Content not found</div>

  return <ContentForm content={data.content} isEditing={true} />
}
