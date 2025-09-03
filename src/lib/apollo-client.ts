import { ApolloClient, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? `${process.env.VERCEL_URL}/api/graphql`
      : 'http://localhost:3000/api/graphql',
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})
