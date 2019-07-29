import * as d3 from "d3";
import * as topojson from "topojson";
import * as states from '../us-states.json';





document.addEventListener('DOMContentLoaded', () => {
    
    let state;  
    
    
    
    
    //Defines the y axis styles
  
   
let svg = d3.select("svg")
        


let path = d3.geoPath();



d3.json("https://d3js.org/us-10m.v1.json").then( (us) =>  {
   
   
    // if (error) throw error;
    
    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);
    
   
    svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })));
    
    
});

   


});

