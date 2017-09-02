var latitude = [0,0,70];
var longitude = [90,0,45];
var canTravel = ["2 1","1 2","0 2"];
var source = 0;
var destination = 1;

if(source == destination){
  console.log("no where to go");
  return;
}

//find direct route

key = source+" "+destination;
var result = canTravel.indexOf(key);
if (result > -1){
 console.log("direct route found");
 var shortestDist = new CloudTravel(latitude,longitude,source,destination);
 console.log("total trip ",shortestDist.getInfo);
 return;
}else{

//find alternate route

orig_source = source;  
sourceArray =[];
source = orig_source;
for(i=0;i<20;i++){
  key = source+" "+i;
  var result = canTravel.indexOf(key);
  if (result > -1){
    sourceArray.push(i);
  }    
}
for(k=0;k<sourceArray.length;k++){
  dest = sourceArray[k];
  source= orig_source;
  data = getValue(source,dest,canTravel,destination);
  if(data.length == 0){
    console.log("no possible route found ",-1);
    return;
  }
  console.log("alternate route found");  
  var finalTrip = 0;
  for(a=0;a<data.length;a++){  
    for(b=0;b<data[a].length;b++){    
        var start_end = data[a][b].split(" ");
        var shortestDist = new CloudTravel(latitude,longitude,start_end[0],start_end[1]);
        var tripDistance = shortestDist.getInfo; 
        console.log(data[a][b],"->",tripDistance);
        var finalTrip = +finalTrip + +tripDistance;           
    }    
   }
   console.log("total trip",finalTrip);    
}

}

function getValue(source,dest,canTravel,destination){
var route = [];
var final = [];
  for(i = dest; i <= 20; i++)
  { 
    key = source+" "+i;
    var result = canTravel.indexOf(key);
    if (result > -1){
        source = i;
        route.push(key);
        if(i == destination){
          final.push(route);          
          route =[];
          break;
        }i=0;
    }
  }
  return final;
}


// class declaration for distance calculation
function CloudTravel (latitude, longitude, origin, destination) {
    this.lat1 = latitude[origin];
    this.lat2 = latitude[destination];
    this.lon1 = longitude[origin];
    this.lon2 = longitude[destination];
    this.getInfo = shortesCouriertTrip(this.lat1,this.lon1,this.lat2,this.lon2);
}

function shortesCouriertTrip(lat1, lon1, lat2, lon2)
{
      rad = function(x) {return x*Math.PI/180;}

      var radius     = 4000;                
      var dLat  = rad( lat2 - lat1 );
      var dLong = rad( lon2 - lon1 );

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = radius * c;

      return d;   
}