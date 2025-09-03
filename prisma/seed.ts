import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.content.deleteMany()

  // Create sample content
  const sampleContent = [
    {
      title: 'Welcome to Content Library',
      description: 'This is your first content item. You can create, edit, view, and delete content items using this GraphQL-powered application.'
    },
    {
      title: 'Getting Started Guide',
      description: 'Learn how to use the Content Library system to manage your content effectively. This guide covers all the basic operations.'
    },
    {
      title: 'GraphQL Integration',
      description: 'This application demonstrates a full GraphQL integration with Apollo Client, showing how to perform queries and mutations.'
    },
    {
      title: 'Sample Article',
      description: null // Testing optional description
    },
    {
      title: 'Next.js + React Best Practices',
      description: 'Exploring modern React patterns with Next.js App Router, TypeScript, and Tailwind CSS for a complete developer experience.'
    }
  ]

  for (const content of sampleContent) {
    await prisma.content.create({
      data: content
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
