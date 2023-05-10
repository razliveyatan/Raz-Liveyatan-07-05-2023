import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useSearchDestinationStore = defineStore('destination',() => {
  const destination = ref('');
  const updateDestionation = computed((newDestination:string) => destination.value = newDestination !== '' ? newDestination : '');

  return {destination,updateDestionation}
})
