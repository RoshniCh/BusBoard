var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

var request = new XMLHttpRequest()

var reqArray 
var url = 'https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals'
request.open('GET', url, true)
request.onreadystatechange = function () 
{
     if (request.readyState === 4) 
     {
      console.log(request.status);
      reqArray = JSON.parse(request.responseText)
//      console.log(reqArray);
      findBuses(reqArray)
     }
}
request.send()

function findBuses(reqArray)
{
var buses = []
for (let i = 0; i <reqArray.length; i++)
// {     
//       buses[i+1] = [reqArray[i].lineId, reqArray[i].timeToStation, reqArray[i].towards]
// }
{     
      buses.push({'Line': reqArray[i].lineId, 'Time': reqArray[i].timeToStation, 'Destination': reqArray[i].towards})
}
// reqArray.forEach(bus => 
// {
//       buses[bus.lineId] = bus.timeToStation
// })
console.log(buses)
}

