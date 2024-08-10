import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_KEY = 'AIzaSyAlEc_0NMnGcgBEiv3eaFxwzM0jyAIaruQ'

export const useAuthStore = defineStore('auth', () => {
  const signup = async (payload) => {
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        { ...payload, returnSecureToken: true }
      )
      console.log(response)
    } catch (error: any) {
      console.log(error.response)
    }
  }
  return { signup }
})
