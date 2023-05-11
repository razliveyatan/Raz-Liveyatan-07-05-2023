import type {IForecast } from '@/interfaces/interfaces';
import { defineStore } from 'pinia';

interface State {
  currentLocationCondition: IForecast | null;
}

export const useCurrentConditionsStore = defineStore('conditions', {
  state: (): State => ({
    currentLocationCondition: null,
  }),
  actions: {
    setCurrentLocationCondition(condition: IForecast | null): void {
      this.currentLocationCondition = condition;
    },
  },
});