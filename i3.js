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
    console.log("ok");
  }
});




//Google Sheets API
let sheets = google.sheets('v4');

const spreadsheetId = '1-SIrWNLeDRTDHdjqcsChrkWNYKzzlar223kK83Ovmew';

/*
 * sheets.spreadsheets.values.get({
 *   auth: jwtClient,
 *   spreadsheetId,
 *   range: 'Sheet1!A5:B10'
 * }, function (err, response) {
 *   if (err) {
 *     console.log('The API returned an error: ' + err);
 *   } else {
 *     console.log('Movie list from Google Sheets:');
 *     for (let row of response.data.values) {
 *       console.log('%s :: %s', row[0], row[1]);
 *     }
 *   }
 * })
 *  */

// https://docs.google.com/spreadsheets/d/1-SIrWNLeDRTDHdjqcsChrkWNYKzzlar223kK83Ovmew/edit#gid=0
c
sheets.spreadsheets.values.update({
  auth: jwtClient,
  spreadsheetId,
  range: 'Sheet1!B3:B4',
  valueInputOption:'RAW',
  resource: {
    values: [[new Date()], [new Date()]],
  }

  //majorDimensions: "ROWS"
  //range: 'Sheet1!B3:B3',
  //,
  //? resource,
  /* data: [{
   *   range: 'Sheet1!A3:A3',
   *   majorDimension: "ROWS",
   *   values: [[new Date()]]
   * }] */
}, (err, result) => {
  if (err) {
    throw err;
    //console.log(err);
  } else {
    console.log('%d cells updated.', result.updatedCells);
  }
});
