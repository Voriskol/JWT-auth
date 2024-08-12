import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE

interface IUserInfo {
  token: string
  email: string
  userId: string
  refreshToken: string
  expiresIn?: string
}

const error = ref<string>('')
const loader = ref<boolean>(false)

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<IUserInfo>({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  })
  const auth = async (payload: object, type: string) => {
    error.value = ''
    loader.value = true

    const stringUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${API_KEY}`,
        { ...payload, returnSecureToken: true }
      )

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
          expiresIn: userInfo.value.expiresIn
        })
      )
    } catch (err: any) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email already exists'
          break
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed'
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          error.value = 'Too many attempts, please try later'
          break
        case 'EMAIL_NOT_FOUND':
          error.value = 'Email not found'
          break
        case 'INVALID_PASSWORD':
          error.value = 'Invalid password'
          break
        case 'USER_DISABLED':
          error.value = 'User disabled'
          break
        default:
          error.value = 'Something went wrong'
          break
      }
      throw error.value
    } finally {
      loader.value = false
    }
  }
  return { auth, userInfo, error, loader }
})
