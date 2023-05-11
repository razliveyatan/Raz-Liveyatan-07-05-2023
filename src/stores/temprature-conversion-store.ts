import { defineStore } from 'pinia';

interface State {
  defaultTempratureType: string | null;
}

export const useDefaultTempratureTypeStore = defineStore('temperature', {
  state: (): State => ({
    defaultTempratureType: "C",
  }),
  actions: {
    setDefaultTempratureType(type: string): void {
      this.defaultTempratureType = type;
    },
  },  
});