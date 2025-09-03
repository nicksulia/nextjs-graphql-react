export interface Content {
  id: number
  title: string
  description?: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateContentInput {
  title: string
  description?: string
}

export interface UpdateContentInput {
  title?: string
  description?: string
}
