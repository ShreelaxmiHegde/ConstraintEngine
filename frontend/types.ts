export type SignupInput = {
  username: string
  email: string
  password: string
}

export type LoginInput = {
  email: string
  password: string
}

export type GuestSessionInput = {
  content: string
}

export type User = {
  username: string
  email: string
  accessToken: string
}

export type AuthContextType = {
  currUser: User | null
  setCurrUser: React.Dispatch<React.SetStateAction<User | null>>

  loading: true | false
  setLoading: React.Dispatch<React.SetStateAction<true | false>>
}

export type AuthProviderProps = {
  children: React.ReactNode
}