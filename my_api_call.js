import * as d3 from "d3";
let state;
export const incomeInfoMaster = d3.json("https://api.census.gov/data/2017/acs/acs1/profile?get=NAME,DP03_0053PE,DP03_0054PE,DP03_0055PE,DP03_0056PE,DP03_0057PE,DP03_0058PE,DP03_0059PE,DP03_0060PE,DP03_0061PE&for=state:*&key=91b7e9890ac26943434a33aa3c5d28d240cff015");
    




incomeInfoMaster.then((data) => {
        for (let i = 0; i < data.length; i++) {
            state = data[i][0]
            data[i] = {
                [state]: {
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
        }
        return data;
    });