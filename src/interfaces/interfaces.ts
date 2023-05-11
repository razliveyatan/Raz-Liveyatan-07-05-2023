export interface IResponse {
   data: object[],
   statusCode:number
}

export interface ILocation{
    cityName: string,
    cityKey:number,    
    countryID:string,
    countryName:string,
    cityID:number
}

export interface ICurrentConditions {
    weatherText:string,
    weatherIcon:string,
    weatherCelsiusTemprature:any,
    weatherCelsiusUnitType:string,
    weatherFahrenheitTemprature:any,
    weatherFahrenheitlUnitType:string,
}

export interface IDestinationDisplay {
    weatherIcon: string,
    cityName: string,
    cityKey:number,
    weatherCelsiusTemprature:any,
    weatherCelsiusUnitType:string,
    weatherFahrenheitTemprature:any,
    weatherFahrenheitlUnitType:string,
    tempratureValue:number,
    tempratureValueType:string
  }

  export interface IFavorite {
    favoriteForecast:IForecast
  }

  interface IDailyTemperature {
    value:number,
    unit:string,
  }

  interface ITemperatureMax{
    temperature:IDailyTemperature
  }

  interface ITemperatureMin{
    temperature:IDailyTemperature
  }
  
  interface IDayForecast{
    weatherIcon: string,
    weatherIconPhrase:string,    
  }

   interface IDailyForecast {
    date:string,
    day:IDayForecast,
    night:IDayForecast,
    minTemperature:ITemperatureMin,
    maxTemperature:ITemperatureMax
  }

  export interface IForecast {
    cityName:string,
    cityKey:number,
    isDayTime:boolean,
    dailyForecast:IDailyForecast[]
  }