const express = require('express');
var easyinvoice = require('easyinvoice');
const fs = require('fs');
const app = express();

var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
    "currency": "INR", //See documentation 'Locales and Currency' for more info
    "taxNotation": "GST", //or gst
    "marginTop": 100,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 100,
    "logo": "", //or base64
    "background": "", //or base64 //img or pdf
    "sender": {
        "company": "PRIVATE LIMITED",
        "address": "UNKNOWN",
        "zip": "400001",
        "city": "MUMBAI",
        "country": "INDIA"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
           "company": "RANCHO",
           "address": "LADAKH",
           "zip": "800010",
           "city": "LADA",
           "country": "INDIA"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2021.0001",
    "invoiceDate": "22.10.2021",
    "products": [
        {
            "quantity": "2",
            "description": "Test1",
            "tax": 18,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Test2",
            "tax": 18,
            "price": 10.45
        }
    ],
    "bottomNotice": "Thank you for using our service !!!",
    //Used for translating the headers to your preferred language
    //Defaults to English. Below example is translated to Dutch
    // "translate": { 
    //     "invoiceNumber": "Factuurnummer",
    //     "invoiceDate": "Factuurdatum",
    //     "products": "Producten", 
    //     "quantity": "Aantal", 
    //     "price": "Prijs",
    //     "subtotal": "Subtotaal",
    //     "total": "Totaal" 
    // }
};


app.get('/pdf',(req,res)=>{

    //Create your invoice! Easy!
    easyinvoice.createInvoice(data, async function (result) {
        //The response will contain a base64 encoded PDF file
        console.log(result.pdf);

        fs.writeFileSync('invoice.pdf',result.pdf,'base64');

        await res.download('invoice.pdf');
        
    });

})

app.listen(3000,(req,res)=> {
    console.log('Listening to 3000');
})