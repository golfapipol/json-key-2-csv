const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
        {id: 'filename', title: 'filename'},
        {id: 'x1', title: 'x1'},
        {id: 'x2', title: 'x2'},
        {id: 'y1', title: 'y1'},
        {id: 'y2', title: 'y2'},
        {id: 'className', title: 'class'},
    ]
});

const file = require('./label.json')

const records = []

Object.keys(file).sort().forEach((key) => {
    file[key].forEach((array) => {
        const [x1,x2,y1,y2,className] = array
        records.push({filename: key, x1,x2,y1,y2,className})
    })
})



csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
 
