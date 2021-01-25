var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var readline = require('readline-sync');

//https://api.postcodes.io/postcodes?q=NW51TL
//https://api.tfl.gov.uk/Stoppoint?lat=51.513395&lon=-0.089095&stoptypes=NaptanPublicBusCoachTram
//https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals
var requestLL = new XMLHttpRequest()
var requestSC = new XMLHttpRequest()
var requestBus1 = new XMLHttpRequest()
var requestBus2 = new XMLHttpRequest()

var reqArray 
var reqLL
var reqSC
var reqBus1
var reqBus2

urlLatLong = getUrlLongLat();
requestLL.open('GET', urlLatLong, true)
requestLL.onreadystatechange = function () 
{
     if (requestLL.readyState === 4) 
     {
      reqLL = JSON.parse(requestLL.responseText)
      getStopArr(reqLL)
     }

}
requestLL.send()

function getStopArr(reqLL)
{
    var latitude = getLat(reqLL)
    var longitude = getLong(reqLL)
    var urlStopCode = `https://api.tfl.gov.uk/Stoppoint?lat=${latitude}&lon=${longitude}&stoptypes=NaptanPublicBusCoachTram`
    
    requestSC.open('GET', urlStopCode, true)
    requestSC.onreadystatechange = function () 
    {
      if (requestSC.readyState === 4) 
      {
        reqSC = JSON.parse(requestSC.responseText)
        stopCode1=getStopCode(reqSC, 1)
        stopCode2=getStopCode(reqSC, 2)
        var urlBus1 = makeUrlBus(stopCode1)
        var urlBus2 = makeUrlBus(stopCode2)
        getBuses1(urlBus1);
        getBuses2(urlBus2);

      }

    }
    requestSC.send()
}



function getUrlLongLat()
{
      console.log("Enter your post code(no spaces)")
      let postcode = readline.prompt()
      var url = `https://api.postcodes.io/postcodes?q=${postcode}`
      return (url)
}

function getLat(reqLL)
{
     var lat = reqLL.result[0].latitude
     return lat
}

function getLong(reqLL)
{
     var long = reqLL.result[0].longitude
     return long
}

function getStopCode(reqSC, n)
{
  return reqSC.stopPoints[n-1].id
}

function makeUrlBus(stopPoint)
{
      //490008660N
      var urlF = `https://api.tfl.gov.uk/StopPoint/${stopPoint}/Arrivals`
      return urlF
}

function getBuses1(urlBus1)
{
      requestBus1.open('GET', urlBus1, true)
      requestBus1.onreadystatechange = function () 
      {
            if (requestBus1.readyState === 4) 
            {
                  reqBus1 = JSON.parse(requestBus1.responseText)
                  findBuses(reqBus1)
            }

      }
 requestBus1.send()
}

function getBuses2(urlBus2)
{
      requestBus2.open('GET', urlBus2, true)
      requestBus2.onreadystatechange = function () 
      {
            if (requestBus2.readyState === 4) 
            {
                  reqBus2 = JSON.parse(requestBus2.responseText)
                  findBuses(reqBus2)
            }

      }
 requestBus2.send()
}

function findBuses(reqArray)
{

      //selecting required columns      
      var buses = []
    
      for (let i = 0; i <reqArray.length; i++)
      {     
            buses.push({line: reqArray[i].lineId, time: reqArray[i].timeToStation, destination: reqArray[i].towards})
      }

      /*sort by time*/
      buses.sort((a, b) => {
            return a.time - b.time
      })

      //top 5 buses
      let topFive = [];
      for (let a = 0; a<= 4 && a<buses.length; a++)
      {
      topFive.push(buses[a])   
      }
      if (reqArray[0].platformName === 'null') 
      {
        console.log(`${reqArray[0].stationName}`)
      }
      else 
      {
        console.log(`${reqArray[0].stationName}: Bus stop ${reqArray[0].platformName}`)
      }
      console.log(topFive)
}





