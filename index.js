
const express = require('express');
const fs = require("fs");
const app = express(); 
const PORT = 3000;

let data = JSON.parse(fs.readFileSync('nuclearData.json', 'utf-8'));
let countries = JSON.parse(fs.readFileSync('countries.json', 'utf-8'));

let tables = [
    data.firstFile.tableOne, data.firstFile.tableTwo, data.firstFile.tableThree, data.firstFile.tableFour,
    data.secondFile.tableOne, data.secondFile.tableTwo, data.secondFile.tableThree, data.secondFile.tableFour,
    data.secondFile.tableFive, data.secondFile.tableSix, data.secondFile.tableSeven, data.secondFile.tableEight,
    data.secondFile.tableNine
]


// For parsing application/json
app.use(express.json());
app.set('view engine', 'ejs');
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/table/:tableNum', (req, res) => {
    let num = parseInt(req.params.tableNum) - 1;
    //Tables 
    if(num < tables.length) {
        // console.log("True Index: " + num);
        let select = tables[num]
        res.render('globalTable', {
            num: num + 1,
            table: select,
            globalInfo: select.data[select.data.length-1]
        })
    } else {
        res.send("The table number was out of range....");
    }
})

app.get('/table/country/:country', (req, res) => {
    let country = req.params.country;
    let countryPresent = false;
    countries.forEach((data) => {
        if(data.toLowerCase() == country.toLowerCase()) {
            console.log("Country present!");
            countryPresent = true;
            return;
        }
    })
    if(countryPresent) {
        let tablesFound = tablesOf(country, tables);
        res.render('countryTable', {
            country: country,
            tables: tablesFound
        })
    } else {
        res.send(`The country, ${country}, isn't listed...`)
    }
})

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

function tablesOf(country, listOfTables) {
    let tables = [];
    listOfTables.forEach((table) => {
        let result = {
            metric: table.metrics,
            title: table.title,
            table: [],
        };
        table.data.forEach((data) => {
            if(data[0].toLowerCase() == country.toLowerCase()) {
                result.table = data;
                tables.push(result);
            }
        })
    })
    return tables;
}