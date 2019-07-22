import * as d3 from "d3";
import * as topojson from "topojson";

    // let svg = d3.select("svg");
    let myInfor;
    let incomeInformation = [];
    let povertyInformation = [];
    
    let houseHoldInfo = [];
    const myDataMaster = d3.json("https://api.census.gov/data/2017/acs/acs1/profile?get=NAME,DP02_0001E,DP02_0003E,DP02_0004PE,DP02_0024PE,DP02_0029PE,DP02_0030PE,DP02_0035PE,DP02_0051PE,DP02_0052PE,DP02_0057PE,DP02_0059PE,DP02_0060PE,DP02_0061PE,DP02_0064PE,DP02_0088PE,DP02_0150PE,DP03_0001PE,DP03_0006PE,DP03_0009PE,DP03_0010PE,DP03_0053PE,DP03_0054PE,DP03_0055PE,DP03_0056PE,DP03_0057PE,DP03_0058PE,DP03_0059PE,DP03_0060PE,DP03_0061PE,DP03_0068PE,DP03_0074PE,DP03_0096PE,DP03_0119PE&for=state:*&key=91b7e9890ac26943434a33aa3c5d28d240cff015")
        .then((data) => {
            for (let i = 0; i < data.length; i++){
               ////////// newly added 
                state = data[i][0]
                data[i] = {[state]:{
                    "state": data[i][0],
                    "total households": data[i][1],
                    "households with children under 18":data[i][2],
                    "percent of married households": data[i][3],
                    "percentage of male marital status (fifteen and over)":data[i][4],
                    "percentage of divorced males (fifteen and over)":data[i][5],
                    "percentage of married females (fifteen +)":data[i][6],
                    "percentage of divorced females (fifteen +)":data[i][7],
                    "percentage of grandparents responsible for their grandchildren(married)":data[i][8],
                    "percentage of 3 year olds and up enrolled in school":data[i][9],
                    "percentage enrolled in college or grad school":data[i][10],
                    "percentage of 25+ with less than ninth grade education": data[i][11],
                    "percentage of 25+ with ninth-twelth grade education but no diploma": data[i][12],
                    "percentage of 25+ with high school diploma": data[i][13],
                    "percentage with bachelor's degree": data[i][14],
               
                    "population born in the US": data[i][15],
                    "percentage of households with regular computer and internet use": data[i][16],
                    "percentage of employment status (16+)": data[i][17],
                    "percentage in armed forces (16+)": data[i][18],
                    "16+ unemployment rate": data[i][19],
                    "female employment status": data[i][20],
                    "percent of households with income 10,000-14,999": data[i][21],
                    "percent of households with income 15,000-24,999": data[i][22],
                    "percent of households with income 25,000-34,999": data[i][23],
                    "percent of households with income 35,000-49,999": data[i][24],
                    "percent of households with income 50,000-74,999": data[i][25],
                    "percent of households with income 75,000-99,999": data[i][26],
                    "percent of households with income 100,000-149,999": data[i][27],
                    "percent of households with income 150,000-199,999": data[i][28],
                    "percent of households with income 200,000+": data[i][29],
                    "percentage with retirement income": data[i][30],
                    "percentage with foodstamp/SNAP benefits": data[i][31],
                    "civilian noninstitutionalized population with health insurance": data[i][32],
                    "percentage below the poverty-level": data[i][33],
                    }
                };
            }
            // console.log(incomeInformation)
    })
let myKeys;
let myVals;
let string;
let state;

//   console.log(myInfor)  
//DP03_0053PE,DP03_0054PE,DP03_0055PE,DP03_0056PE,DP03_0057PE,DP03_0058PE,DP03_0059PE,DP03_0060PE,DP03_0061PE



