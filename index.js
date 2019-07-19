import * as d3 from "d3";
import * as topojson from "topojson";

    // let svg = d3.select("svg");

    const myData = d3.json("https://api.census.gov/data/2017/acs/acs1/profile?get=NAME,DP02_0001E,DP02_0003E,DP02_0004PE,DP02_0024PE,DP02_0029PE,DP02_0030PE,DP02_0035PE,DP02_0051PE,DP02_0052PE,DP02_0057PE,DP02_0059PE,DP02_0060PE,DP02_0061PE,DP02_0064PE,DP02_0088PE,DP02_0150PE,DP03_0001PE,DP03_0006PE,DP03_0009PE,DP03_0010PE,DP03_0053PE,DP03_0054PE,DP03_0055PE,DP03_0056PE,DP03_0057PE,DP03_0058PE,DP03_0059PE,DP03_0060PE,DP03_0061PE,DP03_0068PE,DP03_0074PE,DP03_0096PE,DP03_0119PE&for=state:*&key=91b7e9890ac26943434a33aa3c5d28d240cff015")
        .then((data) => {
            for (let i = 0; i < data.length; i++){
                
                data[i] = {
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
                
                    };
            
            
            }
        return data;
    })
    let povertyInformation = [];
    let incomeInformation = [];
    let educationInformation = [];
    let maritalInformation = [];
    let totalHouseHolds = [];
    let internetUse = [];
    
    document.addEventListener('DOMContentLoaded', () => {
        function pushIntoCats(){
            for (let i = 0; i < myData.length; i++){
                for (let j = 0; j < myData[i].length; j++){
                   
                    incomeInformation.push(myData[i].slice(21, 29))
                }
            }
            console.log(incomeInformation);
        };
        let incomeInfo = pushIntoCats()
console.log(myData)
console.log(incomeInfo)
let svg = d3.select("svg");
let svg2 = d3.select("#all-state-information")

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
console.log(incomeInfo);

let width = 960;
let height = 500;




   
    window.data = myData
   
    setInterval(() => {
        
    }, 2000)
    svg2.append("g")
        .data(myData)
        .enter()
        
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