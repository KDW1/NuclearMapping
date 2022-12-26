
const express = require('express');
const fs = require("fs");
const app = express(); 
const PORT = 3000;

let data = JSON.parse(fs.readFileSync('nuclearData.json', 'utf-8'));

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

app.get('/table:tableNum', (req, res) => {
    let num = req.params.tableNum;
    if(num < tables.length) {
        res.render('globalTable', {
            num: num,
            table: tables[num]
        })
    } else {
        res.send("The table number was out of range....");
    }
})

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});