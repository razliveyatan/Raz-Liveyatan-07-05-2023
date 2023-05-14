import type { IDestinationDisplay } from '@/interfaces/interfaces';
import { defineStore } from 'pinia';

interface State {
  currentLocation: IDestinationDisplay | null;
  favoriteLocations:IDestinationDisplay[];
  isFromFavoritesLocations:boolean;
}

export const useLocationsStore = defineStore('locations', {
  state: (): State => ({
    currentLocation: null,
    favoriteLocations:[],
    isFromFavoritesLocations: false,
  }),
  actions: {
    setCurrentLocation(location: IDestinationDisplay | null): void {
      this.currentLocation = location;
    },
    setIsFromFavoritesLocations(isFromFavorite: boolean): void {
      this.isFromFavoritesLocations = isFromFavorite ? isFromFavorite : false;
    },
    addFavoriteLocation(favoriteLocation: IDestinationDisplay): void {
      this.favoriteLocations.push(favoriteLocation);
    },
    removeFavoriteLocation(cityKey: number): void {
      const index = this.favoriteLocations.findIndex(
        (favoriteLocation) => favoriteLocation.cityKey === cityKey);
      if (index !== -1) {
        this.favoriteLocations.splice(index, 1);
      }
    },    
    isLocationInFavorites(cityKey:number) : boolean {
      return this.favoriteLocations.some(favorite => favorite.cityKey === cityKey);
    }
  },
});