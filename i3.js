//let google = require('googleapis');
const { google } = require('googleapis');
let privatekey = require("./privatekey.json");

// configure a JWT auth client
let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/spreadsheets',
   'https://www.googleapis.com/auth/drive',
   'https://www.googleapis.com/auth/calendar']
);

//authenticate request
jwtClient.authorize(function (err, tokens) {
  if (err) {
    Console.log(err);
    return;
  } else {
    console.log("Successfully connected!");
  }
});




//Google Sheets API
let spreadsheetId = '1-SIrWNLeDRTDHdjqcsChrkWNYKzzlar223kK83Ovmew';
let sheetName = 'Sheet1!A5:B10'

let sheets = google.sheets('v4');

sheets.spreadsheets.values.get({
  auth: jwtClient,
  spreadsheetId: spreadsheetId,
  range: sheetName
}, function (err, response) {
  if (err) {
    console.log('The API returned an error: ' + err);
  } else {
    console.log('Movie list from Google Sheets:');
    for (let row of response.data.values) {
      console.log('%s :: %s', row[0], row[1]);
    }
  }
});