// DP02_0001E,DP02_0003E,DP02_0004PE,DP02_0024PE,DP02_0029PE,DP02_0030PE,DP02_0035PE,DP02_0051PE
//DP02_0001E == total households by state
// DP02_0003E == total households with children under 18
// DP02_0004PE == percent of married households
// DP02_0024PE == percentage of male marital status (fifteen and over)
// DP02_0029PE == percentage of divorced males (fifteen and over)
// DP02_0030PE == percentage of married females (fifteen +)
// DP02_0035PE == percentage of divorced females (fifteen +)
// DP02_0051PE
const houseHoldInfoMaster = d3.json("https://api.census.gov/data/2017/acs/acs1/profile?get=NAME,DP02_0001E,DP02_0003E,DP02_0004PE,DP02_0024PE,DP02_0029PE,DP02_0030PE,DP02_0035PE,DP02_0051PE&for=state:*&key=91b7e9890ac26943434a33aa3c5d28d240cff015")
    .then((data) => {
        for (let i = 0; i < data.length; i++){
            state = data[i][0]
            data[i] = { [state]: {
            "total households": data[i][1],
            "total households with children under 18": data[i][2],
            "percent of households with income 25,000-34,999": data[i][3],
            "percent of married households": data[i][4],
            "percentage of male marital status (fifteen and over)": data[i][5],
            "percentage of divorced males (fifteen and over)": data[i][6],
            "percentage of married females (fifteen +)": data[i][7],
            "percentage of divorced females (fifteen +)": data[i][8],
            "grandparents who are responsible for their own grandchildren": data[i][9],
            }}
        }
        return data;
    });

// DP02_0052PE == percentage of 3 year olds and up enrolled in school 
// DP02_0057PE == percentage enrolled in college or grad school
// DP02_0059PE	== percentage of 25+ with less than ninth grade education
// DP02_0060PE == percentage of 25+ with ninth-twelth grade education but no diploma
// DP02_0061PE	== percentage of 25+ with high school diploma
// DP02_0064PE == percentage with bachelor's degree 



    let maritalInformation = [];
    
    let internetUse = [];
