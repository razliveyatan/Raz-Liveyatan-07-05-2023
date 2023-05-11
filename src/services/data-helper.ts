import type { ICurrentConditions, IDestinationDisplay, IFavorite, IForecast, ILocation} from "@/interfaces/interfaces";

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

export const normalizeDestinationObject = (locationObject:any, conditionsObject:any, tempratureType:any = '') => {
    return {
        cityName:locationObject.cityName && locationObject.cityName !== '' ? locationObject.cityName : '',
        cityKey:locationObject.cityKey && locationObject.cityKey !== '' ? locationObject.cityKey : '',
        weatherCelsiusTemprature:conditionsObject.Temperature && conditionsObject.Temperature.Metric ? conditionsObject.Temperature.Metric.Value : '',
        weatherCelsiusUnitType:conditionsObject.Temperature && conditionsObject.Temperature.Metric ? conditionsObject.Temperature.Metric.Unit : '',
        weatherFahrenheitTemprature:conditionsObject.Temperature && conditionsObject.Temperature.Imperial ? conditionsObject.Temperature.Imperial.Value : '',
        weatherFahrenheitlUnitType:conditionsObject.Temperature && conditionsObject.Temperature.Imperial ? conditionsObject.Temperature.Imperial.Unit : '',
        weatherIcon:conditionsObject.WeatherIcon ? `https://developer.accuweather.com/sites/default/files/${conditionsObject.WeatherIcon < 10 ? '0' + conditionsObject.WeatherIcon : conditionsObject.WeatherIcon}-s.png` : '',
        tempratureValueType: tempratureType !== '' ? tempratureType : 'C',
        tempratureValue: tempratureType === 'C' ? conditionsObject.Temperature.Metric.Value : conditionsObject.Temperature.Imperial.Value,             
    } as IDestinationDisplay
}

export const normalizeForecastObject = (locationObject:ILocation, forecastObject:any) => {
    return {
        cityName: locationObject.cityName !== '' ? locationObject.cityName : '',
        cityKey: locationObject.cityKey && locationObject.cityKey > 0 ? locationObject.cityKey : 0,
        dailyForecast : [{
            date : forecastObject.DailyForecasts && forecastObject.DailyForecasts.Date ?  forecastObject.DailyForecasts.Date : new Date().toDateString(),
            minTemperature: {
                temperature: {
                    value:forecastObject && forecastObject.Temperature && forecastObject.Temperature.Minimum && forecastObject.Temperature.Minimum.Value ? forecastObject.Temperature.Minimum.Value : 0,                    
                    unit: forecastObject && forecastObject.Temperature && forecastObject.Temperature.Minimum && forecastObject.Temperature.Minimum.Unit ? forecastObject.Temperature.Minimum.Unit : 'C',                    
                }
            },
            maxTemperature: {
                temperature: {
                    value:forecastObject && forecastObject.Temperature && forecastObject.Temperature.Maximum && forecastObject.Temperature.Maximum.Value ? forecastObject.Temperature.Maximum.Value : 0,                    
                    unit: forecastObject && forecastObject.Temperature && forecastObject.Temperature.Maximum && forecastObject.Temperature.Maximum.Unit ? forecastObject.Temperature.Maximum.Unit : 'C',                    
                }
            },
            day: {
                weatherIcon:forecastObject && forecastObject.Day && forecastObject.Day.Icon ? forecastObject.Day.Icon : '',
                weatherIconPhrase: forecastObject && forecastObject.Day && forecastObject.Day.IconPhrase ? forecastObject.Day.IconPhrase : '',
            },
            night: {
                weatherIcon:forecastObject && forecastObject.Day && forecastObject.Day.Icon ? forecastObject.Day.Icon : '',
                weatherIconPhrase: forecastObject && forecastObject.Day && forecastObject.Day.IconPhrase ? forecastObject.Day.IconPhrase : '',
            }            
        }],
        isDayTime:isDay(),
    }  as IForecast
}

export const normalizeFavoriteObject = (forecastObject:IForecast) => {
    return {
        favoriteForecast: forecastObject
    } as IFavorite
}

const isDay = () =>
{
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20;
    return isDayTime;
}