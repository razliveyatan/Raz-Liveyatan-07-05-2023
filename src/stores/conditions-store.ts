import { defineStore } from 'pinia';

interface State {
  currentLocationCondition: object | null;
}

export const useCurrentConditionsStore = defineStore('main', {
  state: (): State => ({
    currentLocationCondition: null,
  }),
  actions: {
    setCurrentLocationCondition(condition: object): void {
      this.currentLocationCondition = condition;
    },
  },
});