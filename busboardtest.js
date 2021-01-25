var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var readline = require('readline-sync');

//https://api.postcodes.io/postcodes?q=NW51TL
//https://api.tfl.gov.uk/Stoppoint?lat=51.513395&lon=-0.089095&stoptypes=NaptanPublicBusCoachTram


var request = new XMLHttpRequest()

var reqArray 
//let url = makeUrl();
var url = 'https://api.tfl.gov.uk/Stoppoint?lat=51.650507&lon=-0.070169&stoptypes=NaptanPublicBusCoachTram'
request.open('GET', url, true)
request.onreadystatechange = function () 
{
     if (request.readyState === 4) 
     {
      console.log(request.status);
      reqArray = JSON.parse(request.responseText)
      console.log(reqArray);
//      findBuses1(reqArray)
     }
}
request.send()

function makeUrl()
{
      console.log("Enter your stop code")
      let stopPoint = readline.prompt()
      //490008660N
      var urlF = `https://api.tfl.gov.uk/StopPoint/${stopPoint}/Arrivals`
      return urlF
}

function findBuses1(reqArray)
{

      //selecting required columns      
      var buses = []
      for (let i = 0; i <reqArray.length; i++)
      {     
            buses.push({ line: reqArray[i].lineId, time: reqArray[i].timeToStation, destination: reqArray[i].towards})
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
      console.log(topFive)
}





