<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import Card from 'primevue/card'
import Loader from '@/components/Loader/LoaderComponent.vue'

const store = useAuthStore()
const cars = ref<object>([])
const showLoader = ref(false)

const getCars = async () => {
  showLoader.value = true
  try {
    const response = await axios.get(
      `https://jwt-auth-f4624-default-rtdb.europe-west1.firebasedatabase.app/cars.json`
    )
    console.log(response.data)
    cars.value = response.data
  } catch (err) {
    console.log(err)
  } finally {
    showLoader.value = false
  }
}

onMounted(getCars)
</script>

<template>
  <div>
    <h2>Cars</h2>
    <Loader v-if="showLoader" />
    <div class="flex flex-column gap-3" v-else>
      <Card v-for="(car, i) in cars" :key="i">
        <template #title> {{ car.name }} </template>
        <template #subtitle> {{ car.type }} </template>
      </Card>
    </div>
  </div>
</template>

<!-- https://jwt-auth-f4624-default-rtdb.europe-west1.firebasedatabase.app/ -->