let educationInformation = [];
let percentageWithBachelorsDegree = [];
document.addEventListener('DOMContentLoaded', () => {
    
    


    const educationInfoMaster = d3.json("https://api.census.gov/data/2017/acs/acs1/profile?get=NAME,DP02_0052PE,DP02_0057PE,DP02_0059PE,DP02_0060PE,DP02_0061PE,DP02_0064PE&for=state:*&key=91b7e9890ac26943434a33aa3c5d28d240cff015")
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                state = data[i][0]

                data[i] = {
                    [state]: {
                        "percentage of 3 year olds and up enrolled in school": data[i][1],
                        "percentage enrolled in college or grad school": data[i][2],
                        "percentage of 25+ with less than ninth grade education": data[i][3],
                        "percentage of 25+ with ninth-twelth grade education but no diploma": data[i][4],
                        "percentage of 25+ with high school diploma": data[i][5],
                        "percentage with bachelor's degree ": data[i][6],
                    }
                }
                educationInformation.push(data[i])
            }
            
        })

    
    
    let margin = { top: 10, right: 50, bottom: 20, left: 227 };

    let widther = window.outerWidth;

    let width = widther - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    let barHeight = 35;

    //Appends the svg to the chart-container div
    let svg2 = d3.select("#all-state-information").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Creates the xScale 
    let xScale = d3.scaleLinear()
        .range([0, width]);

    let range = ([height, 0], 0)
    let domain = (["percent of households with income 10,000-14,999",
        "percent of households with income 15,000-24,999",
        "percent of households with income 25,000-34,999",
        "percent of households with income 35,000-49,999",
        "percent of households with income 50,000-74,999",
        "percent of households with income 75,000-99,999",
        "percent of households with income 100,000-149,999",
        "percent of households with income 150,000-199,999",
        "percent of households with income 200,000+"])
    //Creates the yScale
    let y0 = d3.scaleOrdinal()
        .domain([0,10])
        .range(range)
        

    //Defines the y axis styles
    let yAxis = d3.axisLeft(y0)
        

    //Defines the y axis styles
    let xAxis = d3.axisBottom(xScale)
        .tickFormat(function (d) { return d + "%"; })
        .tickSize(height); 
    
    const incomeInfoMaster = d3.json("https://api.census.gov/data/2017/acs/acs1/profile?get=NAME,DP03_0053PE,DP03_0054PE,DP03_0055PE,DP03_0056PE,DP03_0057PE,DP03_0058PE,DP03_0059PE,DP03_0060PE,DP03_0061PE&for=state:*&key=91b7e9890ac26943434a33aa3c5d28d240cff015")
    .then((data) => {
        for (let i = 1; i < data.length; i++) {
            state = data[i][0]
            data[i] = {
                    "state" : state,
                    "percent of households with income 10,000-14,999": data[i][1],
                    "percent of households with income 15,000-24,999": data[i][2],
                    "percent of households with income 25,000-34,999": data[i][3],
                    "percent of households with income 35,000-49,999": data[i][4],
                    "percent of households with income 50,000-74,999": data[i][5],
                    "percent of households with income 75,000-99,999": data[i][6],
                    "percent of households with income 100,000-149,999": data[i][7],
                    "percent of households with income 150,000-199,999": data[i][8],
                    "percent of households with income 200,000+": data[i][9],
                }
            
        }
        return data;
    }).then((data) => {
        let d;
            
            data = data.slice(1)
            d = {};
            data.forEach((d) => {
                d["state"] = d["state"];
                d["10,000-14,999"] = parseFloat(d["percent of households with income 10,000-14,999"]);
                d["15,000-24,999"] = parseFloat(d["percent of households with income 15,000-24,999"]);
                d["25,000-34,999"] = parseFloat(d["percent of households with income 25,000-34,999"]);
                d["35,000-49,999"] = parseFloat(d["percent of households with income 35,000-49,999"]);
                d["50,000-74,999"] = parseFloat(d["percent of households with income 50,000-74,999"]);
                d["75,000-99,999"] = parseFloat(d["percent of households with income 75,000-99,999"]);
                d["100,000-149,999"] = parseFloat(d["percent of households with income 100,000-149,999"]);
                d["150,000-199,999"] = parseFloat(d["percent of households with income 150,000-199,999"]);
                d["200,000+"] = parseFloat(d["percent of households with income 200,000+"]);
                let maxX = d3.max(data, function(d) { return d["10,000-14,999"]});             
                
                let minX = d3.max(data, function(d) { return d["200,000+"]});
                xScale.domain([0, maxX]);
                let yAxisGroup = svg2.append("g")
                .attr("class", "yaxis")
                 .call(yAxis)
     
                 
                 let xAxisGroup = svg2.append("g")
                     .attr("class", "xaxis")
                     .call(xAxis)
     
                let categoryGroup = svg.selectAll(".g-category-group")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("class", "g-category-group")
                    .attr("transform", function (d) {
                        // debugger;
                        return "translate(0," + 10 + ")";
                    });

                let bars2 = categoryGroup.append("rect")
                    .attr("width", function (d) { return xScale(d["200,000+"]); })
                    .attr("height", barHeight - 1)
                    .attr("class", "g-num2")
                    .attr("transform", "translate(0,4)");

                var bars = categoryGroup.append("rect")
                    .attr("width", function (d) { return xScale(d["10,000-14,999"]); })
                    .attr("height", barHeight - 1)
                    .attr("class", "g-num")
                    .attr("transform", "translate(0,4)"); 

                let labelGroup = svg.selectAll("g-num")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("class", "g-label-group")
                    .attr("transform", function (d) {
                        return "translate(0," + y0(d["State"]) + ")";
                    });

                let barLabels = labelGroup.append("text")
                    .text(function (d) { return d["10,000-14,999"]+ "%"; })
                    .attr("x", function (d) {
                        if (minX > 32) {
                            return xScale(d["75, 000 - 99, 999"]) - 37;
                        }
                        else {
                            return xScale(d["percent of households with income 200,000+"]) + 6;
                        }
                    })
                    .style("fill", function (d) {
                        if (minX > 32) {
                            return "white";
                        }
                        else {
                            return "#696969";
                        }
                    })
                    .attr("y",  4/ 1.6)
                    .attr("class", "g-labels");   
            });
                
                    
        });

       
   
let svg = d3.select("svg");


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

   

    // svg.selectAll("path")
    //     .data(path)
    //     .enter()
    //     .append("path")
    // const margin = 60;
    // const width = 1000 - 2 * margin
    // const height = 600 - 2 * margin;
    // const svg = d3.select('body').append('svg');
    // const chart = svg.append('g')
    //     .attr('transform', `translate(${margin}, ${margin})`);

    // const yScale = d3.scaleLinear()
    //     .range ([height, 0])
    //     .domain([0,100]);

    // chart.append('g')
    //     .call(d3.axisLeft(yScale));

    // const xScale = d3.scaleBand()
    //     .range([0, width])
    //     .domain(sample.map((s) => s.language))
    //     .padding(0.2)

    // chart.append('g')
    //     .attr('transform', `translate(0, ${height})`)
    //     .call(d3.axisBottom(xScale));

    // chart.selectAll()
    //     .data(goals)
    //     .enter()
    //     .append('rect')
    //     .attr('x',(s) => xScale(s.language))
    //     .attr('y', (s) => yScale(s.value))
    //     .attr('height',(s) => height - yScale(s.value))
    //     .attr('width', xScale.bandwidth())
    //     .attr('x', (actual, index, array) =>
    //     xScale(actual.value))

});