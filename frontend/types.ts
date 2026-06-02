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

  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type AuthProviderProps = {
  children: React.ReactNode
}

export type AuthModalContextType = {
  openAuth: (type: AuthModalType) => void;
  closeAuth: () => void;
}

export type AuthModalType = "login" | "signup";

export type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: AuthModalType
};