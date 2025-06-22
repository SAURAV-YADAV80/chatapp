// src/types/auth.types.ts

export interface LoginPayload {
  email: string
  password: string
}

export interface SignUpPayload extends LoginPayload {
  name: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}
