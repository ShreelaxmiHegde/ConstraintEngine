export type conversationBody = {
  title: string
  content: string
}

export type SignUpBody = {
  username: string
  email: string
  password: string
  guestId: string | null
}

export type LoginBody = {
  email: string
  password: string
}

export interface AuthPayload {
  userId: string
  email: string
}

export type UserBody = {
  id: string
  email: string
}