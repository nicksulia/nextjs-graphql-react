import { ContentDetail } from '@/components/ContentDetail'

interface ContentPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId)) {
    return <div className="text-center py-8 text-red-500">Invalid content ID</div>
  }

  return <ContentDetail id={numId} />
}
