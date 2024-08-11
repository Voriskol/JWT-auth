<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
// import { useRouter } from 'vue-router'
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Loader from '@/components/Loader/LoaderComponent.vue'

const authStore = useAuthStore()
// const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')

const signup = async () => {
  await authStore.signup({ email: email.value, password: password.value })
}
</script>

<template>
  <h2 class="text-3xl mx-auto text-center mt-10 mb-3">Sign Up</h2>
  <form class="flex flex-col gap-3 items-center">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon pr-3">
        <i class="pi pi-user"></i>
      </span>
      <InputText type="email" v-model="email" placeholder="Your Email" />
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon pr-3">
        <i class="pi pi-at"></i>
      </span>
      <InputText type="password" v-model="password" placeholder="Password" />
    </div>
    <Loader v-if="authStore.loader" />
    <div v-else class="flex flex-col gap-3">
      <Button label="Signup" @click="signup" />
      <span>Are you already registered? <router-link to="/signin">Sign in</router-link></span>
    </div>
  </form>
</template>
