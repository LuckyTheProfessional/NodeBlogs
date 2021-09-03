const readFile = (file) => {
    fs.readFile(`${file}`, (err, data) => {
        if(err) {
            console.log(err)
        }else {
            res.end(data);
        }
    });
}

module.exports = {
    readFile
}