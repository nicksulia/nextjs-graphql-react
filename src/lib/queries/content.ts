import { gql } from '@apollo/client'

export const GET_CONTENTS = gql`
  query GetContents {
    contents {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

export const GET_CONTENT = gql`
  query GetContent($id: Int!) {
    content(id: $id) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

export const CREATE_CONTENT = gql`
  mutation CreateContent($input: CreateContentInput!) {
    createContent(input: $input) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_CONTENT = gql`
  mutation UpdateContent($id: Int!, $input: UpdateContentInput!) {
    updateContent(id: $id, input: $input) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

export const DELETE_CONTENT = gql`
  mutation DeleteContent($id: Int!) {
    deleteContent(id: $id)
  }
`
