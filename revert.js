const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('output.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results)
    const jsonContent = {}

    results.forEach((item) => {
        if (!jsonContent[item["filename"]]) {
            jsonContent[item["filename"]] = []
        } 
        jsonContent[item["filename"]].push([
            item["x1"],
            item["x2"],
            item["y1"],
            item["y2"],
            item["class"],
        ])
    });

    fs.writeFile("output.json", JSON.stringify(jsonContent), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
  });
