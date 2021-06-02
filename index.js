const express = require('express');
require('dotenv').config({ path: './config.env' });

//Start express app
const app = express();

// Body-parsing , reading data from body into req.body
app.use(express.json());

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: true,
    id: false
};

logItem = new Schema({
    generatedLogDate: Date,
    appName: String,
    logtype: {
        type: String,
        enum: ['debug', 'info', 'warning', 'error'],
        default: 'info'
    },
    payload: Object,
    host: String,
    msg: String
}, schemaOptions);

mongoose.model('insulink', logItem);

app.get('/', async function (req, res) {
    res.send('Insulink Logger')
});

app.post('/', async function (req, res) {
    try {
        var logItem = mongoose.model('insulink');

        const item = new logItem({
            host: req.get('host'),
            payload: (req.body.payload ? req.body.payload : {}),
            appName: req.query["appName"],
            generatedLogDate: req.query["date"],
            logtype: req.query["logtype"],
            msg: req.query["msg"]
        });
        console.log(item)
        await item.save();

        console.log("Log saved on " + Date());
        res.send("Log saved on " + Date());
    } catch (error) {
        console.log(error)
    }
});

module.exports = app;