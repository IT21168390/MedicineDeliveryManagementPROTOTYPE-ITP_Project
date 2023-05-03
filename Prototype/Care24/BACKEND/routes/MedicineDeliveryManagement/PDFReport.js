const express = require('express');
const newPDF = express.Router();
const pdfTemplate = require('../../documents/MDMindex')
const pdf = require('html-pdf');

newPDF.post('/create-pdf', (req, res)=>{
    pdf.create(pdfTemplate(req.body), {}).toFile(`../../documents/Report.pdf`, (err)=>{
        if(err){
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
})

newPDF.get('/fetch-pdf', (req,res)=>{
    res.sendFile(`${__dirname}/Report.pdf`)
})


module.exports = newPDF;