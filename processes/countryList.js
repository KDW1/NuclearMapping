const { count } = require("console");
const fs = require("fs");

let countryList = [];
let file = JSON.parse(fs.readFileSync("./json/nuclearData.json", 'utf-8'));

file.secondFile.tableFour.data.forEach((data) => {
    countryList.push([data[0], data[1]]);
})

console.log(countryList.slice(countryList.length-68, countryList.length));

fs.writeFileSync("./json/countries.json", JSON.stringify(countryList));