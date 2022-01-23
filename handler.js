"use strict";
const QRCode = require("qrcode");
const { base64encode } = require("nodejs-base64");
module.exports.generate = (event) => {
  return new Promise((resolve, reject) => {
    const { total_amount, company, vat_number, tax_amount, date_time } =
      event.queryStringParameters;
    const encoded = base64encode(
      company + vat_number + date_time + total_amount + tax_amount
    );

    QRCode.toDataURL(encoded, function (err, code) {
      if (err) console.log("error", err);
      let result = code.replace(/data:image\/png;base64,/, '');
      console.log(code);
      resolve({
        statusCode: 200,
          headers: {
            'Content-Type': 'image/jpeg'
          },
          body: result,
          isBase64Encoded: true
      });
    });
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
