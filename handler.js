"use strict";
const QRCode = require("qrcode");
const { base64encode } = require("nodejs-base64");

let stringdata = JSON.stringify(data);
let encoded = base64encode(stringdata);

module.exports.generate = (event) => {
  return new Promise((resolve, reject) => {
    const { total_amount, company, vat_number, tax_amount, date_time } =
      event.queryStringParameters;
    const encoded = base64encode(
      company + vat_number + date_time + total_amount + tax_amount
    );

    QRCode.toDataURL(encoded, function (err, code) {
      if (err) console.log("error", err);
      console.log(code);
      resolve({
        statusCode: 200,
        body: JSON.stringify(code),
      });
    });
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
