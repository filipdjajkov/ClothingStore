const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './public')));

app.get('/products', (request, result) => {
    let rawdata = fs.readFileSync('productsAvailable.json');

    let productsAvailable = JSON.parse(rawdata);

    let obj = {};
    obj.table=JSON.stringify(productsAvailable);

    for(const product of productsAvailable){
        var image = fs.readFileSync( product.src);
        const productsrc = product.src;
        obj[productsrc]=new Buffer.from(image).toString('base64');;
    }

    result.send(obj);
});

app.post('/login', (request, result) => {
    let rawdata = fs.readFileSync('registeredUsers.json');
    let registeredUsers = JSON.parse(rawdata);
    for (const user of registeredUsers) {
        if(user.email === request.body.loginEmail && user.password === request.body.loginPassword){
            result.send(user);
            return;
        }
    }
    result.send("-1");
});

app.post('/buyNow', (request, result) => {
    let rawdata = fs.readFileSync('purchases.json').toString();
    /*
    let o = JSON.parse(rawdata);
    console.log(o);
     */
    if(rawdata.length>3){
        rawdata = rawdata.substring(1, rawdata.length-1);
        rawdata = rawdata + ",\n";
    }
    fs.writeFile('purchases.json', "["+rawdata+JSON.stringify(request.body)+"]", function (err) {
        if (err) return console.log(err);
    });
    result.send("12");
});

server.listen(4000, function () {
    console.log("server is listening on port: 4000");
});
