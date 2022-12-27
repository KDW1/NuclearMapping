// var docxParser = require('docx-parser');

// docxParser.parseDocx("Table1.docx", function(data){
//         console.log(data)
// })

const WordExtractor = require("word-extractor"); 
const extractor = new WordExtractor();
const extracted = extractor.extract("./docs/Table1.docx");
const extracted2 = extractor.extract("./docs/Table2.docx");
const fs = require("fs");

tablesOfFirstFile();

let percentUnit = "% reduction";
let millionUnit = "million people";

let data = {
    firstFile: {},
    secondFile: {}
}
async function tablesOfFirstFile() {
    let tableOne;
    await extracted.then(function(doc) { 
        let docBody = doc.getBody().split("\n");
        // console.log(docBody);
        // docBody.forEach((data, i) => {
        //     console.log(data + " Index: " + i)
        // })

        let d = `Changes in food calorie availability (%) in Year 2 after a nuclear war for the nations with nuclear weapons and global average assuming no trade after simulated nuclear wars under the Livestock Case, the Partial Livestock Case, and the No Livestock Case with 50% livestock feed to human consumption.  The total calorie reduction is referenced to the observed food calorie availability in 2010.  China here includes Mainland China, Hong Kong, and Macao. 150 Tg + hw is half of the household waste added to food consumption, and 150 Tg + tw is total household waste added to food consumption.  Bold is used for headings and global averages.`;
        tableOne = createTable(docBody, 2, 3, 10 , "Statistics", `Number of weapons on urban targets, yields, direct fatalities from the bomb blasts, and resulting number of people in danger of death due to famine for the different scenarios we studied.  The 5 Tg case scenario is from reference 16 for an India-Pakistan war taking place in 2008; the 16-47 Tg cases are from reference 18 for an India-Pakistan war taking place in 2025; and the 150 Tg case is from reference 52, which assumes attacks on France, Germany, Japan, U.K., U.S., Russia, and China.  The last column is the number of people who would starve by the end of Year 2 when the rest of the population is provided with the minimum amount of food needed to survive, assumed to be a calorie intake of 1911 kcal/capita/day, and for no international trade, from Supplemental Information, Table S5, the Partial Livestock case, in which 50% of livestock grain feed used for human consumption, and 50% of livestock grain feed used to raise livestock, using the latest complete data available, for the year 2010.  For 2010, the world population was 6,703,000,000.  There are many other scenarios in which these amounts of soot could be produced by a nuclear war, and the scenarios we use are only meant to be illustrative examples.  The last column is the case with the fewest number of deaths, and other cases are available in the Supplementary Information.`);
        // console.log(data.firstFile.tableOne);
        tableTwo = createTable(docBody, 15, 17, 27, "Livestock Case", d, percentUnit);
        tableThree = createTable(docBody, 15, 29, 39, "Partial Livestock Case (50% livestock feed to human consumption, 50% livestock feed to livestock)", d, percentUnit);
        tableFour = createTable(docBody, 15, 40, 50, "No Livestock Case (50% livestock feed to human consumption)", d, percentUnit);

        data.firstFile.tableOne = tableOne;
        data.firstFile.tableTwo = tableTwo;
        data.firstFile.tableThree = tableThree;
        data.firstFile.tableFour = tableFour;

        extracted2.then((doc) => {
            let docBody = doc.getBody().split("\n");
            docBody.forEach((data, i) => {
                if(i <= 380) console.log(data + " Index: " + i)
            })
            
            let tableOne, tableTwo, tableThree, tableFour, tableFive, tableSix, tableSeven, tableEight, tableNine;
            
            data.secondFile.tableOne = createTable(docBody, 12, 13, 23, "Calorie reduction from the major food crops and marine fish in nations with nuclear weapons.", `Changes in caloric production (%) from the major food crops (maize, rice, soybean and spring wheat) and marine fish in Year 2 after simulated nuclear conflicts for the nations with nuclear weapons and the global average for all nations calculated.  China here includes Mainland China, Hong Kong, and Macao.`, percentUnit);

            data.secondFile.tableTwo = createTable(docBody, 27, 28, 196, "Calorie reduction from the major food crops and marine fish in all nations calculated.", `Changes in caloric production (%) from the major food crops (maize, rice, soybean and spring wheat) and marine fish in Year 2 after simulated nuclear conflicts for all nations calculated.  China here includes Mainland China, Hong Kong, and Macao.`, percentUnit);
                           
            data.secondFile.tableThree = createTable(docBody, 201, 202, 209, "Assumptions for the Livestock, Partial Livestock, and No Livestock cases.", `Assumptions for the Livestock, Partial Livestock, and No Livestock cases.  Livestock includes meat, dairy, eggs, and aquaculture.  Inland fish capture, a minor source of food, is not considered in any of the cases`);
            //For table three the first 3 categories are simply checkmarks instead of a numerical value

            data.secondFile.tableFour = createTable(docBody, 211, 212, 379, "Number of people who would die from starvation after the simulated nuclear war in Year 2 for all nations for the Livestock case with trade off.", `Number of people who would die from starvation (millions) after the simulated nuclear war in Year 2 for all nations assuming no trade under the Livestock case (livestock production is continued).  The second column is the population in millions in 201045.  150 Tg + hw is half of the household waste added to food consumption, and 150 Tg + tw is total household waste added to food consumption.`, millionUnit);
       
            data.secondFile.tableFive = createTable(docBody, 381, 382, 549, "Number of people who would die from starvation after the simulated nuclear war in Year 2 for all nations for the Partial Livestock case with trade off.", `Number of people who would die from starvation (millions) after the simulated nuclear war in Year 2 for all nations, assuming no trade, under the Partial Livestock case (assuming 50% of livestock grain feed is used for human consumption, and 50% of livestock grain feed is used to raise livestock).  The second column is the population in millions in 201045.  150 Tg + hw is half of the household waste added to food consumption, and 150 Tg + tw is total household waste added to food consumption.`, millionUnit);
       
            data.secondFile.tableSix = createTable(docBody, 551, 552, 719, "Number of people who would die from starvation after the simulated nuclear war in Year 2 for all nations for the No Livestock case with trade off.", `Number of people who would die from starvation (millions) after the simulated nuclear war in Year 2 for all nations, assuming no trade, under the No Livestock case (assuming livestock is killed in Year 1 and 50% of livestock grain feed is used for human consumption).  The second column is the population in millions in 201042. 150 Tg + hw is half of the household waste added to food consumption, and 150 Tg + tw is total household waste added to food consumption.`, millionUnit);
       
            data.secondFile.tableSeven = createTable(docBody, 721, 722, 889, "Number of people who would die from starvation after the simulated nuclear war in Year 2 for all nations for the Livestock case with trade on.", `Number of people who would die from starvation (millions) after the simulated nuclear war in Year 2 for all nations assuming that trade would continue under the Livestock case (livestock production is continued).  The second column is the population in millions in 201045.  150 Tg + hw is half of the household waste added to food consumption, and 150 Tg + tw is total household waste added to food consumption.`, millionUnit);

            data.secondFile.tableEight = createTable(docBody, 891, 892, 1059, "Number of people who would die from starvation after the simulated nuclear war in Year 2 for all nations for the Partial Livestock case with trade on.", `Number of people who would die from starvation (millions) after the simulated nuclear war in Year 2 for all nations, assuming that trade would continue, under the Partial Livestock case (assuming 50% of livestock grain feed is used for human consumption, and 50% of livestock grain feed is used to raise livestock).  The second column is the population in millions in 201045.  150 Tg + hw is half of the household waste added to food consumption, and 150 Tg + tw is total household waste added to food consumption.`, millionUnit);

            data.secondFile.tableNine = createTable(docBody, 1060, 1061, 1228, "Number of people who would die from starvation after the simulated nuclear war in Year 2 for all nations for the No Livestock case with trade on.", `Number of people who would die from starvation (millions) after the simulated nuclear war in Year 2 for all nations, assuming that trade would continue, under the No Livestock case (assuming livestock is killed in Year 1 and 50% of livestock grain feed is used for human consumption).  The second column is the population in millions in 201042. 150 Tg + hw is half of the household waste added to food consumption, and 150 Tg + tw is total household waste added to food consumption.`, millionUnit);


            console.log(data);
            
            fs.writeFile('./nuclearData.json', JSON.stringify(data), () => {});
            //Metrics are the first index of these ranges
            //First is from 12-22
            //Second is from 27-195 (+168)?
            //Third is from 201-208 *This is a unique table talking about food affected by nuclear research and livestock amount
            //Fourth is from 211-378 (+167)
            //Fifth is from 381-548 (+167)
            //Sixth is from 551-718 (+167)
            //Seventh is from 721-888 (+167)
            //Eighth is from 891-1058 (+167)
            //Ninth is from 1060-1227
        })
    });
}

function createTable(document, metricLines, tableStart, tableEnd, title, description = '', unit = '') {
    let tableData = retrieveTable(document, tableStart, tableEnd);
    let metrics = getMetrics(document, metricLines);
    return {
        data: tableData,
        description: description,
        metrics: metrics,
        title: title,
        unit: unit
    }
}

function retrieveTable(_data, startIndex, endIndex) {
    let firstTable = _data.slice(startIndex, endIndex);
    // console.log(firstTable);
    // console.log("\n\nHeaders:");

    let tableData = [];
    firstTable.forEach((data, i) => {
        if(i != 0) {
            let arr =  data.split('\t');
            tableData[tableData.length] = arr.splice(0, arr.length-1);
        }
    })

    return tableData;

}

function getMetrics(data, index) {
    let headers = data.slice(index, index+1);
    headers = headers[0].split("\t");
    // console.log(headers)
    headers = headers.slice(0, headers.length-1);
    return headers;
}