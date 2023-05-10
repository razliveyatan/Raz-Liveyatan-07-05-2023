import type { ILocation , IResponse} from "@/interfaces/interfaces";
import { get } from "./data-service"
const apiKey = '8n7G4gwBdAgBQsnstXHTEdCAknbUJH7f';
const language = 'en-us';

export const getLocationsList = async(query:string):Promise<IResponse> => {
    const data = {
        q:query,
        apikey:apiKey,
        language:language
    }
    return get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete',data);
}

export const getLocationConditions = async(locationKey:string):Promise<IResponse> => {
    const data = {
        apikey:apiKey,
        language:language,
        details:true
    }
    return get (`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,data);
}

export const normalizeLocationObject = (objectToNormalize:any) => {
    return {
        cityName:objectToNormalize.LocalizedName && objectToNormalize.LocalizedName !== '' ? objectToNormalize.LocalizedName : '',
        cityKey:objectToNormalize.Key && objectToNormalize.Key !== '' ? objectToNormalize.Key : '',
        countryID: objectToNormalize.Country ? objectToNormalize.Country.ID : '',
        countryName:objectToNormalize.Country ? objectToNormalize.Country.LocalizedName : '',        
        cityID: objectToNormalize.AdministrativeArea && objectToNormalize.AdministrativeArea.ID ? objectToNormalize.AdministrativeArea.ID : 0
    } as ILocation
}