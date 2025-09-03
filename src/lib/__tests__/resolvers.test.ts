import { resolvers } from '../graphql/resolvers'

// Mock Prisma for server tests
jest.mock('../prisma', () => ({
  prisma: {
    content: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

describe('GraphQL Resolvers', () => {
  // Get the mocked prisma instance
  const { prisma } = require('../prisma')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Query', () => {
    describe('contents', () => {
      it('returns all contents ordered by createdAt desc', async () => {
        const mockContents = [
          {
            id: 1,
            title: 'Content 1',
            description: 'Description 1',
            createdAt: new Date('2023-01-02'),
            updatedAt: new Date('2023-01-02'),
          },
          {
            id: 2,
            title: 'Content 2',
            description: 'Description 2',
            createdAt: new Date('2023-01-01'),
            updatedAt: new Date('2023-01-01'),
          },
        ]

        prisma.content.findMany.mockResolvedValue(mockContents)

        const result = await resolvers.Query.contents()

        expect(prisma.content.findMany).toHaveBeenCalledWith({
          orderBy: { createdAt: 'desc' },
        })

        expect(result).toEqual([
          {
            id: 1,
            title: 'Content 1',
            description: 'Description 1',
            createdAt: '2023-01-02T00:00:00.000Z',
            updatedAt: '2023-01-02T00:00:00.000Z',
          },
          {
            id: 2,
            title: 'Content 2',
            description: 'Description 2',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        ])
      })
    })

    describe('content', () => {
      it('returns content by id', async () => {
        const mockContent = {
          id: 1,
          title: 'Test Content',
          description: 'Test Description',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        }

        prisma.content.findUnique.mockResolvedValue(mockContent)

        const result = await resolvers.Query.content(null, { id: 1 })

        expect(prisma.content.findUnique).toHaveBeenCalledWith({
          where: { id: 1 },
        })

        expect(result).toEqual({
          id: 1,
          title: 'Test Content',
          description: 'Test Description',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        })
      })

      it('returns null when content not found', async () => {
        prisma.content.findUnique.mockResolvedValue(null)

        const result = await resolvers.Query.content(null, { id: 999 })

        expect(result).toBeNull()
      })
    })
  })

  describe('Mutation', () => {
    describe('createContent', () => {
      it('creates new content', async () => {
        const mockContent = {
          id: 1,
          title: 'New Content',
          description: 'New Description',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        }

        prisma.content.create.mockResolvedValue(mockContent)

        const input = {
          title: 'New Content',
          description: 'New Description',
        }

        const result = await resolvers.Mutation.createContent(null, { input })

        expect(prisma.content.create).toHaveBeenCalledWith({
          data: {
            title: 'New Content',
            description: 'New Description',
          },
        })

        expect(result).toEqual({
          id: 1,
          title: 'New Content',
          description: 'New Description',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        })
      })

      it('creates content without description', async () => {
        const mockContent = {
          id: 1,
          title: 'New Content',
          description: null,
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        }

        prisma.content.create.mockResolvedValue(mockContent)

        const input = {
          title: 'New Content',
        }

        const result = await resolvers.Mutation.createContent(null, { input })

        expect(prisma.content.create).toHaveBeenCalledWith({
          data: {
            title: 'New Content',
            description: undefined,
          },
        })
      })
    })

    describe('updateContent', () => {
      it('updates existing content', async () => {
        const mockContent = {
          id: 1,
          title: 'Updated Content',
          description: 'Updated Description',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-02'),
        }

        prisma.content.update.mockResolvedValue(mockContent)

        const input = {
          title: 'Updated Content',
          description: 'Updated Description',
        }

        const result = await resolvers.Mutation.updateContent(null, { id: 1, input })

        expect(prisma.content.update).toHaveBeenCalledWith({
          where: { id: 1 },
          data: {
            title: 'Updated Content',
            description: 'Updated Description',
          },
        })

        expect(result).toEqual({
          id: 1,
          title: 'Updated Content',
          description: 'Updated Description',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-02T00:00:00.000Z',
        })
      })

      it('updates only title when description is not provided', async () => {
        const mockContent = {
          id: 1,
          title: 'Updated Title Only',
          description: 'Original Description',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-02'),
        }

        prisma.content.update.mockResolvedValue(mockContent)

        const input = {
          title: 'Updated Title Only',
        }

        const result = await resolvers.Mutation.updateContent(null, { id: 1, input })

        expect(prisma.content.update).toHaveBeenCalledWith({
          where: { id: 1 },
          data: {
            title: 'Updated Title Only',
          },
        })
      })

      it('handles empty description update', async () => {
        const mockContent = {
          id: 1,
          title: 'Content Title',
          description: '',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-02'),
        }

        prisma.content.update.mockResolvedValue(mockContent)

        const input = {
          description: '',
        }

        const result = await resolvers.Mutation.updateContent(null, { id: 1, input })

        expect(prisma.content.update).toHaveBeenCalledWith({
          where: { id: 1 },
          data: {
            description: '',
          },
        })
      })
    })

    describe('deleteContent', () => {
      it('deletes content and returns true', async () => {
        prisma.content.delete.mockResolvedValue({
          id: 1,
          title: 'Deleted Content',
          description: 'Deleted Description',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        })

        const result = await resolvers.Mutation.deleteContent(null, { id: 1 })

        expect(prisma.content.delete).toHaveBeenCalledWith({
          where: { id: 1 },
        })

        expect(result).toBe(true)
      })
    })
  })
})
