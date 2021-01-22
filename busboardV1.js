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
      console.log(reqArray);
     }
}
request.send()

