/**
 * @jest-environment node
 */

import { ApolloServer } from '@apollo/server'
import { typeDefs } from '@/lib/graphql/typeDefs'
import { resolvers } from '@/lib/graphql/resolvers'

describe('GraphQL Server Integration', () => {
  let server: ApolloServer

  beforeEach(() => {
    jest.clearAllMocks()
    server = new ApolloServer({
      typeDefs,
      resolvers,
    })
  })

  it('should create ApolloServer instance', () => {
    expect(server).toBeInstanceOf(ApolloServer)
  })

  it('should have proper typeDefs and resolvers configuration', () => {
    expect(typeDefs).toBeDefined()
    expect(resolvers).toBeDefined()
    expect(resolvers.Query).toBeDefined()
    expect(resolvers.Mutation).toBeDefined()
    expect(typeof resolvers.Query.contents).toBe('function')
    expect(typeof resolvers.Query.content).toBe('function')
    expect(typeof resolvers.Mutation.createContent).toBe('function')
    expect(typeof resolvers.Mutation.updateContent).toBe('function')
    expect(typeof resolvers.Mutation.deleteContent).toBe('function')
  })

  it('should handle server configuration correctly', async () => {
    // Test that server can be configured without errors
    expect(() => {
      new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
      })
    }).not.toThrow()
  })
})
