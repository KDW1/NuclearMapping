
const express = require('express');
const fs = require("fs");
const app = express(); 
const PORT = 3000;

let countries = JSON.parse(fs.readFileSync('countries.json', 'utf-8'));

let tables = []

updateInfo()

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
        let globalInfo = [];
        if(select.data[select.data.length-1].title == "Total" || select.data[select.data.length-1].title == "Global") {
            globalInfo = select.data[select.data.length-1];
        }
        res.render('globalTable', {
            num: num + 1,
            table: select,
            globalInfo: globalInfo
        })
    } else {
        res.send("The table number was out of range....");
    }
})

app.get('/table/country/:country', (req, res) => {
    let country = req.params.country;
    let population;
    let countryPresent = false;
    countries.forEach((data) => {
        if(data[0].toLowerCase() == country.toLowerCase()) {
            // console.log(data[1])
            population = data[1];
            console.log("Country present!");
            countryPresent = true;
            return;
        }
    })
    if(countryPresent) {
        updateInfo();
        let tablesFound = tablesOf(country, tables);
        console.log(tablesFound);
        res.render('countryTable', {
            population: population,
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
    let t = [];
    listOfTables.forEach((tab) => {
        let result = {
            metrics: tab.metrics,
            title: tab.title,
            table: [],
        };
        tab.data.forEach((dat) => {
            let mutable = dat;
            // console.log(mutable[0].toLowerCase());
            // console.log(country.toLowerCase() + "\n\n");
            if(mutable[0].toLowerCase() == country.toLowerCase()) {
                // let print = result;
                // print.table = dat;
                // console.log("Print:")
                // console.log(print);
                if(result.metrics[0] == 'Nation' || result.metrics[0] == 'Nations') {
                    console.log("Parameters!!");
                    result.metrics.splice(0, 1);
                    mutable.splice(0, 1);
                    if(result.metrics[0] == 'Population') {
                        result.metrics.splice(0, 1);
                        mutable.splice(0, 1);
                    }
                }
                result.table = mutable;
                // console.log("Table:");
                // console.log(result);
                // console.log("\n\n")
                t.push(result);
            }
        })
    })
    return t;
}

function updateInfo() {
    let data = JSON.parse(fs.readFileSync('nuclearData.json', 'utf-8'));
    tables = [
        data.firstFile.tableOne, data.firstFile.tableTwo, data.firstFile.tableThree, data.firstFile.tableFour,
        data.secondFile.tableOne, data.secondFile.tableTwo, data.secondFile.tableThree, data.secondFile.tableFour,
        data.secondFile.tableFive, data.secondFile.tableSix, data.secondFile.tableSeven, data.secondFile.tableEight,
        data.secondFile.tableNine
    ]
}