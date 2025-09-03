import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Content {
    id: Int!
    title: String!
    description: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    contents: [Content!]!
    content(id: Int!): Content
  }

  type Mutation {
    createContent(input: CreateContentInput!): Content!
    updateContent(id: Int!, input: UpdateContentInput!): Content!
    deleteContent(id: Int!): Boolean!
  }

  input CreateContentInput {
    title: String!
    description: String
  }

  input UpdateContentInput {
    title: String
    description: String
  }
`
