import { defineStore } from 'pinia';

interface State {
  currentThemeType: string;
}

export const useCurrentThemeStore = defineStore('theme', {
  state: (): State => ({
    currentThemeType: 'Dark-Theme',  
    
  }),
  actions: {
    setCurrentTheme(themeType: string ): void {
      this.currentThemeType = themeType;
    },  
  },
});