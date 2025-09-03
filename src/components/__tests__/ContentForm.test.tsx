import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContentForm } from '../ContentForm'
import { Content } from '@/types/content'

// Mock Apollo Client hooks
const mockUseQuery = jest.fn()
const mockUseMutation = jest.fn()

jest.mock('@apollo/client/react', () => ({
  useQuery: () => mockUseQuery(),
  useMutation: () => mockUseMutation(),
}))

// Mock next/navigation
const mockPush = jest.fn()
const mockBack = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}))

const mockContent: Content = {
  id: 1,
  title: 'Test Content',
  description: 'Test Description',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
}

describe('ContentForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseMutation.mockReturnValue([
      jest.fn().mockResolvedValue({
        data: {
          createContent: { id: 2, title: 'New Content', description: 'New Description' },
        },
      }),
      { loading: false },
    ])
  })

  it('renders create form correctly', () => {
    render(<ContentForm />)

    expect(screen.getByText('Create New Content')).toBeTruthy()
    expect(screen.getByLabelText(/title/i)).toBeTruthy()
    expect(screen.getByLabelText(/description/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /create content/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeTruthy()
  })

  it('renders edit form correctly', () => {
    render(<ContentForm content={mockContent} isEditing={true} />)

    expect(screen.getByText('Edit Content')).toBeTruthy()
    expect(screen.getByDisplayValue('Test Content')).toBeTruthy()
    expect(screen.getByDisplayValue('Test Description')).toBeTruthy()
    expect(screen.getByRole('button', { name: /update content/i })).toBeTruthy()
  })

  it('validates required title field', async () => {
    const user = userEvent.setup()
    
    render(<ContentForm />)

    const submitButton = screen.getByRole('button', { name: /create content/i })
    await user.click(submitButton)

    expect(screen.getByText('Title is required')).toBeTruthy()
  })

  it('handles form input changes', async () => {
    const user = userEvent.setup()
    
    render(<ContentForm />)

    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement
    const descriptionInput = screen.getByLabelText(/description/i) as HTMLTextAreaElement

    await user.type(titleInput, 'New Title')
    await user.type(descriptionInput, 'New Description')

    expect(titleInput.value).toBe('New Title')
    expect(descriptionInput.value).toBe('New Description')
  })

  it('calls create mutation on form submission', async () => {
    const user = userEvent.setup()
    const mockCreateMutation = jest.fn().mockResolvedValue({
      data: {
        createContent: { id: 2, title: 'New Content', description: 'New Description' },
      },
    })
    
    mockUseMutation.mockReturnValue([mockCreateMutation, { loading: false }])
    
    render(<ContentForm />)

    const titleInput = screen.getByLabelText(/title/i)
    const submitButton = screen.getByRole('button', { name: /create content/i })

    await user.type(titleInput, 'New Content')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockCreateMutation).toHaveBeenCalled()
    })
  })

  it('handles cancel button click', async () => {
    const user = userEvent.setup()
    
    render(<ContentForm />)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)

    expect(mockBack).toHaveBeenCalled()
  })

  it('shows loading state during submission', () => {
    mockUseMutation.mockReturnValue([jest.fn(), { loading: true }])
    
    render(<ContentForm />)

    expect(screen.getByText('Saving...')).toBeTruthy()
    const submitButton = screen.getByRole('button', { name: /saving/i })
    expect(submitButton).toHaveProperty('disabled', true)
  })

  it('handles update mode correctly', async () => {
    const user = userEvent.setup()
    const mockUpdateMutation = jest.fn().mockResolvedValue({
      data: {
        updateContent: { id: 1, title: 'Updated Content', description: 'Updated Description' },
      },
    })
    
    mockUseMutation.mockReturnValue([mockUpdateMutation, { loading: false }])
    
    render(<ContentForm content={mockContent} isEditing={true} />)

    const titleInput = screen.getByLabelText(/title/i)
    const submitButton = screen.getByRole('button', { name: /update content/i })

    await user.clear(titleInput)
    await user.type(titleInput, 'Updated Content')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockUpdateMutation).toHaveBeenCalled()
    })
  })
})
