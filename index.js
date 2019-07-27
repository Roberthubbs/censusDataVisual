import * as d3 from "d3";
import * as topojson from "topojson";


    let myInfor;
    let incomeInformation = [];
    let povertyInformation = [];
    
    let houseHoldInfo = [];
    
let myKeys;
let myVals;
let string;
let state;

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
{//
// DP02_0052PE == percentage of 3 year olds and up enrolled in school 
// DP02_0057PE == percentage enrolled in college or grad school
// DP02_0059PE	== percentage of 25+ with less than ninth grade education
// DP02_0060PE == percentage of 25+ with ninth-twelth grade education but no diploma
// DP02_0061PE	== percentage of 25+ with high school diploma
// DP02_0064PE == percentage with bachelor's degree 
}//


    let maritalInformation = [];
    
    let internetUse = [];
let educationInformation = [];
let percentageWithBachelorsDegree = [];
document.addEventListener('DOMContentLoaded', () => {
    
    


    const educationInfoMaster = d3.json("https://api.census.gov/data/2017/acs/acs1/profile?get=NAME,DP02_0052PE,DP02_0057PE,DP02_0059PE,DP02_0060PE,DP02_0061PE,DP02_0064PE&for=state:*&key=91b7e9890ac26943434a33aa3c5d28d240cff015")
        .then((data, error) => {
            if (error) throw error
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


    let cutOffValue = 25;
    //Defines the y axis styles
    const incomeInfoMaster = d3.json("https://api.census.gov/data/2017/acs/acs1/profile?get=NAME,DP03_0053PE,DP03_0054PE,DP03_0055PE,DP03_0056PE,DP03_0057PE,DP03_0058PE,DP03_0059PE,DP03_0060PE,DP03_0061PE&for=state:*&key=91b7e9890ac26943434a33aa3c5d28d240cff015")
    .then((data) => {
        for (let i = 1; i < data.length; i++) {
            state = data[i][0]
          
            data[i] = {
                
                "Groups": state,
                
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
        
        
        let data1 = data.slice(1,9);

        let margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        let categoriesNames = data1.map(function (d) { return d.Groups; });
        let ageNames = d3.keys(data1[0]).filter(function (d) { if (d !== "Groups") return d });
        let x0 = d3.scaleBand()
            .domain(categoriesNames)
            .rangeRound([0, width], .1);

        let x1 = d3.scaleOrdinal()
            .domain(ageNames)
            

        let y = d3.scaleLinear()
            .range([height, 0]);

        let color = d3.scaleOrdinal()
            .range(["#C4F0FF", "#E8D1FF", "#FFC4C4", "#F6FFC4", "#4d4dff", "#ff4dd2", "#ffff4d", "#4dff4d","#0099e6"]);

        let xAxis = d3.axisBottom(x0)
            

        let yAxis = d3.axisLeft(y)
            .tickFormat(d3.format(".2s"));

            
            
        
        let svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "bar-chart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            
            data1.forEach(function (d) {
                
                d.ages = ageNames.map(function (name) { return  { name: name, value: +d[name] }; });
            });
            data1.forEach(function (d) {

                d.ages = d.ages.sort((a, b) => (a.value > b.value) ? -1 : 1);
                
            })
       
        // x1.domain(ageNames).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data1, function (d) { return d3.max(d.ages, function (d) { return d.value; }); })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Population");

        let state = svg.selectAll(".groups")
            .data(data1)
            .enter().append("g")
            .attr("class", "groups")
            .attr("transform", function (d) {  return "translate(" + x0(d.Groups) + ",0)"; });

        state.selectAll("rect")
            .data(function (d) { return d.ages; })
            .enter().append("rect")
            .attr("width", x0.bandwidth())
            .attr("x", function (d) { return x1(d.name); })
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return height - y(d.value); })
            .style("fill", function (d) { return color(d.name); })
            
            // .style("border-right", 2)

        let legend = svg.selectAll(".legend")
            .data(ageNames.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
            
            

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) { return d; });
        
        
                
        return data;
        }).then((data) => {
            let data2 = data.slice(9,18);
            let margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            let categoriesNames = data2.map(function (d) { return d.Groups; });
            let ageNames = d3.keys(data2[0]).filter(function (d) { if (d !== "Groups") return d });
            let x0 = d3.scaleBand()
                .domain(categoriesNames)
                .rangeRound([0, width], .1);

            let x1 = d3.scaleOrdinal()
                .domain(ageNames)


            let y = d3.scaleLinear()
                .range([height, 0]);

            let color = d3.scaleOrdinal()
                .range(["#C4F0FF", "#E8D1FF", "#FFC4C4", "#F6FFC4", "#4d4dff", "#ff4dd2", "#ffff4d", "#4dff4d", "#0099e6"]);

            let xAxis = d3.axisBottom(x0)


            let yAxis = d3.axisLeft(y)
                .tickFormat(d3.format(".2s"));


            let svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("class", "bar-chart")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            data2.forEach(function (d) {

                d.ages = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
            });
            data2.forEach(function (d) {

                d.ages = d.ages.sort((a, b) => (a.value > b.value) ? -1 : 1);
                
            })

            // x1.domain(ageNames).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data2, function (d) { return d3.max(d.ages, function (d) { return d.value; }); })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Population");

            let state = svg.selectAll(".groups")
                .data(data2)
                .enter().append("g")
                .attr("class", "groups")
                .attr("transform", function (d) { return "translate(" + x0(d.Groups) + ",0)"; });

            state.selectAll("rect")
                .data(function (d) { return d.ages; })
                .enter().append("rect")
                .attr("width", x0.bandwidth())
                .attr("x", function (d) { return x1(d.name); })
                .attr("y", function (d) { return y(d.value); })
                .attr("height", function (d) { return height - y(d.value); })
                .style("fill", function (d) { return color(d.name); })

            // .style("border-right", 2)

            let legend = svg.selectAll(".legend")
                .data(ageNames.slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })



            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) { return d; });

            return data;
        }).then((data) => {
            let data3 = data.slice(18, 27);
            let margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            let categoriesNames = data3.map(function (d) { return d.Groups; });
            let ageNames = d3.keys(data3[0]).filter(function (d) { if (d !== "Groups") return d });
            let x0 = d3.scaleBand()
                .domain(categoriesNames)
                .rangeRound([0, width], .1);

            let x1 = d3.scaleOrdinal()
                .domain(ageNames)


            let y = d3.scaleLinear()
                .range([height, 0]);

            let color = d3.scaleOrdinal()
                .range(["#C4F0FF", "#E8D1FF", "#FFC4C4", "#F6FFC4", "#4d4dff", "#ff4dd2", "#ffff4d", "#4dff4d", "#0099e6"]);

            let xAxis = d3.axisBottom(x0)


            let yAxis = d3.axisLeft(y)
                .tickFormat(d3.format(".2s"));


            let svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("class", "bar-chart")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            data3.forEach(function (d) {

                d.ages = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
            });
            data3.forEach(function (d) {

                d.ages = d.ages.sort((a, b) => (a.value > b.value) ? -1 : 1);
               
            })

            // x1.domain(ageNames).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data3, function (d) { return d3.max(d.ages, function (d) { return d.value; }); })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Population");

            let state = svg.selectAll(".groups")
                .data(data3)
                .enter().append("g")
                .attr("class", "groups")
                .attr("transform", function (d) { return "translate(" + x0(d.Groups) + ",0)"; });

            state.selectAll("rect")
                .data(function (d) { return d.ages; })
                .enter().append("rect")
                .attr("width", x0.bandwidth())
                .attr("x", function (d) { return x1(d.name); })
                .attr("y", function (d) { return y(d.value); })
                .attr("height", function (d) { return height - y(d.value); })
                .style("fill", function (d) { return color(d.name); })

            // .style("border-right", 2)

            let legend = svg.selectAll(".legend")
                .data(ageNames.slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })



            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) { return d; });

            return data;
        }).then((data) => {
            let data4 = data.slice(27, 36);
            let margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            let categoriesNames = data4.map(function (d) { return d.Groups; });
            let ageNames = d3.keys(data4[0]).filter(function (d) { if (d !== "Groups") return d });
            let x0 = d3.scaleBand()
                .domain(categoriesNames)
                .rangeRound([0, width], .1);

            let x1 = d3.scaleOrdinal()
                .domain(ageNames)


            let y = d3.scaleLinear()
                .range([height, 0]);

            let color = d3.scaleOrdinal()
                .range(["#C4F0FF", "#E8D1FF", "#FFC4C4", "#F6FFC4", "#4d4dff", "#ff4dd2", "#ffff4d", "#4dff4d", "#0099e6"]);

            let xAxis = d3.axisBottom(x0)


            let yAxis = d3.axisLeft(y)
                .tickFormat(d3.format(".2s"));

         
            let svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("class", "bar-chart")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            data4.forEach(function (d) {

                d.ages = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
            });
            data4.forEach(function (d) {

                d.ages = d.ages.sort((a, b) => (a.value > b.value) ? -1 : 1);
                console.log(d.ages)
            })

            // x1.domain(ageNames).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data4, function (d) { return d3.max(d.ages, function (d) { return d.value; }); })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Population");

            let state = svg.selectAll(".groups")
                .data(data4)
                .enter().append("g")
                .attr("class", "groups")
                .attr("transform", function (d) { return "translate(" + x0(d.Groups) + ",0)"; });

            state.selectAll("rect")
                .data(function (d) { return d.ages; })
                .enter().append("rect")
                .attr("width", x0.bandwidth())
                .attr("x", function (d) { return x1(d.name); })
                .attr("y", function (d) { return y(d.value); })
                .attr("height", function (d) { return height - y(d.value); })
                .style("fill", function (d) { return color(d.name); })

            // .style("border-right", 2)

            let legend = svg.selectAll(".legend")
                .data(ageNames.slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })



            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) { return d; });

            return data;
        }).then((data) => {
            let data5 = data.slice(36, 45);
            let margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            let categoriesNames = data5.map(function (d) { return d.Groups; });
            let ageNames = d3.keys(data5[0]).filter(function (d) { if (d !== "Groups") return d });
            let x0 = d3.scaleBand()
                .domain(categoriesNames)
                .rangeRound([0, width], .1);

            let x1 = d3.scaleOrdinal()
                .domain(ageNames)


            let y = d3.scaleLinear()
                .range([height, 0]);

            let color = d3.scaleOrdinal()
                .range(["#C4F0FF", "#E8D1FF", "#FFC4C4", "#F6FFC4", "#4d4dff", "#ff4dd2", "#ffff4d", "#4dff4d", "#0099e6"]);

            let xAxis = d3.axisBottom(x0)


            let yAxis = d3.axisLeft(y)
                .tickFormat(d3.format(".2s"));


            let svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("class", "bar-chart")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            data5.forEach(function (d) {

                d.ages = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
            });
            data5.forEach(function (d) {

                d.ages = d.ages.sort((a, b) => (a.value > b.value) ? -1 : 1);
                console.log(d.ages)
            })

            // x1.domain(ageNames).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data5, function (d) { return d3.max(d.ages, function (d) { return d.value; }); })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Population");

            let state = svg.selectAll(".groups")
                .data(data5)
                .enter().append("g")
                .attr("class", "groups")
                .attr("transform", function (d) { return "translate(" + x0(d.Groups) + ",0)"; });

            state.selectAll("rect")
                .data(function (d) { return d.ages; })
                .enter().append("rect")
                .attr("width", x0.bandwidth())
                .attr("x", function (d) { return x1(d.name); })
                .attr("y", function (d) { return y(d.value); })
                .attr("height", function (d) { return height - y(d.value); })
                .style("fill", function (d) { return color(d.name); })

            // .style("border-right", 2)

            let legend = svg.selectAll(".legend")
                .data(ageNames.slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })



            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) { return d; });

            return data;
        }).then((data) => {
            let data6 = data.slice(45);
            let margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            let categoriesNames = data6.map(function (d) { return d.Groups; });
            let ageNames = d3.keys(data6[0]).filter(function (d) { if (d !== "Groups") return d });
            let x0 = d3.scaleBand()
                .domain(categoriesNames)
                .rangeRound([0, width], .1);

            let x1 = d3.scaleOrdinal()
                .domain(ageNames)


            let y = d3.scaleLinear()
                .range([height, 0]);

            let color = d3.scaleOrdinal()
                .range(["#C4F0FF", "#E8D1FF", "#FFC4C4", "#F6FFC4", "#4d4dff", "#ff4dd2", "#ffff4d", "#4dff4d", "#0099e6"]);

            let xAxis = d3.axisBottom(x0)


            let yAxis = d3.axisLeft(y)
                .tickFormat(d3.format(".2s"));


            let svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("class", "bar-chart")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


            data6.forEach(function (d) {

                d.ages = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
            });
            data6.forEach(function (d) {

                d.ages = d.ages.sort((a, b) => (a.value > b.value) ? -1 : 1);
                console.log(d.ages)
            })

            // x1.domain(ageNames).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data6, function (d) { return d3.max(d.ages, function (d) { return d.value; }); })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Population");

            let state = svg.selectAll(".groups")
                .data(data6)
                .enter().append("g")
                .attr("class", "groups")
                .attr("transform", function (d) { return "translate(" + x0(d.Groups) + ",0)"; });

            state.selectAll("rect")
                .data(function (d) { return d.ages; })
                .enter().append("rect")
                .attr("width", x0.bandwidth())
                .attr("x", function (d) { return x1(d.name); })
                .attr("y", function (d) { return y(d.value); })
                .attr("height", function (d) { return height - y(d.value); })
                .style("fill", function (d) { return color(d.name); })

            // .style("border-right", 2)

            let legend = svg.selectAll(".legend")
                .data(ageNames.slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })



            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) { return d; });

            return data;
        })

       
   
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

