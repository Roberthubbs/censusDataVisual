import * as d3 from "d3";
import * as topojson from "topojson";
import * as us from '../us.json';
import { parse } from "path";
const geo = require("d3-geo")
// const projection = d3.geoAlbersUsaTerritories();



document.addEventListener('DOMContentLoaded', () => {
{
    // let state;  
    
    
    
    
    //Defines the y axis styles
  
   
let svg = d3.select("svg")
        


let path = d3.geoPath();


// d3.json("https://d3js.org/us-10m.v1.json").then( (us) =>  {
    
    
//     // if (error) throw error;
    
//     svg.append("g")
//     .attr("class", "states")
//     .selectAll("path")
//     .data(topojson.feature(us, us.objects.states).features)
//     .enter().append("path")
//     .attr("d", path);
    
    
//     svg.append("path")
//     .attr("class", "state-borders")
//     .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; })));

// });

}
{
//     debugger;
//     // d3.json(us).then((data) => {
//         // debugger;
//     var width = 960,
//         height = 500;

//     var svg = d3.select('body').append('svg')
//         .attr('width', width)
//         .attr('height', height);

//     var path = d3.geoPath()
//         .projection(projection);
    
//     var projection = d3.geoAlbersUsa()
//         .scale(1000)
//         .translate([width / 2, height / 2]);
        

//     d3.json(us, function (error, us) {
//         svg.selectAll('.states')
//             .data(topojson.feature(us, us.objects.usStates).features)
//             .enter()
//             .append('path')
//             .attr('class', 'states')
//             .attr('d', path)
//             .on('mouseover', function (d) {
//                 var name = d.properties.STATE_ABBR;
//                 return document.getElementById('name').innerHTML = name;
//             });
//     });  
}
  

    // });
});

