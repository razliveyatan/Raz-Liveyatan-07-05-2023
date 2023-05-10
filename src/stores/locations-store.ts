import type { IDestinationDisplay } from '@/interfaces/interfaces';
import { defineStore } from 'pinia';

interface State {
  currentLocation: IDestinationDisplay | null;
  favoriteLocations:IDestinationDisplay[];
}

export const useLocationsStore = defineStore('main', {
  state: (): State => ({
    currentLocation: null,
    favoriteLocations:[],
  }),
  actions: {
    setCurrentLocation(location: IDestinationDisplay | null): void {
      this.currentLocation = location;
    },

    addFavoriteLocation(favoriteLocation: IDestinationDisplay): void {
      this.favoriteLocations.push(favoriteLocation);
    },

    removeFavoriteLocation(location: IDestinationDisplay): void {
      const index = this.favoriteLocations.findIndex(
        (favoriteLocation) => favoriteLocation.cityID === location.cityID
      );
      if (index !== -1) {
        this.favoriteLocations.splice(index, 1);
      }
    },
  },
});