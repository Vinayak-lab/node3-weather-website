const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5fb12a48a8c99f27d37d255d914cd811/'+ latitude +',' + longitude 
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather api', undefined)
        } else if(body.error){
            callback('Unable to find the area', undefined)

        }else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability +   ' % chance of rain. The wind speed is ' + body.daily.data[0].windSpeed)
        }
     

    })
}

module.exports = forecast