// var docxParser = require('docx-parser');

// docxParser.parseDocx("Table1.docx", function(data){
//         console.log(data)
// })

const WordExtractor = require("word-extractor"); 
const extractor = new WordExtractor();
const extracted = extractor.extract("Table1.docx");
const extracted2 = extractor.extract("Table2.docx");

tablesOfFirstFile();

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

        tableOne = createTable(docBody, 2, 3, 10 , "Statistics");
        // console.log(data.firstFile.tableOne);
        tableTwo = createTable(docBody, 15, 17, 27, "Livestock Case");
        tableThree = createTable(docBody, 15, 29, 39, "Partial Livestock Case (50% livestock feed to human consumption, 50% livestock feed to livestock)");
        tableFour = createTable(docBody, 15, 40, 50, "No Livestock Case (50% livestock feed to human consumption)");

        data.firstFile.tableOne = tableOne;
        data.firstFile.tableTwo = tableTwo;
        data.firstFile.tableThree = tableThree;
        data.firstFile.tableFour = tableFour;

        console.log(data)

        extracted2.then((doc) => {
            let docBody = doc.getBody().split("\n");
            docBody.forEach((data, i) => {
                if(i >= 25 && i <=198) {
                    console.log(data + " Index: " + i)
                }
            })
            
            let tableOne, tableTwo, tableThree, tableFour, tableFive, tableSix, tableSeven, tableEight, tableNine;
            
            tableOne = createTable(docBody, 12, 13, 23, "");

            tableTwo = createTable(docBody, 27, 28, 196, "");
                           
            tableThree = createTable(docBody, 201, 202, 209, "");
       
            tableFour = createTable(docBody, 211, 212, 379, "");
       
            tableFive = retrieveTable(382, 549);   
            tableOne.metrics = getMetrics(381);
       
            tableSix = retrieveTable(552, 719);   
            tableOne.metrics = getMetrics(551);
       
            tableSeven = retrieveTable(722, 889);   
            tableOne.metrics = getMetrics(721);

            tableEight = retrieveTable(892, 1059);   
            tableOne.metrics = getMetrics(891);

            tableNine = retrieveTable(1061, 1228);   
            tableOne.metrics = getMetrics(1060);


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

function createTable(document, metricLines, tableStart, tableEnd, title) {
    let tableData = retrieveTable(document, tableStart, tableEnd);
    let metrics = getMetrics(document, metricLines);
    return {
        data: tableData,
        metrics: metrics,
        title: title
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