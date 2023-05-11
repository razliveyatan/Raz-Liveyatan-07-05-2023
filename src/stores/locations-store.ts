import type { IDestinationDisplay, IFavorite } from '@/interfaces/interfaces';
import { defineStore } from 'pinia';

interface State {
  currentLocation: IDestinationDisplay | null;
  favoriteLocations:IFavorite[];
}

export const useLocationsStore = defineStore('locations', {
  state: (): State => ({
    currentLocation: null,
    favoriteLocations:[],
  }),
  actions: {
    setCurrentLocation(location: IDestinationDisplay | null): void {
      this.currentLocation = location;
    },

    addFavoriteLocation(favoriteLocation: IFavorite): void {
      this.favoriteLocations.push(favoriteLocation);
    },

    removeFavoriteLocation(cityKey: number): void {
      const index = this.favoriteLocations.findIndex(
        (favoriteLocation) => favoriteLocation.favoriteForecast.cityKey === cityKey);
      if (index !== -1) {
        this.favoriteLocations.splice(index, 1);
      }
    },    
    isLocationInFavorites(cityKey:number) : boolean {
      return this.favoriteLocations.some(favorite => favorite.favoriteForecast.cityKey === cityKey);
    }
  },
});