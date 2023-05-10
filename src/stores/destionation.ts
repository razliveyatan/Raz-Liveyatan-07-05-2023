import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchDestinationStore = defineStore('destination',() => {
  const destination = ref('');
  const updateDestionation = computed((newDestination:string) => destination.value = newDestination !== '' ? newDestination : '');

  return {destination,updateDestionation}
})
