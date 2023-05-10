export interface IResponse {
   data: object[],
   statusCode:number
}

export interface ILocation{
    cityName: string,
    cityKey:string,    
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
    cityID:number,
    weatherCelsiusTemprature:any,
    weatherCelsiusUnitType:string,
    weatherFahrenheitTemprature:any,
    weatherFahrenheitlUnitType:string,
    tempratureValue:number,
    tempratureValueType:string
  }  