<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const isToken = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens') || '{}')
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
    authStore.userInfo.expiresIn = tokens.expiresIn
  }
}

checkUser()
</script>

<template>
  <nav class="max-w-[600px] mx-auto flex justify-around border-2 mt-4 rounded-lg p-2">
    <router-link to="/" class="text-3xl hover:bg-green-400 transition-all rounded-lg p-1"
      >Home</router-link
    >
    <router-link
      to="/signin"
      class="text-3xl hover:bg-green-400 transition-all rounded-lg p-1"
      v-if="!isToken"
      >Sign In</router-link
    >
    <router-link
      to="/goods"
      class="text-3xl hover:bg-green-400 transition-all rounded-lg p-1"
      v-if="isToken"
      >Cars</router-link
    >
  </nav>
  <div class="max-w-[600px] mx-auto">
    <router-view />
  </div>
</template>
