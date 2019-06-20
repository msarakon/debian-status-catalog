const fs = require('fs');
const FILE_PATH = './src/server/data/status';

exports.readStatus = (res) => {
    fs.readFile(FILE_PATH, (error: Error, data: Object) => {
        if (error) throw error;
        res.status(200).type('text/html').send(data);
    });
};
