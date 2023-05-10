import type { ICurrentConditions, IDestinationDisplay, ILocation , IResponse} from "@/interfaces/interfaces";
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

export const normalizeCurrentConditionsObject = (objectToNormalize:any) => {
    return {
        weatherText:objectToNormalize.WeatherText && objectToNormalize.WeatherText !== '' ? objectToNormalize.WeatherText : '',
        weatherIcon:objectToNormalize.WeatherIcon ? `https://developer.accuweather.com/sites/default/files/${objectToNormalize.WeatherIcon < 10 ? '0' : objectToNormalize.WeatherIcon}${objectToNormalize.WeatherIcon}-s.png` : '',
        weatherCelsiusTemprature:objectToNormalize.Temperature && objectToNormalize.Temperature.Metric ? objectToNormalize.Temperature.Metric.Value : '',
        weatherCelsiusUnitType:objectToNormalize.Temperature && objectToNormalize.Temperature.Metric ? objectToNormalize.Temperature.Metric.Unit : '',
        weatherFahrenheitTemprature:objectToNormalize.Temperature && objectToNormalize.Temperature.Imperial ? objectToNormalize.Temperature.Imperial.Value : '',
        weatherFahrenheitlUnitType:objectToNormalize.Temperature && objectToNormalize.Temperature.Imperial ? objectToNormalize.Temperature.Imperial.Unit : '',
    } as ICurrentConditions
}

export const normalizeDestinationObject = (locationObject:any, conditionsObject:any) => {
    return {
        cityName:locationObject.cityName && locationObject.cityName !== '' ? locationObject.cityName : '',
        cityID:locationObject.cityKey && locationObject.cityKey !== '' ? locationObject.cityKey : '',
        weatherCelsiusTemprature:conditionsObject.Temperature && conditionsObject.Temperature.Metric ? conditionsObject.Temperature.Metric.Value : '',
        weatherCelsiusUnitType:conditionsObject.Temperature && conditionsObject.Temperature.Metric ? conditionsObject.Temperature.Metric.Unit : '',
        weatherFahrenheitTemprature:conditionsObject.Temperature && conditionsObject.Temperature.Imperial ? conditionsObject.Temperature.Imperial.Value : '',
        weatherFahrenheitlUnitType:conditionsObject.Temperature && conditionsObject.Temperature.Imperial ? conditionsObject.Temperature.Imperial.Unit : '',
        weatherIcon:conditionsObject.WeatherIcon ? `https://developer.accuweather.com/sites/default/files/${conditionsObject.WeatherIcon < 10 ? '0' + conditionsObject.WeatherIcon : conditionsObject.WeatherIcon}-s.png` : '',        
    } as IDestinationDisplay
}