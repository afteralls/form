export {}

declare global {
  type SelectItem = { value: number; name: string }

  interface AuthData {
    public: boolean
    username: string
    role: number
    email: string
    password: string
    password_repeat: string
    agreement: boolean
  }
}
