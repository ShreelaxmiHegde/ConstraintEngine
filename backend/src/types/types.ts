export type conversationBody = {
  title: string
  content: string
}

export interface AuthPayload {
  userId: string
  email: string
}

export type UserBody = {
  id: string
  email: string
}