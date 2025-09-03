# Content Library

A modern Content Management System built with **Next.js**, **GraphQL**, **React**, **Prisma**, and **SQLite**. This application demonstrates a complete full-stack solution with TypeScript, Apollo Client, and Tailwind CSS.

## 🚀 Features

### 📂 Content Management
- **Create Content**: Add new content items with titles and descriptions
- **View Content List**: Browse all content items with pagination-ready UI
- **View Single Content**: Detailed view of individual content items
- **Update Content**: Edit existing content with form validation
- **Delete Content**: Remove content items with confirmation

### 🔌 GraphQL API
- Complete GraphQL schema with queries and mutations
- Type-safe resolvers with Prisma integration
- Apollo Server integration with Next.js API routes

### 🧠 Database
- SQLite database with Prisma ORM
- Auto-generated migrations
- Seeded sample data

### 🌐 Frontend
- Modern React components with TypeScript
- Apollo Client for GraphQL operations
- Responsive design with Tailwind CSS
- Dynamic routing with Next.js App Router
- Form validation and error handling

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **GraphQL**: Apollo Server & Apollo Client
- **State Management**: Apollo Client Cache
- **Form Handling**: React Hook Form with validation

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── api/graphql/             # GraphQL API endpoint
│   ├── content/[id]/            # Dynamic content view routes
│   ├── edit/[id]/               # Dynamic content edit routes
│   ├── create/                  # Create content page
│   └── page.tsx                 # Home page (content list)
├── components/                   # React components
│   ├── ApolloWrapper.tsx        # Apollo Client provider
│   ├── ContentList.tsx          # Content listing component
│   ├── ContentForm.tsx          # Create/edit form component
│   └── ContentDetail.tsx        # Single content view component
├── lib/                         # Utilities and configurations
│   ├── graphql/                 # GraphQL schema and resolvers
│   ├── queries/                 # GraphQL queries and mutations
│   ├── apollo-client.ts         # Apollo Client configuration
│   └── prisma.ts                # Prisma client instance
└── types/                       # TypeScript type definitions
    └── content.ts               # Content-related types

prisma/
├── schema.prisma                # Prisma schema definition
├── migrations/                  # Database migrations
└── seed.ts                      # Database seeding script
```

## 🚀 Getting Started

First, make sure you have Node.js 18+ installed, then:

```bash
# Install dependencies
npm install

# Set up the database
npx prisma generate
npx prisma migrate dev
npm run db:seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Content Library.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed the database with sample data

## 📊 GraphQL API

The GraphQL endpoint is available at `/api/graphql`. You can explore it using any GraphQL client or the built-in GraphQL Playground.

### Example Queries

**Get all content:**
```graphql
query GetContents {
  contents {
    id
    title
    description
    createdAt
    updatedAt
  }
}
```

**Create new content:**
```graphql
mutation CreateContent($input: CreateContentInput!) {
  createContent(input: $input) {
    id
    title
    description
  }
}
```

## 🔧 Key Features Implemented

✅ **Content Management**
- Create, read, update, delete content items
- Form validation with user feedback
- Responsive UI with Tailwind CSS

✅ **GraphQL Integration**
- Complete schema with types, queries, and mutations
- Apollo Server with Next.js API routes
- Apollo Client for frontend data fetching

✅ **Database Layer**
- Prisma ORM with SQLite
- Type-safe database operations
- Migration system and seeding

✅ **Frontend Excellence**
- TypeScript for type safety
- Modern React patterns with hooks
- Dynamic routing with App Router
- Error handling and loading states

✅ **Developer Experience**
- ESLint and Prettier configuration
- Hot reload with Turbopack
- Type-safe GraphQL operations

## 🎯 Usage

1. **View Content**: Visit the home page to see all content items
2. **Create Content**: Click "Create New Content" to add a new item
3. **View Details**: Click on any content title to see full details
4. **Edit Content**: Use the "Edit" button to modify existing content
5. **Delete Content**: Use the "Delete" button with confirmation

## 🔄 Database Operations

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (development)
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name your_migration_name
```

This project demonstrates modern full-stack development with Next.js, showcasing best practices for GraphQL APIs, database management, and React component architecture.
