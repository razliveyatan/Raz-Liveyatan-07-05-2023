import type { ILocation } from '@/interfaces/interfaces';
import { defineStore } from 'pinia';

interface State {
  currentLocation: ILocation | null;
  favoriteLocations:ILocation[];
}

export const useLocationsStore = defineStore('main', {
  state: (): State => ({
    currentLocation: null,
    favoriteLocations:[],
  }),
  actions: {
    setCurrentLocation(location: ILocation): void {
      this.currentLocation = location;
    },

    addFavoriteLocation(favoriteLocation: ILocation): void {
      this.favoriteLocations.push(favoriteLocation);
    },

    removeFavoriteLocation(location: ILocation): void {
      const index = this.favoriteLocations.findIndex(
        (favoriteLocation) => favoriteLocation.cityID === location.cityID
      );
      if (index !== -1) {
        this.favoriteLocations.splice(index, 1);
      }
    },
  },
});