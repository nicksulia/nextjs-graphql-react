import { typeDefs } from '../graphql/typeDefs'
import { gql } from '@apollo/client'

describe('GraphQL TypeDefs', () => {
  it('should be a valid GraphQL schema', () => {
    expect(typeDefs).toBeDefined()
    expect(typeDefs.kind).toBe('Document')
  })

  it('should contain Content type definition', () => {
    const typeDefsString = typeDefs.loc?.source.body
    expect(typeDefsString).toContain('type Content')
    expect(typeDefsString).toContain('id: Int!')
    expect(typeDefsString).toContain('title: String!')
    expect(typeDefsString).toContain('description: String')
    expect(typeDefsString).toContain('createdAt: String!')
    expect(typeDefsString).toContain('updatedAt: String!')
  })

  it('should contain Query type definition', () => {
    const typeDefsString = typeDefs.loc?.source.body
    expect(typeDefsString).toContain('type Query')
    expect(typeDefsString).toContain('contents: [Content!]!')
    expect(typeDefsString).toContain('content(id: Int!): Content')
  })

  it('should contain Mutation type definition', () => {
    const typeDefsString = typeDefs.loc?.source.body
    expect(typeDefsString).toContain('type Mutation')
    expect(typeDefsString).toContain('createContent(input: CreateContentInput!): Content!')
    expect(typeDefsString).toContain('updateContent(id: Int!, input: UpdateContentInput!): Content!')
    expect(typeDefsString).toContain('deleteContent(id: Int!): Boolean!')
  })

  it('should contain input type definitions', () => {
    const typeDefsString = typeDefs.loc?.source.body
    expect(typeDefsString).toContain('input CreateContentInput')
    expect(typeDefsString).toContain('input UpdateContentInput')
  })

  it('should have proper field types in CreateContentInput', () => {
    const typeDefsString = typeDefs.loc?.source.body
    expect(typeDefsString).toContain('title: String!')
    expect(typeDefsString).toContain('description: String')
  })

  it('should have proper field types in UpdateContentInput', () => {
    const typeDefsString = typeDefs.loc?.source.body
    // In UpdateContentInput, both fields should be optional
    const updateInputMatch = typeDefsString?.match(/input UpdateContentInput \{[\s\S]+?\}/)
    expect(updateInputMatch).toBeTruthy()
    if (updateInputMatch) {
      const updateInput = updateInputMatch[0]
      expect(updateInput).toContain('title: String')
      expect(updateInput).toContain('description: String')
      // Should not contain required field markers (!) in update input
      expect(updateInput).not.toContain('title: String!')
    }
  })

  it('should be parseable by GraphQL', () => {
    // If typeDefs is properly formed, it should not throw when parsed
    expect(() => gql`${typeDefs.loc?.source.body}`).not.toThrow()
  })
})
