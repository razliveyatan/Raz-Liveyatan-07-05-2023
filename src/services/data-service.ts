import type {IResponse} from "@/interfaces/interfaces";
export const encodeData = (data:any) => {
    const params = [];
    for(let key in data){
        if (data.hasOwnProperty(key)){
            params.push(key + "=" + window.encodeURIComponent(data[key]));
        }
    }
    return params.join('&');
}

export const get = async(url:string,data:any=null) : Promise<IResponse> => {
    if (data){
        const qs = encodeData(data);
        url +=`?${qs}`;
    }

    const headers = new Headers();
    // headers.append('Access-Control-Allow-Origin','content-type');
    // // headers.append('cache-control','no-cache');
    // headers.append('content-type','application/json');

    const response = await fetch(url, {
        method:'GET',
        headers,
        credentials: 'same-origin'
    })
    return {
        data:await response.json(),
        statusCode:response.status
    }
}