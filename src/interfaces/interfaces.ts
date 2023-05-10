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

export interface IWeatherResponse {
    weatherText:string,
    weatherIcon:number,
    weatherMetricTemprature:any,
    weatherMetricUnitType:string,
    weatherImperialTemprature:any,
    weatherImperialUnitType:string,
}