<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Loader from '@/components/Loader/LoaderComponent.vue'

const authStore = useAuthStore()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')

const signin = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signin')
  router.push('/goods')
}
</script>

<template>
  <h2 class="text-3xl mx-auto text-center mt-10 mb-3">Sign In</h2>
  <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
  <form class="flex flex-col gap-3 border-2 border-green-400 rounded p-3">
    <div class="flex p-inputgroup flex-1">
      <span class="p-inputgroup-addon pr-3 pt-2">
        <i class="pi pi-user"></i>
      </span>
      <InputText class="w-full" type="email" v-model="email" placeholder="Your Email" />
    </div>
    <div class="flex p-inputgroup flex-1">
      <span class="p-inputgroup-addon pr-3 pt-2">
        <i class="pi pi-at"></i>
      </span>
      <InputText class="w-full" type="password" v-model="password" placeholder="Password" />
    </div>
    <Loader v-if="authStore.loader" />
    <div v-else class="flex flex-col gap-3">
      <Button label="Sign in" @click="signin" />
      <span class="text-center"
        >Are you not registered yet?
        <router-link @click="authStore.error = ''" to="/signup">Sign up</router-link></span
      >
    </div>
  </form>
</template>
