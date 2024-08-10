import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from '@/App.vue'
// import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyAlEc_0NMnGcgBEiv3eaFxwzM0jyAIaruQ',
  authDomain: 'jwt-auth-f4624.firebaseapp.com',
  projectId: 'jwt-auth-f4624',
  storageBucket: 'jwt-auth-f4624.appspot.com',
  messagingSenderId: '732039012335',
  appId: '1:732039012335:web:f2f560becb00402f17e01a'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
// app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
