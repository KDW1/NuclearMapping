const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express(); 
const port = 3000;

require('dotenv').config()

let countries = JSON.parse(fs.readFileSync('json/countries.json', 'utf-8'));

let condensedData = JSON.parse(fs.readFileSync('json/nuclearDataSimple.json', 'utf-8'))
let smallTables = [
    condensedData.firstFile.tableOne, condensedData.firstFile.tableTwo, condensedData.firstFile.tableThree, condensedData.firstFile.tableFour,
    condensedData.secondFile.tableOne, condensedData.secondFile.tableTwo, condensedData.secondFile.tableThree, condensedData.secondFile.tableFour,
    condensedData.secondFile.tableFive, condensedData.secondFile.tableSix, condensedData.secondFile.tableSeven, condensedData.secondFile.tableEight,
    condensedData.secondFile.tableNine
]; 
let tables = []

updateInfo()

app.use('/public', express.static('public'))

// For parsing application/json
app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.set('view engine', 'ejs');
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {
        tables: smallTables
    })
    /*Make worldMap the default version, and then you switch to "text" mode. Also add search country box to 
    world map section */
})

app.use('/worldMap', (req, res) => {
    res.render('worldMap');
})

app.use('/worldTable/:tableNum', (req, res) => {
    //Make sure the table is one that includes nations
    let num = parseInt(req.params.tableNum) - 1;
    if(num <= 0 || num > 13) {
        res.redirect('worldMap'); //Invalid table index :(
    }
    let containsCountries = false;
    updateInfo();
    let table = tables[num];
    console.log(table);
    if(table.metrics[0] == 'Nations' || table.metrics[0] == 'Nation') {
        containsCountries = true;
    }
    if(containsCountries) {
        // console.log("\n\nTable:");
        // console.log(table);
        res.render('worldMap', {
            table: table
        });
    } else {
        console.log("No countries involved....");
        res.redirect('worldMap');
    }
})

app.get('/table/:tableNum', (req, res) => {
    let num = parseInt(req.params.tableNum) - 1;
    updateInfo();
    let containsCountries = false;
    //Tables 
    if(num < tables.length) {
        // console.log("True Index: " + num);
        let select = tables[num]
        console.log(select);
        let globalInfo = [];
        if(select.data[select.data.length-1][0] == "Total" || select.data[select.data.length-1][0] == "Global") {
            globalInfo = select.data[select.data.length-1];
        }
        if(select.metrics[0] == 'Nations' || select.metrics[0] == 'Nation') {
            containsCountries = true;
        }
        res.render('globalTable', {
            num: num + 1,
            table: select,
            globalInfo: globalInfo,
            containsCountries: containsCountries
        })
    } else {
        res.send("The table number was out of range....");
    }
})

app.get('/country/:country', (req, res) => {
    let country = req.params.country;
    if(country == "Taiwan") {
        country = "Taiwan, province of China";
    } else if(country == "Russian Federation") {
        country = "Russia";
    } else if(country == "Republic of Korea") {
        country = "South Korea";
    } else if(country =="Dem. Rep. Korea") {
        country = "North Korea";
    } else if(country == "Brunei Darussalam") {
        country = "Brunei";
    } else if(country == "The Gambia") {
        country = "Gambia";
    } else if(country == "Equatorial Guinea") {
        country = "Guinea";
    } else if(country == "Lao PDR") {
        country = "Laos";
    }
    

    let population;
    let countryPresent = false;
    countries.forEach((data) => {
        if(data[0].toLowerCase() == country.toLowerCase()) {
            // console.log(data[1])
            population = data[1];
            console.log("Country present!");
            country = data[0];
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
        res.render('countryTable', {
            country: country
        })
    }
})

app.post('/country', (req, res) => {
    let { country } = req.body;
    res.redirect('/country/' + country);
})

app.listen(process.env.PORT || port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.PORT || port);
});

function tablesOf(country, listOfTables) {
    let t = [];
    listOfTables.forEach((tab) => {
        let result = {
            metrics: tab.metrics,
            title: tab.title,
            table: [],
            unit: tab.unit,
            numberedIndex: tab.numberedIndex,
            maxVal: 0,
            minVal: 0,
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
                console.log("Mutable: " + mutable);
                let max = Math.max(...mutable);
                let min = Math.min(...mutable);
                result.maxVal = max;
                result.minVal = min;
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
    let data = JSON.parse(fs.readFileSync('json/nuclearData.json', 'utf-8'));
    tables = [
        data.firstFile.tableOne, data.firstFile.tableTwo, data.firstFile.tableThree, data.firstFile.tableFour,
        data.secondFile.tableOne, data.secondFile.tableTwo, data.secondFile.tableThree, data.secondFile.tableFour,
        data.secondFile.tableFive, data.secondFile.tableSix, data.secondFile.tableSeven, data.secondFile.tableEight,
        data.secondFile.tableNine
    ]
}