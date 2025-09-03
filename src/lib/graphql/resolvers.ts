import { prisma } from '../prisma'

interface CreateContentArgs {
  input: {
    title: string
    description?: string
  }
}

interface UpdateContentArgs {
  id: number
  input: {
    title?: string
    description?: string
  }
}

interface ContentArgs {
  id: number
}

interface DeleteContentArgs {
  id: number
}

export const resolvers = {
  Query: {
    contents: async () => {
      const contents = await prisma.content.findMany({
        orderBy: { createdAt: 'desc' }
      })
      return contents.map(content => ({
        ...content,
        createdAt: content.createdAt.toISOString(),
        updatedAt: content.updatedAt.toISOString()
      }))
    },
    content: async (_: unknown, { id }: ContentArgs) => {
      const content = await prisma.content.findUnique({
        where: { id }
      })
      if (!content) return null
      return {
        ...content,
        createdAt: content.createdAt.toISOString(),
        updatedAt: content.updatedAt.toISOString()
      }
    }
  },
  Mutation: {
    createContent: async (_: unknown, { input }: CreateContentArgs) => {
      const content = await prisma.content.create({
        data: {
          title: input.title,
          description: input.description
        }
      })
      return {
        ...content,
        createdAt: content.createdAt.toISOString(),
        updatedAt: content.updatedAt.toISOString()
      }
    },
    updateContent: async (_: unknown, { id, input }: UpdateContentArgs) => {
      const content = await prisma.content.update({
        where: { id },
        data: {
          ...(input.title && { title: input.title }),
          ...(input.description !== undefined && { description: input.description })
        }
      })
      return {
        ...content,
        createdAt: content.createdAt.toISOString(),
        updatedAt: content.updatedAt.toISOString()
      }
    },
    deleteContent: async (_: unknown, { id }: DeleteContentArgs) => {
      await prisma.content.delete({
        where: { id }
      })
      return true
    }
  }
}
