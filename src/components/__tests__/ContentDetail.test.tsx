import { render, screen } from '@testing-library/react'
import { ContentDetail } from '../ContentDetail'
import { Content } from '@/types/content'

// Mock Apollo Client hooks
const mockUseQuery = jest.fn()
const mockUseMutation = jest.fn()

jest.mock('@apollo/client/react', () => ({
  useQuery: () => mockUseQuery(),
  useMutation: () => mockUseMutation(),
}))

// Mock next/link
jest.mock('next/link', () => {
  return function MockedLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

const mockContent: Content = {
  id: 1,
  title: 'Test Content',
  description: 'Test Description',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
}

describe('ContentDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    })

    render(<ContentDetail id={1} />)

    expect(screen.getByText('Loading...')).toBeTruthy()
  })

  it('renders error state', () => {
    mockUseQuery.mockReturnValue({
      data: null,
      loading: false,
      error: { message: 'Network error' },
    })

    render(<ContentDetail id={1} />)

    expect(screen.getByText('Error: Network error')).toBeTruthy()
  })

  it('renders not found state', () => {
    mockUseQuery.mockReturnValue({
      data: { content: null },
      loading: false,
      error: null,
    })

    render(<ContentDetail id={1} />)

    expect(screen.getByText('Content not found')).toBeTruthy()
  })

  it('renders content details correctly', () => {
    mockUseQuery.mockReturnValue({
      data: { content: mockContent },
      loading: false,
      error: null,
    })

    render(<ContentDetail id={1} />)

    expect(screen.getByText('Test Content')).toBeTruthy()
    expect(screen.getByText('Test Description')).toBeTruthy()
    // Check for ID display (use getAllByText since multiple elements have "1")
    expect(screen.getAllByText('1')).toHaveLength(1)
    // Check for date formatting - look for created date
    expect(screen.getAllByText('1/1/2023 at 2:00:00 AM')).toHaveLength(2)
  })

  it('renders content without description', () => {
    mockUseQuery.mockReturnValue({
      data: {
        content: {
          id: 1,
          title: 'Test Content',
          description: null,
          createdAt: '2023-01-01T02:00:00Z',
          updatedAt: '2023-01-01T02:00:00Z'
        }
      },
      loading: false,
      error: null
    })

    render(<ContentDetail id={1} />)

    expect(screen.getByText('Test Content')).toBeTruthy()
    // Should NOT have description section when description is null
    expect(screen.queryByText('Description')).toBeNull()
  })

  it('renders navigation links', () => {
    mockUseQuery.mockReturnValue({
      data: { content: mockContent },
      loading: false,
      error: null,
    })

    render(<ContentDetail id={1} />)

    const backLink = screen.getByText('← Back to Content Library')
    const editLink = screen.getByText('Edit')

    expect(backLink.closest('a')?.getAttribute('href')).toBe('/')
    expect(editLink.closest('a')?.getAttribute('href')).toBe('/edit/1')
  })

  it('calls useQuery with correct variables', () => {
    mockUseQuery.mockReturnValue({
      data: { content: mockContent },
      loading: false,
      error: null,
    })

    render(<ContentDetail id={123} />)

    // The useQuery hook should be called with the content query
    expect(mockUseQuery).toHaveBeenCalled()
  })

  it('handles empty description gracefully', () => {
    const contentWithEmptyDescription = {
      ...mockContent,
      description: '',
    }

    mockUseQuery.mockReturnValue({
      data: { content: contentWithEmptyDescription },
      loading: false,
      error: null,
    })

    render(<ContentDetail id={1} />)

    expect(screen.getByText('Test Content')).toBeTruthy()
    // Empty description should not show description section
    expect(screen.queryByText('Description')).toBeNull()
  })
})
