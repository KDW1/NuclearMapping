const { count } = require("console");
const fs = require("fs");

let countryList = [];
let file = JSON.parse(fs.readFileSync("nuclearData.json", 'utf-8'));

file.secondFile.tableTwo.data.forEach((data) => {
    countryList.push(data[0]);
})

console.log(countryList.slice(countryList.length-68, countryList.length));

fs.writeFileSync("countries.json", JSON.stringify(countryList));