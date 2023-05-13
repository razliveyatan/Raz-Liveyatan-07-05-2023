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
        WeatherText:conditionsObject.WeatherText !== '' ? conditionsObject.WeatherText : '',
        tempratureValueType: tempratureType !== '' ? tempratureType : 'C',
        tempratureValue: tempratureType === 'C' ? conditionsObject.Temperature.Metric.Value : conditionsObject.Temperature.Imperial.Value,             
    } as IDestinationDisplay
}

export const normalizeForecastObject = (locationObject: ILocation, forecastObject: any) => {
    debugger;
    const dailyForecasts = forecastObject.data.DailyForecasts || [];
    
    const forecastData = dailyForecasts.map((dailyForecast: any) => ({
      date: dailyForecast.Date || new Date().toDateString(),
      minTemperature: {
        temperature: {
          value: dailyForecast.Temperature?.Minimum?.Value || 0,
          unit: dailyForecast.Temperature?.Minimum?.Unit || 'C',
        },
      },
      maxTemperature: {
        temperature: {
          value: dailyForecast.Temperature?.Maximum?.Value || 0,
          unit: dailyForecast.Temperature?.Maximum?.Unit || 'C',
        },
      },
      day: {
        weatherIcon: dailyForecast.Day?.Icon ? `https://developer.accuweather.com/sites/default/files/${dailyForecast.Day?.Icon < 10 ? '0' + dailyForecast.Day?.Icon : dailyForecast.Day?.Icon}-s.png` : '',
        weatherIconPhrase: dailyForecast.Day?.IconPhrase || '',
      },
      night: {
        weatherIcon: dailyForecast.Night?.Icon ? `https://developer.accuweather.com/sites/default/files/${dailyForecast.Night?.Icon < 10 ? '0' + dailyForecast.Night?.Icon : dailyForecast.Night?.Icon}-s.png` : '',
        weatherIconPhrase: dailyForecast.Night?.IconPhrase || '',
      },
    }));
  
    return {
      cityName: locationObject.cityName !== '' ? locationObject.cityName : '',
      cityKey: locationObject.cityKey && locationObject.cityKey > 0 ? locationObject.cityKey : 0,
      highLightString:forecastObject.data.Headline ? forecastObject.data.Headline.Text : '',
      dailyForecast: forecastData,
      isDayTime: isDay(),
    } as IForecast;
  };

export const normalizeFavoriteObject = (forecastObject:IForecast) => {
    return {
        favoriteForecast: forecastObject
    } as IFavorite
}

export const getDayName = (dateStr:string) =>
{
    var date = new Date(dateStr);
    return date.toLocaleDateString("en-us", { weekday: 'long' });        
}

export const getDateString = (date:Date | null, isShort:boolean) => {
    var month = date ? date?.getUTCMonth() + 1 : 0;
    var day = date?.getUTCDate();
    var year = date?.getUTCFullYear();
    return isShort ? day + "/" + month : month + "/" + day + "/" + year;
}

export const convertToUnit = (unitValue:any , unitType:string|null) =>
{
    if (unitType === 'F'){        
        return Math.floor((unitValue * 9 / 5) + 32);  
    }
    else {       
        return Math.floor((unitValue - 32) * 5 / 9);  
    }  
}


const isDay = () =>
{
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20;
    return isDayTime;
}