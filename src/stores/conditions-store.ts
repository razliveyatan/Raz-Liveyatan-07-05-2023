import type {IForecast } from '@/interfaces/interfaces';
import { defineStore } from 'pinia';

interface State {
  currentLocationForecast: IForecast | null;
}

export const useCurrentConditionsStore = defineStore('conditions', {
  state: (): State => ({
    currentLocationForecast: null,  
    
  }),
  actions: {
    setCurrentLocationForecast(forecast: IForecast | null): void {
      this.currentLocationForecast = forecast;
    },  
  },
});