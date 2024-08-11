import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_KEY = 'AIzaSyAlEc_0NMnGcgBEiv3eaFxwzM0jyAIaruQ'

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
  const signup = async (payload: object) => {
    error.value = ''
    loader.value = true
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        { ...payload, returnSecureToken: true }
      )
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
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
        default:
          error.value = 'Something went wrong'
          break
      }
    }
    loader.value = false
  }
  return { signup, userInfo, error, loader }
})
