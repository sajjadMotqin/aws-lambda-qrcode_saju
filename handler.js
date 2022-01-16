'use strict';
const QRCode = require('qrcode');
const { base64encode } = require('nodejs-base64');

let data = {
  name: "Employee Name",
  age: 27,
  department: "Police",
  id: "zAwsasas"
};

let stringdata = JSON.stringify(data);
let encoded = base64encode(stringdata);

module.exports.hello = async (event) => {
    QRCode.toDataURL(encoded, function (err, code) {
        if(err) console.log("error", err);
        console.log(code)
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                  message: code,
                  input: event,
                },
                null,
                2
              ),
          };
       
    });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
