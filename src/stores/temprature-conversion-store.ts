import { defineStore } from 'pinia';

interface State {
  defaultTempratureType: string | null;
}

export const useDefaultTempratureTypeStore = defineStore('main', {
  state: (): State => ({
    defaultTempratureType: 'C',
  }),
  actions: {
    setDefaultTempratureType(type: string): void {
      this.defaultTempratureType = type;
    },
  },  
});