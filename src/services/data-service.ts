import type { IResponse, IDestinationDisplay} from "@/interfaces/interfaces";
import { get } from '@/domain/data-service';
const apiKey = '8n7G4gwBdAgBQsnstXHTEdCAknbUJH7f';
// const apiKey = 'dLnue3OPl3MARS0dReZRApANALGluUkk';
const language = 'en-us';

export const getLocationsList = async(query:string):Promise<IResponse> => {
    const data = {
        q:query,
        apikey:apiKey,
        language:language
    }
    return get('https://dataservice.accuweather.com/locations/v1/cities/autocomplete',data);
}

export const getLocationConditions = async(locationKey:number):Promise<IResponse> => {
    const data = {
        apikey:apiKey,
        language:language,
        details:true
    }
    return get (`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,data);
}

export const getDailyForecast = async(locationKey:number, isMetric:boolean):Promise<IResponse> => {
    const data = {
        apikey:apiKey,
        language:language,
        details:false,
        mertric:isMetric,        
    }
    return get (`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`,data);
}

export const setItemInSessionStorage = (key:string, objectToStore:object) => {
    try {
        sessionStorage.setItem(key,JSON.stringify(objectToStore));
        return true;
    }
    catch(error){
        console.error("Couldn't set item");
    }
    return false;
}

export const getItemFromSessionStorage = (key:string) => {
    try {
      const item:any = sessionStorage.getItem(key);
      if (item){
        return JSON.parse(item);
      }      
    } catch (error:any) {
        console.error(`Error retrieving item from session storage: ${error.message}`);      
    }
    return null;
  }


export const getFavoritesFromSessionStorage = () =>{ 
    try {
        const favoritesJSON = sessionStorage.getItem('favorites');
        const favorites = favoritesJSON ? JSON.parse(favoritesJSON) as IDestinationDisplay[] : [];
        return favorites;
      } catch (error) {
        console.error('Error retrieving favorites from session storage:', error);
        return [];
      } 
}

const favorites = getFavoritesFromSessionStorage();

export const findFavorite = (cityKey:number) => {
  try {
    return favorites.find(favorite => favorite.cityKey === cityKey);
  }
  catch(error){
    console.error("Error Finding favorite in data");
    return {};
  }
}

// Function to remove an item from the favorites array
export const removeFavorite = (cityKey:number) =>{
    try{
        const index = favorites.findIndex(favorite => favorite.cityKey === cityKey);
        if (index !== -1) {
          favorites.splice(index, 1);
          sessionStorage.setItem('favorites', JSON.stringify(favorites));
          return true;
        }
    }
    catch(error){
        console.error("Error Finding favorite in data");
    }  
  return false;
}
