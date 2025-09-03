import { GET_CONTENTS, GET_CONTENT, CREATE_CONTENT, UPDATE_CONTENT, DELETE_CONTENT } from '../content'
import { gql } from '@apollo/client'

describe('GraphQL Queries and Mutations', () => {
  describe('GET_CONTENTS', () => {
    it('should be a valid GraphQL query', () => {
      expect(GET_CONTENTS).toBeDefined()
      expect(GET_CONTENTS.kind).toBe('Document')
    })

    it('should query contents with correct fields', () => {
      const queryString = GET_CONTENTS.loc?.source.body
      expect(queryString).toContain('query GetContents')
      expect(queryString).toContain('contents')
      expect(queryString).toContain('id')
      expect(queryString).toContain('title')
      expect(queryString).toContain('description')
      expect(queryString).toContain('createdAt')
      expect(queryString).toContain('updatedAt')
    })
  })

  describe('GET_CONTENT', () => {
    it('should be a valid GraphQL query with variables', () => {
      expect(GET_CONTENT).toBeDefined()
      expect(GET_CONTENT.kind).toBe('Document')
    })

    it('should query single content by id', () => {
      const queryString = GET_CONTENT.loc?.source.body
      expect(queryString).toContain('query GetContent')
      expect(queryString).toContain('$id: Int!')
      expect(queryString).toContain('content(id: $id)')
    })
  })

  describe('CREATE_CONTENT', () => {
    it('should be a valid GraphQL mutation', () => {
      expect(CREATE_CONTENT).toBeDefined()
      expect(CREATE_CONTENT.kind).toBe('Document')
    })

    it('should create content with input', () => {
      const mutationString = CREATE_CONTENT.loc?.source.body
      expect(mutationString).toContain('mutation CreateContent')
      expect(mutationString).toContain('$input: CreateContentInput!')
      expect(mutationString).toContain('createContent(input: $input)')
    })
  })

  describe('UPDATE_CONTENT', () => {
    it('should be a valid GraphQL mutation', () => {
      expect(UPDATE_CONTENT).toBeDefined()
      expect(UPDATE_CONTENT.kind).toBe('Document')
    })

    it('should update content with id and input', () => {
      const mutationString = UPDATE_CONTENT.loc?.source.body
      expect(mutationString).toContain('mutation UpdateContent')
      expect(mutationString).toContain('$id: Int!')
      expect(mutationString).toContain('$input: UpdateContentInput!')
      expect(mutationString).toContain('updateContent(id: $id, input: $input)')
    })
  })

  describe('DELETE_CONTENT', () => {
    it('should be a valid GraphQL mutation', () => {
      expect(DELETE_CONTENT).toBeDefined()
      expect(DELETE_CONTENT.kind).toBe('Document')
    })

    it('should delete content by id', () => {
      const mutationString = DELETE_CONTENT.loc?.source.body
      expect(mutationString).toContain('mutation DeleteContent')
      expect(mutationString).toContain('$id: Int!')
      expect(mutationString).toContain('deleteContent(id: $id)')
    })
  })

  describe('Query Parsing', () => {
    it('should parse all queries without errors', () => {
      expect(() => gql`${GET_CONTENTS.loc?.source.body}`).not.toThrow()
      expect(() => gql`${GET_CONTENT.loc?.source.body}`).not.toThrow()
      expect(() => gql`${CREATE_CONTENT.loc?.source.body}`).not.toThrow()
      expect(() => gql`${UPDATE_CONTENT.loc?.source.body}`).not.toThrow()
      expect(() => gql`${DELETE_CONTENT.loc?.source.body}`).not.toThrow()
    })
  })

  describe('Query Structure', () => {
    it('should have consistent field selection', () => {
      const fieldsToCheck = ['id', 'title', 'description', 'createdAt', 'updatedAt']
      
      const getContentsString = GET_CONTENTS.loc?.source.body
      const getContentString = GET_CONTENT.loc?.source.body
      const createContentString = CREATE_CONTENT.loc?.source.body
      const updateContentString = UPDATE_CONTENT.loc?.source.body
      
      fieldsToCheck.forEach(field => {
        expect(getContentsString).toContain(field)
        expect(getContentString).toContain(field)
        expect(createContentString).toContain(field)
        expect(updateContentString).toContain(field)
      })
    })
  })
})
