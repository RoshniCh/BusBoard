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
{     
      buses.push({ line: reqArray[i].lineId, time: reqArray[i].timeToStation, destination: reqArray[i].towards})
}

// console.log(buses)
buses.sort((a, b) => {
      return a.time - b.time
  })
// console.log(buses)
let topFive = [];
while (topFive.length < 5 && topFive.length < buses.length){
    buses.forEach(bus => topFive.push(bus))
}
console.log(topFive)
}





