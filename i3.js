// working via googleapis with table https://docs.google.com/spreadsheets/d/1-SIrWNLeDRTDHdjqcsChrkWNYKzzlar223kK83Ovmew/edit#gid=0

const { google } = require('googleapis');
const sheets = google.sheets('v4');

let privatekey = require("./privatekey.json");
const spreadsheetId = '1-SIrWNLeDRTDHdjqcsChrkWNYKzzlar223kK83Ovmew';

(async () => {
  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/spreadsheets',
     'https://www.googleapis.com/auth/drive',
     'https://www.googleapis.com/auth/calendar']
  );

  //authenticate request
  try {
    const au = await jwtClient.authorize()
    console.log('authorized')
    //console.log(au)
  } catch(error) {
    throw error
  }

  // update
  try {
    const result = await sheets.spreadsheets.values.update(
      {
        auth: jwtClient,
        spreadsheetId,
        range: 'Sheet1!B3:C4',
        valueInputOption:'RAW',
        resource: {
          values: [
            ['B3', new Date()],
            ['C3', 'C4']
          ],
        }
      }
    )
    console.log(`Updated: ${result.data.updatedCells} cells`)
  } catch (error) {
    console.error('Update error:', error)
  }

  // get
  try {
    const getResult = await sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId,
      range: 'Sheet1!B2:C4'
    })
    console.log('Got values:', getResult.data.values)
  } catch (error) {
    console.error('Get error:', error)
  }

})()

