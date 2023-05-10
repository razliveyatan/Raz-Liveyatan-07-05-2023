import type { ICurrentConditions } from '@/interfaces/interfaces';
import { defineStore } from 'pinia';

interface State {
  currentLocationCondition: ICurrentConditions | null;
}

export const useCurrentConditionsStore = defineStore('main', {
  state: (): State => ({
    currentLocationCondition: null,
  }),
  actions: {
    setCurrentLocationCondition(condition: ICurrentConditions): void {
      this.currentLocationCondition = condition;
    },
  },
});